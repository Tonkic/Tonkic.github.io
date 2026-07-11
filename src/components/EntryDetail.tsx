import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Reveal } from "@/components/Reveal";
import type { ContentEntry } from "@/data/site";

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
        <p className="entry-meta">{entry.date ?? "未注明日期"}</p>
        <p>{entry.summary}</p>
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
              {entry.type === "Blog" ? "查看 Obsidian 源文件" : "查看 GitHub 仓库"}
            </Link>
          </div>
        ) : null}
      </Reveal>

      {entry.content ? (
        <Reveal className="glass-panel article-body">
          <MarkdownContent content={entry.content} linkMap={linkMap} sourcePath={entry.sourcePath} />
        </Reveal>
      ) : null}
    </div>
  );
}
