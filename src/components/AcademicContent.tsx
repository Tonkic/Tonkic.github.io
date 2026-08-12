"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

const researchAreas = [
  { index: "01", title: "Computer Vision", zh: "关注视觉表征、工业异常检测与模型轻量化。", en: "Visual representation, industrial anomaly detection, and efficient models." },
  { index: "02", title: "Retrieval-Augmented Generation", zh: "探索文本与图像检索如何参与生成系统。", en: "How text and image retrieval can support generative systems." },
  { index: "03", title: "Computational Photography", zh: "关注成像、视觉计算与机器学习的交叉问题。", en: "The intersection of imaging, visual computing, and machine learning." },
];

export function AcademicContent() {
  const { locale } = useLanguage();
  const english = locale === "en";
  return (
    <div className="page-stack">
      <PageHero eyebrow="Research" title={english ? "Academic" : "学术"} outline={english ? "directions" : "方向"}>
        {english ? "Current research interests and ongoing explorations. Formal outputs will appear under Publications and Talks." : "当前研究兴趣与持续探索的方向。正式成果会分别进入 Publications 和 Talks。"}
      </PageHero>
      <Reveal className="research-grid">
        {researchAreas.map((area) => <article className="research-card" key={area.index}><span>{area.index}</span><h2>{area.title}</h2><p>{area[locale]}</p></article>)}
      </Reveal>
      <Reveal className="glass-panel home-more">
        <div><p className="eyebrow">Archive</p><h2>{english ? "Academic records" : "学术记录"}</h2><p>{english ? "No public entries yet. This section will update when real work is available." : "当前还没有公开条目，页面会在真实内容加入后持续更新。"}</p></div>
        <div className="inline-actions"><Link className="button" href="/publications">Publications</Link><Link className="button" href="/talks">Talks</Link></div>
      </Reveal>
    </div>
  );
}
