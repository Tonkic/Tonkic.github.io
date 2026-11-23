import Link from "next/link";
import type { ContentEntry } from "@/data/site";
import { LocalizedText } from "@/components/LocalizedText";
import { messages } from "@/i18n/messages";

export function EntryList({
  entries,
  emptyMessage,
}: {
  entries: ContentEntry[];
  emptyMessage?: string;
}) {
  if (!entries.length) {
    return (
      <p className="empty-state">
        {emptyMessage ?? <LocalizedText text={{ zh: messages.zh.common.empty, en: messages.en.common.empty }} />}
      </p>
    );
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <Link className="entry-row" href={entry.href} key={entry.href}>
          <span className="entry-meta">
            {entry.type}
            {entry.date ? ` · ${entry.date}` : ""}
          </span>
          <h3>{entry.title}</h3>
          <p><LocalizedText text={{ zh: entry.summary, en: entry.summaryEn ?? entry.summary }} /></p>
          {entry.tags?.length ? (
            <span className="tag-row">
              {entry.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
