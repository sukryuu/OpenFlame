import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "利用規約",
    description:
        "当サイトの利用条件、禁止事項、規約の変更、免責事項、知的財産権、プライバシー、準拠法について記載しています。",
};

export default function TermsOfServicePage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="text-2xl font-bold tracking-tight text-white">
                利用規約
            </h1>

            <div className="mt-10 space-y-8 text-balance text-neutral-300">
                <section>
                    <h2 className="text-lg font-semibold my-2">
                        1. 適用範囲と目的について
                    </h2>
                    <p className="text-sm">
                        本規約は、当サイトを利用するにあたり、当サイトを利用・閲覧する方と当サイト
                        (および運営者) の間に適用されます。
                        本規約は、当サイトを利用・閲覧することによって適用されます。
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold my-2">
                        2. 利用条件と禁止事項について
                    </h2>
                    <p className="text-sm">
                        利用者は、本規約の内容を遵守し、適切な方法で当サイトを利用するものとします。
                        利用者が以下の行為を行った場合、運営者は利用者に対してアクセスの禁止・制限をする場合があります。
                    </p>
                    <ul className="mt-4 text-sm list-disc list-inside space-y-1">
                        <li>法令、または公序良俗に反する行為</li>
                        <li>ほかの利用者、または第三者に危害を加える行為</li>
                        <li>運営者、または第三者の権利を侵害する行為</li>
                        <li>
                            その他、運営者が合理的理由に基づき不適切と判断する行為
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold my-2">
                        3. 規約の変更
                    </h2>
                    <p className="text-sm">
                        運営者は、必要に応じて本規約を変更することがあります。
                        変更後、サイトのバナーなどでお知らせします。
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold my-2">4. 免責事項</h2>
                    <ol className="mt-4 text-sm list-decimal list-inside space-y-2">
                        <li>
                            当サイトは、提供する情報およびサービスの内容について、正確性、完全性、有用性等を保証するものではありません。
                        </li>
                        <li>
                            当サイトの利用によって利用者に生じた損害について、運営者に故意または重大な過失がある場合を除き、
                            運営者は責任を負わないものとします。
                        </li>
                        <li>
                            システム障害、通信環境の不具合、メンテナンス、その他サービスの運営が維持できない状況に陥った場合、
                            運営者は予告無くサービスを停止・変更できるものとします。
                        </li>
                        <li>
                            利用者と第三者との間で生じたトラブルについては、当事者間で解決するものとします。
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-lg font-semibold my-2">5. 知的財産権</h2>
                    <p className="text-sm">
                        当サイトのプログラムは BSD-2-Clause license
                        によって提供されています。 当サイトのコンテンツ
                        (ユーザー生成コンテンツを除く) は CC BY-NC-SA 4.0
                        によって提供されています。
                        運営者は、当サイトに投稿されたコンテンツを合理的理由に基づき不適切だと判断した場合、
                        必要に応じて情報を削除できるものとします。
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold my-2">6. プライバシー</h2>
                    <p className="text-sm">
                        当サイトのプライバシーポリシーについては、こちらをご覧ください。
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold my-2">7. 準拠法</h2>
                    <p className="text-sm">
                        本規約は日本法に準拠します。本サービスについて紛争が生じた場合、法令に従い
                        運営者の居住地に最も近い裁判所を専属的合意管轄裁判所とします。
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold my-2">8. お問い合わせ</h2>
                    <p className="text-sm">
                        当サイト、または本規約に関するお問い合わせがある場合、以下のいずれかにご連絡ください。
                        迅速に対応いたします。
                        運営者の詳細な情報は、それぞれのリンク先に記載されています。
                    </p>
                </section>
            </div>
        </div>
    );
}
