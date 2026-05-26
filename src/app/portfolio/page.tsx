import { EntryList } from "@/components/EntryList";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { portfolioEntries } from "@/data/site";

export const metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Projects" title="Portfolio" outline="work">
        这里放能够代表方向、能力和阶段性成果的项目。它比 Blog 更稳定，比 CV 更叙事化。
      </PageHero>
      <Reveal className="glass-panel">
        <EntryList entries={portfolioEntries} />
      </Reveal>
    </div>
  );
}
