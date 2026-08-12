import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Reveal } from "@/components/Reveal";
import type { ContentEntry } from "@/data/site";
import { LocalizedText } from "@/components/LocalizedText";

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
        <p className="eyebrow">{entry.type}</p>
        <h1>{entry.title}</h1>
        <p className="entry-meta">{entry.date ?? <LocalizedText text={{ zh: "未注明日期", en: "Date not specified" }} />}</p>
        <p><LocalizedText text={{ zh: entry.summary, en: entry.summaryEn ?? entry.summary }} /></p>
        {entry.tags ? (
          <div className="tag-row">
            {entry.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        {entry.sourceUrl ? (
          <div className="inline-actions">
            <Link className="button" href={entry.sourceUrl} target="_blank" rel="noreferrer">
              <LocalizedText text={entry.type === "Blog" ? { zh: "查看 Obsidian 源文件", en: "View Obsidian source" } : { zh: "查看 GitHub 仓库", en: "View GitHub repository" }} />
            </Link>
          </div>
        ) : null}
      </Reveal>

      {entry.content ? (
        <Reveal className="glass-panel article-body">
          <MarkdownContent content={entry.content} contentEn={entry.contentEn} linkMap={linkMap} sourcePath={entry.sourcePath} />
        </Reveal>
      ) : null}
    </div>
  );
}
