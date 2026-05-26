import { EntryList } from "@/components/EntryList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { talkEntries } from "@/data/site";

export const metadata = {
  title: "Talks",
};

export default function TalksPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Academic / Talks" title="Talks" outline="sharing">
        Talks 是学术内容的子内容，后续可以放报告、分享或学术交流记录。
      </PageHero>
      <Reveal className="glass-panel">
        <EntryList entries={talkEntries} />
      </Reveal>
    </div>
  );
}
