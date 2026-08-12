import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "旧入口已迁移",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default function OverviewPage() {
  return (
    <div className="page-stack compact-page">
      <Reveal className="glass-panel legacy-route-panel">
        <p className="eyebrow">Navigation Updated</p>
        <h1>这个入口已经迁移到首页。</h1>
        <p>请从首页或主导航进入当前栏目。</p>
        <Link className="button primary" href="/">
          返回首页
        </Link>
      </Reveal>
    </div>
  );
}
