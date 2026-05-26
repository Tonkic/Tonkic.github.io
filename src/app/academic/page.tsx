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
        学术内容是科研与学术相关材料的聚合入口。Publications 和 Talks 是它的子内容，CV 则保持独立。
      </PageHero>
      <Reveal className="card-grid two-up">
        <article className="route-card">
          <Link href="/publications">
            <span className="card-eyebrow">Papers</span>
            <h3>Publications</h3>
            <p>论文、预印本或正式发表内容后续放在这里。</p>
            <span className="card-arrow">打开</span>
          </Link>
        </article>
        <article className="route-card">
          <Link href="/talks">
            <span className="card-eyebrow">Talks</span>
            <h3>Talks</h3>
            <p>报告、分享、学术交流内容后续放在这里。</p>
            <span className="card-arrow">打开</span>
          </Link>
        </article>
      </Reveal>
    </div>
  );
}
