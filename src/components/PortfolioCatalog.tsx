"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const LANG_COLORS: Record<string, string> = {
  Go: "#00ADD8",
  Python: "#4B8BBE",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Java: "#E07A5F",
};

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
  const reduceMotion = useReducedMotion();
  const [repos, setRepos] = useState<GitHubRepoSnapshotItem[]>(initialRepos);
  const [includeForks, setIncludeForks] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const loadLiveRepos = async () => {
      try {
        const cachedRaw = window.sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as { ts: number; items: GitHubRepoSnapshotItem[] };
          if (Date.now() - cached.ts < CACHE_TTL_MS && Array.isArray(cached.items) && cached.items.length > 0) {
            if (active) setRepos(cached.items);
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

  const visibleItems = useMemo(() => {
    const filtered = includeForks ? repos : repos.filter((repo) => !repo.isFork);
    return filtered.map((repo) => ({ repo, entry: enrichGitHubRepo(repo) }));
  }, [includeForks, repos]);

  return (
    <div className="portfolio-catalog">
      <div className="portfolio-toolbar">
        <div className="portfolio-tabs" role="tablist" aria-label="Repository scope">
          <button
            aria-selected={!includeForks}
            className={`portfolio-tab ${!includeForks ? "active" : ""}`}
            onClick={() => setIncludeForks(false)}
            role="tab"
            type="button"
          >
            <span>{t("portfolio.originalOnly")}</span>
            <small>{originalCount}</small>
          </button>
          <button
            aria-selected={includeForks}
            className={`portfolio-tab ${includeForks ? "active" : ""}`}
            onClick={() => setIncludeForks(true)}
            role="tab"
            type="button"
          >
            <span>{t("portfolio.allRepos")}</span>
            <small>{repos.length}</small>
          </button>
        </div>

        <span className="portfolio-star-summary">★ {totalStars}</span>
      </div>

      <div className="portfolio-grid">
        {visibleItems.map(({ repo, entry }, index) => {
          const stars = entry.stars ?? 0;
          const forks = entry.forks ?? 0;
          const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#948c82" : null;

          return (
            <motion.article
              className="portfolio-card"
              key={entry.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.25) }}
            >
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
                <span className="portfolio-card-corner" aria-hidden="true">↗</span>
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
                <div className="portfolio-meta-tags">
                  {repo.language ? (
                    <span className="portfolio-lang">
                      <i style={{ background: langColor ?? undefined }} aria-hidden="true" />
                      {repo.language}
                    </span>
                  ) : null}
                  {entry.tags
                    ?.filter((tag) => tag.toLowerCase() !== repo.language.toLowerCase())
                    .slice(0, 3)
                    .map((tag) => (
                      <span className="portfolio-topic" key={tag}>
                        {tag}
                      </span>
                    ))}
                </div>
                {entry.date ? <time className="portfolio-date" dateTime={entry.date}>{entry.date}</time> : null}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
