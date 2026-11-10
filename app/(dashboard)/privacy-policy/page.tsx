import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "プライバシーポリシー",
    description:
        "当サイトにおける送信情報の取扱い、提供条件、Cookie・解析ツールの利用、運営方針について記載しています。",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="text-3xl font-bold tracking-tight">
                プライバシーポリシー
            </h1>

            <div className="mt-10 space-y-8 text-balance text-neutral-300">
                <section>
                    <h2 className="text-xl font-semibold">
                        1. 送信された情報の取扱いについて
                    </h2>
                    <p>
                        当サイトで火災情報を入力することにより、以下の情報を取得します。
                    </p>
                    <ul className="mt-4 list-disc list-inside space-y-1">
                        <li>入力された位置情報</li>
                        <li>IP アドレス</li>
                        <li>User-Agent</li>
                        <li>情報投稿時のタイムスタンプ</li>
                    </ul>
                    <p>取得した情報は、以下の目的で利用します。</p>
                    <ul className="mt-4 list-disc list-inside space-y-1">
                        <li>サービス上で火災情報を共有・表示するため</li>
                        <li>スパム防止のため</li>
                    </ul>
                    <p>
                        IP アドレスは、Cloudflare および Vercel
                        によって自動的に取得されます。
                        保存期間は先述のサービスに基づきます。
                        また、送信された情報は当サイトのデータベースから一か月で削除されます。
                        (情報がインターネット全体から削除されることを表すものではありません。)
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">
                        2. 情報の提供について
                    </h2>
                    <p>
                        当サイトは、正当な法的要請に基づく場合(発信者情報開示請求などを含む)を除き、利用者の情報を第三者に許可なく送信することはありません。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">
                        3. Cookie・アクセス解析ツールの利用について
                    </h2>
                    <p>
                        当サイトでは、Cookie
                        やブラウザフィンガープリント、アクセス解析ツールなどを利用して
                        利用者を追跡したり、個人を特定したりすることはありません。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">
                        4. 当サイトについて
                    </h2>
                    <p>
                        このサービスは FOSS(Free and Open Source Software)
                        として開発されており、
                        常にメンテナンスが行われています。
                        万が一問題が発生した場合、発覚次第すぐに修正を行います。
                        また、取得した情報を本来の用途以外で使用することはありません。
                        利用者の情報を無断で販売したり、公開したりすることは重大なプライバシー侵害であり、
                        当サイトがそのような行為を行うことはありません。
                        火災情報を投稿する上での重要な情報は、こちらをご覧ください。
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">5. お問い合わせ</h2>
                    <p>
                        プライバシーポリシーに関するお問い合わせがある場合、以下のいずれかにご連絡ください。
                        迅速に対応いたします。
                        運営者の詳細な情報は、それぞれのリンク先に記載されています。
                    </p>
                </section>
            </div>
        </div>
    );
}
