"use client";

import { EntryList } from "@/components/EntryList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import type { ContentEntry } from "@/data/site";

export function EmptyArchivePage({ entries, kind }: { entries: ContentEntry[]; kind: "publications" | "talks" }) {
  const publications = kind === "publications";
  const title = publications ? "Publications" : "Talks";
  const outline = publications ? "papers" : "sharing";
  return (
    <div className="page-stack">
      <PageHero eyebrow={`Academic / ${title}`} title={title} outline={outline} />
      <Reveal className="glass-panel">
        <EntryList entries={entries} />
      </Reveal>
    </div>
  );
}
