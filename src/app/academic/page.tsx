import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "学术内容",
  description: "Tonkic 的研究兴趣、论文与学术分享。",
  alternates: { canonical: "/academic/" },
};

const researchAreas = [
  {
    index: "01",
    title: "Computer Vision",
    description: "关注视觉表征、工业异常检测与模型轻量化。",
  },
  {
    index: "02",
    title: "Retrieval-Augmented Generation",
    description: "探索文本与图像检索如何参与生成系统。",
  },
  {
    index: "03",
    title: "Computational Photography",
    description: "关注成像、视觉计算与机器学习的交叉问题。",
  },
];

export default function AcademicPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Research" title="学术" outline="方向">
        当前研究兴趣与持续探索的方向。正式成果会分别进入 Publications 和 Talks。
      </PageHero>

      <Reveal className="research-grid">
        {researchAreas.map((area) => (
          <article className="research-card" key={area.index}>
            <span>{area.index}</span>
            <h2>{area.title}</h2>
            <p>{area.description}</p>
          </article>
        ))}
      </Reveal>

      <Reveal className="glass-panel home-more">
        <div>
          <p className="eyebrow">Archive</p>
          <h2>学术记录</h2>
          <p>当前还没有公开条目，页面会在真实内容加入后持续更新。</p>
        </div>
        <div className="inline-actions">
          <Link className="button" href="/publications">Publications</Link>
          <Link className="button" href="/talks">Talks</Link>
        </div>
      </Reveal>
    </div>
  );
}
