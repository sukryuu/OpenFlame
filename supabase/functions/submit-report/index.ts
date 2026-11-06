import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
    // CORS対応
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const json = (data: unknown, status = 200) => {
        return new Response(JSON.stringify(data), {
            status,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        });
    };

    if (req.method !== "POST") {
        return json({ error: "POST only" }, 405);
    }

    try {
        const { token, report } = await req.json();

        if (
            typeof token !== "string" ||
            token.length === 0 ||
            token.length > 2048
        ) {
            return json({ error: "認証トークンがありません" }, 400);
        }

        if (!report || typeof report !== "object" || Array.isArray(report)) {
            return json({ error: "投稿データが不正です" }, 400);
        }

        const secret = Deno.env.get("TURNSTILE_SECRET_KEY");

        if (!secret) {
            throw new Error("TURNSTILE_SECRET_KEY is missing");
        }

        // Turnstile auth
        const verifyResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    secret,
                    response: token,
                }),
            },
        );

        if (!verifyResponse.ok) {
            return json({ error: "認証サービスに接続できません" }, 502);
        }

        const verification = await verifyResponse.json();

        if (!verification.success || verification.action !== "report_submit") {
            return json({ error: "認証に失敗しました" }, 403);
        }

        const allowedStringFields = [
            "report_type",
            "other_detail",
            "prefecture",
            "city",
            "town",
        ];

        const payload: Record<string, unknown> = {};

        for (const field of allowedStringFields) {
            const value = report[field];

            if (value !== undefined) {
                if (
                    value !== null &&
                    (typeof value !== "string" || value.length > 2000)
                ) {
                    return json({ error: `${field}が不正です` }, 400);
                }

                payload[field] = value;
            }
        }

        for (const field of ["latitude", "longitude"]) {
            const value = report[field];

            if (value !== undefined) {
                if (
                    value !== null &&
                    (typeof value !== "number" || !Number.isFinite(value))
                ) {
                    return json({ error: `${field}が不正です` }, 400);
                }

                if (
                    field === "latitude" &&
                    value !== null &&
                    (value < -90 || value > 90)
                ) {
                    return json({ error: "latitudeが範囲外です" }, 400);
                }

                if (
                    field === "longitude" &&
                    value !== null &&
                    (value < -180 || value > 180)
                ) {
                    return json({ error: "longitudeが範囲外です" }, 400);
                }

                payload[field] = value;
            }
        }

        if (
            typeof payload.report_type !== "string" ||
            payload.report_type.trim() === ""
        ) {
            return json({ error: "report_typeは必須です" }, 400);
        }

        if (
            typeof payload.prefecture !== "string" ||
            typeof payload.city !== "string" ||
            typeof payload.town !== "string"
        ) {
            return json({ error: "住所情報が不足しています" }, 400);
        }

        const supabase = createClient(
            Deno.env.get("SUPABASE_URL")!,
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );

        const { data, error } = await supabase
            .from("reports")
            .insert(payload)
            .select("id")
            .single();

        if (error) {
            console.error("Database error:", error.message);
            return json({ error: "データ保存に失敗しました" }, 500);
        }

        return json({
            success: true,
            id: data.id,
            message: "投稿が完了しました",
        });
    } catch (error) {
        console.error("Error:", error);

        return json(
            {
                error: "サーバーエラーが発生しました",
            },
            500,
        );
    }
});
