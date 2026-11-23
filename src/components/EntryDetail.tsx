import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Reveal } from "@/components/Reveal";
import type { ContentEntry } from "@/data/site";
import { LocalizedText } from "@/components/LocalizedText";
import { messages } from "@/i18n/messages";

export function EntryDetail({
  entry,
  linkMap,
}: {
  entry?: ContentEntry;
  linkMap?: Record<string, string>;
}) {
  if (!entry) {
    notFound();
  }

  return (
    <div className="page-stack article-shell">
      <Reveal className="glass-panel">
        <div className="entry-detail-top">
          <p className="eyebrow">{entry.type}</p>
          {entry.type === "Portfolio" ? (
            <Link className="entry-back-link" href="/portfolio">
              <LocalizedText text={{ zh: "← 返回 Portfolio", en: "← Back to Portfolio" }} />
            </Link>
          ) : null}
        </div>
        <h1>{entry.title}</h1>
        <p className="entry-meta">
          {entry.date ?? <LocalizedText text={{ zh: messages.zh.common.noDate, en: messages.en.common.noDate }} />}
        </p>
        <p><LocalizedText text={{ zh: entry.summary, en: entry.summaryEn ?? entry.summary }} /></p>
        {entry.tags?.length ? (
          <ul className="tag-row" role="list">
            {entry.tags.map((tag) => (
              <li className="tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        {entry.sourceUrl ? (
          <div className="inline-actions">
            <Link className="button primary" href={entry.sourceUrl} target="_blank" rel="noreferrer">
              <LocalizedText
                text={
                  entry.type === "Blog"
                    ? { zh: messages.zh.common.viewObsidian, en: messages.en.common.viewObsidian }
                    : { zh: messages.zh.common.viewGithub, en: messages.en.common.viewGithub }
                }
              />
              {" ↗"}
            </Link>
          </div>
        ) : null}
      </Reveal>

      {entry.content ? (
        <Reveal className="glass-panel article-body">
          <MarkdownContent
            content={entry.content}
            contentEn={entry.contentEn}
            linkMap={linkMap}
            sourcePath={entry.sourcePath}
            title={entry.title}
          />
        </Reveal>
      ) : null}
    </div>
  );
}
