import Link from "next/link";
import { blogListEntries } from "@/lib/blog-source";

export const metadata = {
  title: "Blog",
  description: "Tonkic 的人工智能、计算机与学习知识库。 AI, computing, and learning notes from Tonkic.",
  alternates: { canonical: "/blog/" },
};

const buildDomainGroups = () => {
  const counts = new Map<string, { count: number; sampleHref: string; sampleTitle: string }>();
  for (const entry of blogListEntries) {
    const root = entry.tags?.[0] ?? "Notes";
    const current = counts.get(root);
    if (!current) {
      counts.set(root, { count: 1, sampleHref: entry.href, sampleTitle: entry.title });
    } else {
      current.count += 1;
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 6);
};

export default function BlogPage() {
  const domainGroups = buildDomainGroups();
  const featuredNotes = blogListEntries
    .filter((entry) => entry.summary && entry.summary.length > 24)
    .slice(0, 6);

  return (
    <div className="page-stack blog-page">
      <section className="blog-index-card">
        <span className="eyebrow">Tonkic / Obsidian Vault</span>
        <h1>
          <span data-lang="zh">知识库</span>
          <span data-lang="en">Knowledge Base</span>
        </h1>
        <p>
          <span data-lang="zh">
            日常在 Obsidian 整理的人工智能、数学基础与系统工程笔记。左侧目录保留仓库原始层级，支持按 <kbd>⌘K</kbd> 快速检索。
          </span>
          <span data-lang="en">
            Working notes on AI, math foundations, and systems engineering synced from Obsidian. Browse the directory tree or press <kbd>⌘K</kbd> to search.
          </span>
        </p>
        <div className="blog-index-rule" />
        <div className="blog-index-hint">
          <span>
            <strong>{blogListEntries.length}</strong>{" "}
            <i data-lang="zh">篇已同步笔记</i>
            <i data-lang="en">synced notes</i>
          </span>
          <span>Markdown · KaTeX</span>
          <span>
            <i data-lang="zh">每日自动同步</i>
            <i data-lang="en">Synced daily</i>
          </span>
        </div>
      </section>

      {domainGroups.length > 0 ? (
        <section className="blog-index-section">
          <h2 className="blog-index-section-title">
            <span data-lang="zh">主题分区</span>
            <span data-lang="en">Topics</span>
          </h2>
          <div className="blog-domain-grid">
            {domainGroups.map(([name, info]) => (
              <Link className="blog-domain-card" href={info.sampleHref} key={name}>
                <div className="blog-domain-top">
                  <strong>{name}</strong>
                  <span>{info.count}</span>
                </div>
                <small>{info.sampleTitle} →</small>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {featuredNotes.length > 0 ? (
        <section className="blog-index-section">
          <h2 className="blog-index-section-title">
            <span data-lang="zh">快速开始阅读</span>
            <span data-lang="en">Quick Picks</span>
          </h2>
          <div className="blog-quick-grid">
            {featuredNotes.map((entry) => (
              <Link className="blog-quick-card" href={entry.href} key={entry.slug}>
                <span className="blog-quick-path">{entry.tags?.join(" / ") || "Note"}</span>
                <strong>{entry.title}</strong>
                <p>{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
