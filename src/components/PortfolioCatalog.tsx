"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { LocalizedText } from "@/components/LocalizedText";
import { useLanguage } from "@/components/LanguageProvider";
import { enrichGitHubRepo, type GitHubRepoSnapshotItem } from "@/data/site";

type GitHubApiRepo = {
  name?: string;
  html_url?: string;
  description?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count?: number;
  forks_count?: number;
  fork?: boolean;
  archived?: boolean;
  disabled?: boolean;
  private?: boolean;
  pushed_at?: string | null;
  homepage?: string | null;
};

const CACHE_KEY = "tonkic-github-repos-v1";
const CACHE_TTL_MS = 5 * 60 * 1000;

const sortAndNormalizeRepos = (rawRepos: GitHubApiRepo[]): GitHubRepoSnapshotItem[] =>
  rawRepos
    .filter((repo) => repo && repo.name && repo.html_url && !repo.private && !repo.archived && !repo.disabled)
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

export function PortfolioCatalog({
  owner,
  initialRepos,
}: {
  owner: string;
  initialRepos: GitHubRepoSnapshotItem[];
}) {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<GitHubRepoSnapshotItem[]>(initialRepos);
  const [includeForks, setIncludeForks] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const loadLiveRepos = async () => {
      try {
        const cachedRaw = window.sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as { ts: number; items: GitHubRepoSnapshotItem[] };
          if (Date.now() - cached.ts < CACHE_TTL_MS && Array.isArray(cached.items) && cached.items.length > 0) {
            if (active) {
              setRepos(cached.items);
              setIsLive(true);
            }
            return;
          }
        }
      } catch {
        // Ignore sessionStorage errors
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&type=owner`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );
        if (!response.ok) return;
        const payload = (await response.json()) as GitHubApiRepo[];
        if (!Array.isArray(payload)) return;
        const normalized = sortAndNormalizeRepos(payload);
        if (normalized.length > 0 && active) {
          setRepos(normalized);
          setIsLive(true);
          try {
            window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), items: normalized }));
          } catch {
            // Ignore quota errors
          }
        }
      } catch {
        // Fall back silently to build-time snapshot
      }
    };

    void loadLiveRepos();
    return () => {
      active = false;
      controller.abort();
    };
  }, [owner]);

  const originalCount = useMemo(() => repos.filter((repo) => !repo.isFork).length, [repos]);
  const totalStars = useMemo(() => repos.reduce((sum, repo) => sum + repo.stars, 0), [repos]);

  const visibleEntries = useMemo(() => {
    const filtered = includeForks ? repos : repos.filter((repo) => !repo.isFork);
    return filtered.map(enrichGitHubRepo);
  }, [includeForks, repos]);

  return (
    <div className="portfolio-catalog">
      <div className="portfolio-toolbar">
        <div className="portfolio-filter-group" role="group" aria-label="Repository filter">
          <button
            aria-pressed={!includeForks}
            className={`portfolio-filter-btn ${!includeForks ? "active" : ""}`}
            onClick={() => setIncludeForks(false)}
            type="button"
          >
            {t("portfolio.originalOnly")} <span>{originalCount}</span>
          </button>
          <button
            aria-pressed={includeForks}
            className={`portfolio-filter-btn ${includeForks ? "active" : ""}`}
            onClick={() => setIncludeForks(true)}
            type="button"
          >
            {t("portfolio.allRepos")} <span>{repos.length}</span>
          </button>
        </div>

        <div className="portfolio-telemetry">
          <span className="portfolio-star-summary">
            ★ {totalStars} {t("portfolio.totalStars")}
          </span>
          <span className="portfolio-sync-note">
            {isLive ? t("portfolio.liveSynced") : t("portfolio.snapshotSynced")}
          </span>
        </div>
      </div>

      <Reveal className="portfolio-grid">
        {visibleEntries.map((entry, index) => {
          const stars = entry.stars ?? 0;
          const forks = entry.forks ?? 0;
          return (
            <article className="portfolio-card" key={entry.slug}>
              <div className="portfolio-card-top">
                <div className="portfolio-card-badges">
                  <span className="portfolio-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className={`portfolio-star-badge ${stars > 0 ? "has-stars" : ""}`} aria-label={`${stars} stars`}>
                    ★ {stars}
                  </span>
                  {forks > 0 ? (
                    <span className="portfolio-fork-count" aria-label={`${forks} forks`}>
                      ⑂ {forks}
                    </span>
                  ) : null}
                  {entry.isFork ? <span className="portfolio-fork-pill">{t("portfolio.forkBadge")}</span> : null}
                </div>
                {entry.date ? (
                  <time className="portfolio-date" dateTime={entry.date}>
                    {t("portfolio.updated")} {entry.date}
                  </time>
                ) : null}
              </div>

              <div className="portfolio-card-main">
                <h3>
                  <a
                    className="portfolio-card-title-link"
                    href={entry.sourceUrl ?? entry.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {entry.title}
                  </a>
                </h3>
                <p>
                  <LocalizedText text={{ zh: entry.summary, en: entry.summaryEn ?? entry.summary }} />
                </p>
              </div>

              <div className="portfolio-card-footer">
                {entry.tags?.length ? (
                  <ul className="tag-row" role="list">
                    {entry.tags.map((tag) => (
                      <li className="tag" key={tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : <span />}
                <div className="portfolio-card-links">
                  {entry.sourceUrl ? (
                    <a className="card-arrow" href={entry.sourceUrl} target="_blank" rel="noreferrer">
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </Reveal>
    </div>
  );
}
