import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteChrome } from "@/components/SiteChrome";
import { LanguageProvider } from "@/components/LanguageProvider";
import { siteProfile } from "@/data/site-config";
import "katex/dist/katex.min.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteProfile.siteUrl),
  title: {
    default: "Tonkic",
    template: "%s | Tonkic",
  },
  description: "Tonkic 的中英文个人网站：人工智能知识库、工程项目、模型 API 中转与简历。 Bilingual personal site for AI notes, projects, API relay, and CV.",
  keywords: ["Tonkic", "人工智能", "Artificial Intelligence", "计算机视觉", "RAG", "Next.js", "模型 API 中转"],
  authors: [{ name: siteProfile.name, url: siteProfile.siteUrl }],
  creator: siteProfile.name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Tonkic",
    title: "Tonkic — AI, Systems & Knowledge",
    description: "人工智能知识库、工程项目与模型 API 中转。 AI knowledge, engineering projects, and API relay.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonkic — AI, Systems & Knowledge",
    description: "人工智能知识库、工程项目与模型 API 中转。 AI knowledge, engineering projects, and API relay.",
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
    <html lang="zh-CN" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var l=localStorage.getItem("tonkic-locale");if(l!=="zh"&&l!=="en")l=navigator.language.toLowerCase().startsWith("zh")?"zh":"en";document.documentElement.dataset.locale=l;document.documentElement.lang=l==="zh"?"zh-CN":"en"}catch(e){document.documentElement.dataset.locale="zh"}` }} />
      </head>
      <body>
        <LanguageProvider>
          <SmoothScroll />
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
