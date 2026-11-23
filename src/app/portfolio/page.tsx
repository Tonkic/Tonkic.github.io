import { PageHero } from "@/components/PageHero";
import { PortfolioCatalog } from "@/components/PortfolioCatalog";
import { LocalizedText } from "@/components/LocalizedText";
import { githubRepoSnapshot } from "@/data/site";

export const metadata = {
  title: "Portfolio",
  description: "Tonkic 的 GitHub 公开项目集合，按 Star 数自动排序。 Public GitHub repositories by Tonkic, sorted by stars.",
  alternates: { canonical: "/portfolio/" },
};

export default function PortfolioPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="02 — Public Repositories" title="Portfolio" outline="github">
        <LocalizedText
          text={{
            zh: "自动读取 GitHub 公开仓库并按 Star 数与最近活跃时间排序，点击卡片可直接访问对应源码仓库。",
            en: "Automatically synced from my public GitHub repositories and ranked by stars and recent activity.",
          }}
        />
      </PageHero>
      <PortfolioCatalog owner={githubRepoSnapshot.owner} initialRepos={githubRepoSnapshot.projects} />
    </div>
  );
}
