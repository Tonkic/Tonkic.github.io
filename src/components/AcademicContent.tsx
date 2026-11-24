"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

const researchAreas = [
  {
    index: "01",
    title: "Computer Vision",
    zh: "视觉表征学习、工业场景异常检测与模型轻量化部署。",
    en: "Visual representation learning, industrial anomaly detection, and lightweight model deployment.",
  },
  {
    index: "02",
    title: "Retrieval-Augmented Generation",
    zh: "多模态与文本检索增强生成（RAG）在知识系统中的召回与重排策略。",
    en: "Multimodal and text retrieval-augmented generation, focusing on retrieval quality and reranking.",
  },
  {
    index: "03",
    title: "Computational Photography",
    zh: "底层成像处理、视觉计算与深度学习方法的结合。",
    en: "Low-level imaging pipelines at the intersection of computational photography and deep learning.",
  },
];

export function AcademicContent() {
  const { locale } = useLanguage();
  const english = locale === "en";
  return (
    <div className="page-stack">
      <PageHero eyebrow="Research" title={english ? "Academic" : "学术"} outline={english ? "focus" : "方向"} />
      <Reveal className="research-grid">
        {researchAreas.map((area) => (
          <article className="research-card" key={area.index}>
            <span>{area.index}</span>
            <h2>{area.title}</h2>
            <p>{area[locale]}</p>
          </article>
        ))}
      </Reveal>
      <Reveal className="academic-archive-strip">
        <Link className="academic-archive-row" href="/publications">
          <strong>Publications</strong>
          <i aria-hidden="true">→</i>
        </Link>
        <Link className="academic-archive-row" href="/talks">
          <strong>Talks</strong>
          <i aria-hidden="true">→</i>
        </Link>
      </Reveal>
    </div>
  );
}
