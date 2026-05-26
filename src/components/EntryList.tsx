import Link from "next/link";
import type { ContentEntry } from "@/data/site";

export function EntryList({ entries }: { entries: ContentEntry[] }) {
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <Link className="entry-row" href={entry.href} key={entry.href}>
          <span className="entry-meta">
            {entry.type}
            {entry.date ? ` / ${entry.date}` : ""}
          </span>
          <h3>{entry.title}</h3>
          <p>{entry.summary}</p>
          {entry.tags ? (
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
