"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

export function OverviewNotice() {
  const { locale } = useLanguage();
  const english = locale === "en";
  return <div className="page-stack compact-page"><Reveal className="glass-panel legacy-route-panel"><p className="eyebrow">Navigation Updated</p><h1>{english ? "This entry has moved to the homepage." : "这个入口已经迁移到首页。"}</h1><p>{english ? "Use the homepage or main navigation to reach the current sections." : "请从首页或主导航进入当前栏目。"}</p><Link className="button primary" href="/">{english ? "Back home" : "返回首页"}</Link></Reveal></div>;
}
