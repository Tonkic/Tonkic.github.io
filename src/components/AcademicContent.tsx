"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

const researchAreas = [
  {
    index: "01",
    title: "Computer Vision",
    zh: "关注视觉表征学习、工业场景异常检测与模型轻量化部署。",
    en: "Visual representation learning, industrial anomaly detection, and lightweight model deployment.",
  },
  {
    index: "02",
    title: "Retrieval-Augmented Generation",
    zh: "探索多模态与文本检索增强生成（RAG）在实际知识系统中的召回与重排策略。",
    en: "Multimodal and text retrieval-augmented generation, focusing on retrieval quality and reranking in knowledge systems.",
  },
  {
    index: "03",
    title: "Computational Photography",
    zh: "关注底层成像处理、视觉计算与深度学习方法的结合。",
    en: "Low-level imaging pipelines at the intersection of computational photography and deep learning.",
  },
];

export function AcademicContent() {
  const { locale } = useLanguage();
  const english = locale === "en";
  return (
    <div className="page-stack">
      <PageHero eyebrow="03 — Research" title={english ? "Academic" : "学术"} outline={english ? "notes" : "方向"}>
        {english
          ? "Graduate research interests and ongoing reading directions. Formal papers and talks will be listed here once published."
          : "研究生阶段关注的方向与课题探索。后续正式发表的论文或公开报告会归档在下方栏目。"}
      </PageHero>
      <Reveal className="research-grid">
        {researchAreas.map((area) => (
          <article className="research-card" key={area.index}>
            <span>{area.index}</span>
            <h2>{area.title}</h2>
            <p>{area[locale]}</p>
          </article>
        ))}
      </Reveal>
      <Reveal className="glass-panel home-more">
        <div>
          <p className="eyebrow">Archive</p>
          <h2>{english ? "Publications & Talks" : "论文与分享记录"}</h2>
          <p>
            {english
              ? "No public papers or talks yet — entries will be added as work is published."
              : "目前暂无已公开的论文或报告，有正式产出后会在此更新。"}
          </p>
        </div>
        <div className="inline-actions">
          <Link className="button" href="/publications">Publications</Link>
          <Link className="button" href="/talks">Talks</Link>
        </div>
      </Reveal>
    </div>
  );
}
