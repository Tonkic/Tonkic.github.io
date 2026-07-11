import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "全站总览",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default function OverviewPage() {
  return (
    <div className="page-stack compact-page">
      <Reveal className="glass-panel legacy-route-panel">
        <p className="eyebrow">Navigation Updated</p>
        <h1>全站总览已经合并到首页。</h1>
        <p>主要内容、精选项目和推荐笔记现在都可以从首页直接进入。</p>
        <Link className="button primary" href="/">
          返回首页
        </Link>
      </Reveal>
    </div>
  );
}
