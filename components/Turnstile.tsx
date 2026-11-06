"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

declare global {
    interface Window {
        turnstile?: {
            render: (
                element: HTMLElement,
                options: {
                    sitekey: string;
                    action: string;
                    callback: (token: string) => void;
                    "expired-callback": () => void;
                    "error-callback": () => void;
                },
            ) => string;
            reset: (id?: string) => void;
            remove: (id: string) => void;
        };
    }
}

type Props = {
    onToken: (token: string) => void;
    resetSignal: number;
};

export default function Turnstile({ onToken, resetSignal }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);
    const callbackRef = useRef(onToken);

    useEffect(() => {
        callbackRef.current = onToken;
    }, [onToken]);

    const renderWidget = useCallback(() => {
        if (!window.turnstile || !containerRef.current) return;
        if (widgetId.current) return;

        const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

        if (!sitekey) {
            console.error("Turnstile Site Keyが設定されていません");
            return;
        }

        widgetId.current = window.turnstile.render(containerRef.current, {
            sitekey,
            action: "report_submit",
            callback: (token) => callbackRef.current(token),
            "expired-callback": () => callbackRef.current(""),
            "error-callback": () => callbackRef.current(""),
        });
    }, []);

    useEffect(() => {
        renderWidget();

        return () => {
            if (widgetId.current && window.turnstile) {
                window.turnstile.remove(widgetId.current);
                widgetId.current = null;
            }
        };
    }, [renderWidget]);

    useEffect(() => {
        if (resetSignal > 0 && widgetId.current) {
            window.turnstile?.reset(widgetId.current);
        }
    }, [resetSignal]);

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="afterInteractive"
                onReady={renderWidget}
            />
            <div ref={containerRef} />
        </>
    );
}
