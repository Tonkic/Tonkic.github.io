import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "学术内容",
};

export default function AcademicPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Academic" title="学术" outline="内容">
        科研与学术相关材料会放在这里。Publications 和 Talks 是两个子入口。
      </PageHero>
      <Reveal className="card-grid two-up">
        <article className="route-card">
          <Link href="/publications">
            <span className="card-eyebrow">Papers</span>
            <h3>Publications</h3>
            <p>论文、预印本或正式发表内容。</p>
            <span className="card-arrow">打开</span>
          </Link>
        </article>
        <article className="route-card">
          <Link href="/talks">
            <span className="card-eyebrow">Talks</span>
            <h3>Talks</h3>
            <p>报告、分享和学术交流记录。</p>
            <span className="card-arrow">打开</span>
          </Link>
        </article>
      </Reveal>
    </div>
  );
}
