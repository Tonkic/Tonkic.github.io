import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteChrome } from "@/components/SiteChrome";
import { siteProfile } from "@/data/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteProfile.siteUrl),
  title: {
    default: "Tonkic",
    template: "%s | Tonkic",
  },
  description: "Tonkic 的个人网站：人工智能知识库、工程项目、模型 API 中转与求职简历。",
  keywords: ["Tonkic", "人工智能", "计算机视觉", "RAG", "Next.js", "模型 API 中转"],
  authors: [{ name: siteProfile.name, url: siteProfile.siteUrl }],
  creator: siteProfile.name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "Tonkic",
    title: "Tonkic — AI, Systems & Knowledge",
    description: "人工智能知识库、工程项目与模型 API 中转。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonkic — AI, Systems & Knowledge",
    description: "人工智能知识库、工程项目与模型 API 中转。",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080908",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SmoothScroll />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
