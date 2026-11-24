import { PageHero } from "@/components/PageHero";
import { PortfolioCatalog } from "@/components/PortfolioCatalog";
import { githubRepoSnapshot } from "@/data/site";

export const metadata = {
  title: "Portfolio",
  description: "Tonkic 的 GitHub 公开项目集合，按 Star 数自动排序。 Public GitHub repositories by Tonkic, sorted by stars.",
  alternates: { canonical: "/portfolio/" },
};

export default function PortfolioPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="02 — Repositories" title="Portfolio" outline="github" />
      <PortfolioCatalog owner={githubRepoSnapshot.owner} initialRepos={githubRepoSnapshot.projects} />
    </div>
  );
}
