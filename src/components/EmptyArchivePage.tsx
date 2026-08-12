"use client";

import { EntryList } from "@/components/EntryList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import type { ContentEntry } from "@/data/site";

export function EmptyArchivePage({ entries, kind }: { entries: ContentEntry[]; kind: "publications" | "talks" }) {
  const { locale } = useLanguage();
  const publications = kind === "publications";
  const title = publications ? "Publications" : "Talks";
  const outline = publications ? "papers" : "sharing";
  const description = locale === "en"
    ? publications ? "Papers, preprints, and formal publications will appear here." : "Talks, presentations, and academic exchanges will appear here."
    : publications ? "论文、预印本和正式发表内容会放在这里。" : "报告、分享和学术交流记录会放在这里。";
  const empty = locale === "en" ? `No public ${publications ? "publications" : "talks"} yet.` : `还没有公开的 ${publications ? "publication" : "talk"}。`;
  return <div className="page-stack"><PageHero eyebrow={`Academic / ${title}`} title={title} outline={outline}>{description}</PageHero><Reveal className="glass-panel"><EntryList entries={entries} emptyMessage={empty} /></Reveal></div>;
}
