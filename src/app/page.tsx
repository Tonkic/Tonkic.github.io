import Link from "next/link";
import type { Metadata } from "next";
import { HoverCard } from "@/components/HoverCard";
import { Reveal } from "@/components/Reveal";
import { blogEntries, firstTierCards, portfolioEntries, siteProfile } from "@/data/site";

const featuredNoteSlugs = ["0d01619aaa-attention-mask", "9185bf3a6c-sigmoid", "10ce7af36f"];

const featuredNotes = featuredNoteSlugs
  .map((slug) => blogEntries.find((entry) => entry.slug === slug))
  .filter((entry): entry is (typeof blogEntries)[number] => Boolean(entry));

const homeNotes = featuredNotes.length >= 3 ? featuredNotes : blogEntries.slice(0, 3);
const homeProjects = portfolioEntries.slice(0, 3);

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="page-stack home-page">
      <section className="hero-grid home-hero">
        <Reveal className="hero-panel">
          <p className="eyebrow">Tonkic / AI + Systems</p>
          <h1 className="hero-title">
            Build.
            <span>Learn.</span>
          </h1>
          <p className="hero-copy">
            我在学习和构建人工智能相关系统。这里沉淀技术笔记、工程项目，也提供模型 API 中转服务。
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/blog">
              浏览知识库
            </Link>
            <Link className="button" href="/portfolio">
              查看项目
            </Link>
            <a className="button" href={siteProfile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </Reveal>

        <Reveal className="glass-panel signal-panel" delay={0.08}>
          <p className="eyebrow">Currently</p>
          <p className="signal-kicker">Artificial Intelligence</p>
          <div className="signal-list">
            <div>
              <span>身份</span>
              <strong>人工智能硕士研究生</strong>
            </div>
            <div>
              <span>关注</span>
              <strong>Computer Vision / RAG / AI Systems</strong>
            </div>
            <div>
              <span>正在维护</span>
              <strong>知识库与模型 API 服务</strong>
            </div>
          </div>
          <Link className="text-link" href="/cv">
            查看 CV →
          </Link>
        </Reveal>
      </section>

      <section>
        <Reveal className="section-heading">
          <p className="eyebrow">Start Here</p>
          <h2>主要内容</h2>
        </Reveal>
        <div className="card-grid two-up">
          {firstTierCards.map((card, index) => (
            <HoverCard card={card} index={index} key={card.href} />
          ))}
        </div>
      </section>

      <section>
        <Reveal className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2>精选项目</h2>
          </div>
          <Link className="text-link" href="/portfolio">
            查看全部 →
          </Link>
        </Reveal>
        <div className="portfolio-grid home-project-grid">
          {homeProjects.map((entry) => (
            <article className="portfolio-card" key={entry.slug}>
              <Link className="portfolio-card-main" href={entry.href}>
                <span className="card-eyebrow">{entry.tags?.slice(0, 2).join(" / ")}</span>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <span className="card-arrow">查看项目</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <Reveal className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">From The Vault</p>
            <h2>推荐笔记</h2>
          </div>
          <Link className="text-link" href="/blog">
            打开知识库 →
          </Link>
        </Reveal>
        <div className="note-grid">
          {homeNotes.map((entry) => (
            <Link className="note-card" href={entry.href} key={entry.slug}>
              <span>{entry.sourcePath?.split("/").slice(0, -1).join(" / ") || "Blog"}</span>
              <strong>{entry.title}</strong>
              <p>{entry.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <Reveal className="glass-panel home-more">
        <div>
          <p className="eyebrow">More</p>
          <h2>简历与研究</h2>
        </div>
        <div className="inline-actions">
          <Link className="button" href="/cv">
            CV
          </Link>
          <Link className="button" href="/academic">
            学术内容
          </Link>
          <a className="button" href={`mailto:${siteProfile.email}`}>
            联系我
          </a>
        </div>
      </Reveal>
    </div>
  );
}
