import { EntryList } from "@/components/EntryList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { publicationEntries } from "@/data/site";

export const metadata = {
  title: "Publications",
};

export default function PublicationsPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Academic / Publications" title="Publications" outline="papers">
        这里保留真实 publication 的结构，不使用模板论文填充。
      </PageHero>
      <Reveal className="glass-panel">
        <EntryList entries={publicationEntries} />
      </Reveal>
    </div>
  );
}
