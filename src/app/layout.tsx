import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tonkic",
    template: "%s | Tonkic",
  },
  description: "Tonkic 的个人网站：Blog、模型 API 中转、Portfolio、CV 与学术内容。",
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
