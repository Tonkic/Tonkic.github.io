import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { portfolioEntries } from "@/data/site";

export const metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Projects" title="Portfolio" outline="work">
        这里放能够代表方向、能力和阶段性成果的项目。
      </PageHero>
      <Reveal className="glass-panel">
        <div className="portfolio-lead">
          <p className="eyebrow">Selected Projects</p>
          <h2>精选仓库</h2>
          <p>按“最能说明你现在在做什么”来选，不追求全量堆仓库。</p>
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
