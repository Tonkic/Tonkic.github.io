import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { normalizeGitHubRepos } from "./sync-github-projects.mjs";

const root = new URL("../", import.meta.url);

test("normalizeGitHubRepos filters private/archived repos and sorts by stars desc then pushedAt desc", () => {
  const result = normalizeGitHubRepos([
    { name: "low-older", html_url: "https://github.com/u/low-older", stargazers_count: 1, pushed_at: "2026-01-10T00:00:00Z" },
    { name: "archived-high", html_url: "https://github.com/u/archived-high", stargazers_count: 99, archived: true },
    { name: "private-high", html_url: "https://github.com/u/private-high", stargazers_count: 50, private: true },
    { name: "top-repo", html_url: "https://github.com/u/top-repo", stargazers_count: 31, forks_count: 9, language: "Go", pushed_at: "2026-09-21T00:00:00Z" },
    { name: "low-newer", html_url: "https://github.com/u/low-newer", stargazers_count: 1, pushed_at: "2026-11-18T00:00:00Z" },
  ]);

  assert.deepEqual(
    result.map((r) => r.name),
    ["top-repo", "low-newer", "low-older"],
  );
  assert.equal(result[0].stars, 31);
  assert.equal(result[0].forks, 9);
  assert.equal(result[1].pushedAt, "2026-11-18");
});

test("committed github-projects.json snapshot is non-empty and sorted by stars descending", async () => {
  const snapshot = JSON.parse(await readFile(new URL("src/data/github-projects.json", root), "utf8"));
  assert.equal(snapshot.owner, "Tonkic");
  assert.ok(Array.isArray(snapshot.projects) && snapshot.projects.length > 0);

  for (let i = 1; i < snapshot.projects.length; i += 1) {
    assert.ok(
      snapshot.projects[i - 1].stars >= snapshot.projects[i].stars,
      `Projects out of star order at index ${i}`,
    );
  }
});
