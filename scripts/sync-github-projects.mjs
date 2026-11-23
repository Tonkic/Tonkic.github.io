import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const owner = process.env.GITHUB_PROJECTS_OWNER || "Tonkic";
const outputFile = path.join("src", "data", "github-projects.json");
const token = process.env.GITHUB_TOKEN || "";

export const normalizeGitHubRepos = (repos) =>
  repos
    .filter((repo) => repo && !repo.private && !repo.archived && !repo.disabled)
    .map((repo) => ({
      name: String(repo.name),
      htmlUrl: String(repo.html_url),
      description: repo.description ? String(repo.description).trim() : "",
      language: repo.language ? String(repo.language) : "",
      topics: Array.isArray(repo.topics) ? repo.topics.map(String).slice(0, 5) : [],
      stars: Number(repo.stargazers_count ?? 0),
      forks: Number(repo.forks_count ?? 0),
      isFork: Boolean(repo.fork),
      pushedAt: repo.pushed_at ? String(repo.pushed_at).slice(0, 10) : "",
      homepage: repo.homepage ? String(repo.homepage).trim() : "",
    }))
    .sort(
      (a, b) =>
        b.stars - a.stars ||
        b.pushedAt.localeCompare(a.pushedAt) ||
        a.name.localeCompare(b.name, "en"),
    );

const readExisting = async () => {
  try {
    return JSON.parse(await readFile(outputFile, "utf8"));
  } catch {
    return null;
  }
};

const main = async () => {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tonkic-site-projects-sync",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&type=owner`,
      { headers },
    );
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }
    const rawRepos = await response.json();
    const projects = normalizeGitHubRepos(rawRepos);
    const snapshot = {
      owner,
      syncedAt: new Date().toISOString(),
      projects,
    };

    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
    console.log(`Synced ${projects.length} public GitHub repositories for ${owner}`);
  } catch (error) {
    const existing = await readExisting();
    if (existing?.projects?.length) {
      console.warn(`Failed to refresh GitHub projects (${error.message}); keeping existing snapshot.`);
      return;
    }
    throw error;
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
