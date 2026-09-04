import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Outfit } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ＡＩモデル最強比較",
  description:
    "世界で稼働中のAIモデルを価格 vs 性能のコスパで比較し、毎日更新のAIニュースを日本語で読める比較サイト。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
