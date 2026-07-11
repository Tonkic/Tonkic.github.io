import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { portfolioEntries } from "@/data/site";

export const metadata = {
  title: "Portfolio",
  description: "Tonkic 的精选工程与研究项目。",
  alternates: { canonical: "/portfolio/" },
};

export default function PortfolioPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Projects" title="Portfolio" outline="work">
        精选能够说明工程能力、研究方向与持续投入的项目。
      </PageHero>
      <Reveal className="glass-panel">
        <div className="portfolio-lead">
          <p className="eyebrow">Selected Projects</p>
          <h2>精选仓库</h2>
          <p>每个项目都对应一条可验证的代码、研究或内容生产链路。</p>
        </div>
        <div className="portfolio-grid">
          {portfolioEntries.map((entry) => (
            <article className="portfolio-card" key={entry.slug}>
              <Link className="portfolio-card-main" href={entry.href}>
                <span className="card-eyebrow">{entry.type}</span>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <div className="tag-row">
                  {entry.tags?.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="card-arrow">查看详情</span>
              </Link>
              {entry.sourceUrl ? (
                <a className="inline-link" href={entry.sourceUrl} target="_blank" rel="noreferrer">
                  GitHub 仓库
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
