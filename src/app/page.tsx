import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { blogListEntries } from "@/lib/blog-source";
import { githubRepoSnapshot } from "@/data/site";
import relaySnapshotData from "@/data/relay-snapshot.json";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const originalRepos = githubRepoSnapshot.projects.filter((repo) => !repo.isFork);
  const totalStars = githubRepoSnapshot.projects.reduce((sum, repo) => sum + repo.stars, 0);

  return (
    <HomeHero
      noteCount={blogListEntries.length}
      relayReachable={Boolean(relaySnapshotData.health?.reachable)}
      repoCount={originalRepos.length}
      totalStars={totalStars}
    />
  );
}
