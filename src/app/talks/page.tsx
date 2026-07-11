import { EntryList } from "@/components/EntryList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { talkEntries } from "@/data/site";

export const metadata = {
  title: "Talks",
  description: "Tonkic 的报告、分享与学术交流记录。",
  alternates: { canonical: "/talks/" },
};

export default function TalksPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Academic / Talks" title="Talks" outline="sharing">
        报告、分享和学术交流记录会放在这里。
      </PageHero>
      <Reveal className="glass-panel">
        <EntryList entries={talkEntries} emptyMessage="还没有公开的 talk。" />
      </Reveal>
    </div>
  );
}
