import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { portfolioEntries } from "@/data/site";

export const metadata = {
  title: "Portfolio",
  description: "Tonkic 的工程项目集合。",
  alternates: { canonical: "/portfolio/" },
};

export default function PortfolioPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Projects" title="Portfolio" outline="work" />
      <Reveal className="portfolio-grid">
        {portfolioEntries.map((entry, index) => (
          <a
            className="portfolio-card"
            href={entry.sourceUrl ?? entry.href}
            target={entry.sourceUrl ? "_blank" : undefined}
            rel={entry.sourceUrl ? "noreferrer" : undefined}
            key={entry.slug}
          >
            <span className="portfolio-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="portfolio-card-main">
              <span className="card-eyebrow">{entry.tags?.slice(0, 2).join(" / ")}</span>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <div className="tag-row">
                {entry.tags?.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="card-arrow">
                {entry.sourceUrl ? "GitHub ↗" : "查看详情"}
              </span>
            </div>
          </a>
        ))}
      </Reveal>
    </div>
  );
}
