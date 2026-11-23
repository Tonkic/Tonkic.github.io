import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { portfolioEntries } from "@/data/site";
import { LocalizedText } from "@/components/LocalizedText";
import { messages } from "@/i18n/messages";

export const metadata = {
  title: "Portfolio",
  description: "Tonkic 的工程项目集合。 Selected engineering and content projects by Tonkic.",
  alternates: { canonical: "/portfolio/" },
};

export default function PortfolioPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="02 — Selected Work" title="Portfolio" outline="work">
        <LocalizedText
          text={{
            zh: "聚焦 API 网关、知识工程与数据分析的开源项目与线上服务，所有仓库均可直接访问。",
            en: "Selected open-source repositories and live services across API gateways, knowledge tooling, and data analysis.",
          }}
        />
      </PageHero>
      <Reveal className="portfolio-grid">
        {portfolioEntries.map((entry, index) => (
          <article className="portfolio-card" key={entry.slug}>
            <div className="portfolio-card-top">
              <span className="portfolio-index">{String(index + 1).padStart(2, "0")}</span>
              {entry.date ? <time className="portfolio-date" dateTime={entry.date}>{entry.date}</time> : null}
            </div>
            <div className="portfolio-card-main">
              <h3>
                <a
                  className="portfolio-card-title-link"
                  href={entry.sourceUrl ?? entry.href}
                  target={entry.sourceUrl ? "_blank" : undefined}
                  rel={entry.sourceUrl ? "noreferrer" : undefined}
                >
                  {entry.title}
                </a>
              </h3>
              <p><LocalizedText text={{ zh: entry.summary, en: entry.summaryEn ?? entry.summary }} /></p>
            </div>
            <div className="portfolio-card-footer">
              <div className="tag-row">
                {entry.tags?.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="portfolio-card-links">
                <Link className="portfolio-detail-link" href={entry.href}>
                  <LocalizedText text={{ zh: messages.zh.common.details, en: messages.en.common.details }} />
                </Link>
                {entry.sourceUrl ? (
                  <a className="card-arrow" href={entry.sourceUrl} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </div>
  );
}
