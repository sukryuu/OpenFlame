import type { Metadata } from "next";
import { notoSansJP } from "./fonts";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: {
        default: "OpenFlame",
        template: "%s | OpenFlame",
    },
    description: "日本全国の火事目撃情報を収集・表示し、迅速な防災情報の共有を可能にします。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="ja"
            className={cn(
                "h-full",
                "antialiased",
                notoSansJP.className,
                "font-sans",
                geist.variable,
            )}
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              if (typeof window !== 'undefined' && !!window.chrome) {
                document.documentElement.classList.add('is-chromium');
              }
            `,
                    }}
                />
            </head>
            <body className="min-h-full flex flex-col bg-neutral-950">
                {children}

                <Toaster theme="dark" position="top-center" richColors />
            </body>
        </html>
    );
}