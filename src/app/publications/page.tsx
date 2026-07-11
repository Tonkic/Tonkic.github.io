import { EntryList } from "@/components/EntryList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { publicationEntries } from "@/data/site";

export const metadata = {
  title: "Publications",
  description: "Tonkic 的论文与公开学术成果。",
  alternates: { canonical: "/publications/" },
};

export default function PublicationsPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Academic / Publications" title="Publications" outline="papers">
        论文、预印本和正式发表内容会放在这里。
      </PageHero>
      <Reveal className="glass-panel">
        <EntryList
          entries={publicationEntries}
          emptyMessage="还没有公开的 publication。"
        />
      </Reveal>
    </div>
  );
}
