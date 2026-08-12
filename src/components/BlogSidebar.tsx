"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { PageTree } from "fumadocs-core/server";
import type { ContentEntry } from "@/data/site";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

type TreeNode = PageTree.Node;
type FolderNode = PageTree.Folder;

const normalizeUrl = (url?: string) => {
  if (!url) return "";
  return url.endsWith("/") ? url : `${url}/`;
};

const nodeText = (value: PageTree.Node["name"]) =>
  typeof value === "string" || typeof value === "number" ? String(value).replace(/_$/, "") : "Untitled";

const countPages = (nodes: TreeNode[]): number =>
  nodes.reduce((total, node) => {
    if (node.type === "page") return total + 1;
    if (node.type === "folder") return total + countPages(node.children) + (node.index ? 1 : 0);
    return total;
  }, 0);

const containsActivePage = (node: FolderNode, activeUrl: string): boolean => {
  if (node.index && normalizeUrl(node.index.url) === activeUrl) return true;
  return node.children.some((child) => {
    if (child.type === "page") return normalizeUrl(child.url) === activeUrl;
    return child.type === "folder" ? containsActivePage(child, activeUrl) : false;
  });
};

function TreePage({ node, activeUrl, depth }: { node: PageTree.Item; activeUrl: string; depth: number }) {
  const href = normalizeUrl(node.url);
  const active = activeUrl === href;
  return (
    <Link className={`blog-tree-link ${active ? "active" : ""}`} href={href} aria-current={active ? "page" : undefined}>
      <span className="blog-tree-marker">{active ? "●" : "○"}</span>
      <span style={{ paddingLeft: `${depth * 12}px` }}>{nodeText(node.name)}</span>
    </Link>
  );
}

function TreeNodeView({ node, activeUrl, depth }: { node: TreeNode; activeUrl: string; depth: number }) {
  if (node.type === "page") return <TreePage node={node} activeUrl={activeUrl} depth={depth} />;
  if (node.type !== "folder") return null;
  return <TreeFolder node={node} activeUrl={activeUrl} depth={depth} />;
}

function TreeFolder({ node, activeUrl, depth }: { node: FolderNode; activeUrl: string; depth: number }) {
  const [open, setOpen] = useState(depth < 1 || containsActivePage(node, activeUrl));
  const pageCount = countPages(node.children) + (node.index ? 1 : 0);
  useEffect(() => {
    if (containsActivePage(node, activeUrl)) setOpen(true);
  }, [activeUrl, node]);
  return (
    <div className="blog-tree-folder" style={{ "--tree-depth": depth } as CSSProperties}>
      <button className="blog-tree-folder-button" onClick={() => setOpen((value) => !value)} type="button" aria-expanded={open}>
        <span className="blog-tree-chevron">{open ? "−" : "+"}</span>
        <span>{nodeText(node.name)}</span>
        <small>{pageCount}</small>
      </button>
      {open ? (
        <div className="blog-tree-children">
          {node.index ? <TreePage node={node.index} activeUrl={activeUrl} depth={depth + 1} /> : null}
          {node.children.map((child) => (
            <TreeNodeView
              key={child.$id ?? `${child.type}-${nodeText(child.name)}`}
              node={child}
              activeUrl={activeUrl}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TreeContent({ pageTree, activeUrl, searchResults, query }: {
  pageTree: PageTree.Root;
  activeUrl: string;
  searchResults: ContentEntry[];
  query: string;
}) {
  const { t } = useLanguage();
  if (query) {
    return searchResults.length ? (
      <div className="blog-search-results">
        {searchResults.map((entry) => (
          <Link className={`blog-search-result ${activeUrl === normalizeUrl(entry.href) ? "active" : ""}`} href={entry.href} key={entry.slug}>
            <strong>{entry.title}</strong>
            <small>{entry.type}</small>
          </Link>
        ))}
      </div>
    ) : (
      <p className="blog-sidebar-empty">{t("blog.noResults")}</p>
    );
  }

  return (
    <div className="blog-tree">
      {pageTree.children.map((node) => (
        <TreeNodeView key={node.$id ?? `${node.type}-${nodeText(node.name)}`} node={node} activeUrl={activeUrl} depth={0} />
      ))}
    </div>
  );
}

export function BlogSidebar({ pageTree, entries }: { pageTree: PageTree.Root; entries: ContentEntry[] }) {
  const pathname = usePathname() ?? "/blog/";
  const { locale, t } = useLanguage();
  const activeUrl = normalizeUrl(pathname);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());
  const searchResults = useMemo(
    () => entries.filter((entry) => [entry.title, entry.summary, entry.sourcePath].filter(Boolean).some((value) => value!.toLocaleLowerCase().includes(deferredQuery))).slice(0, 50),
    [deferredQuery, entries],
  );

  const content = (mobile = false): ReactNode => (
    <>
      <div className="blog-sidebar-brand">
        <Link href="/" className="blog-sidebar-logo">Tonkic</Link>
        <span>{locale === "zh" ? "知识库" : "Knowledge Base"}</span>
      </div>
      <div className="blog-sidebar-actions">
        <Link href="/" className="blog-sidebar-home">{t("blog.backHome")}</Link>
        <span>{countPages(pageTree.children)} {t("blog.noteCount")}</span>
        <LanguageToggle compact />
      </div>
      <label className="blog-sidebar-search">
        <span className="sr-only">{t("blog.searchLabel")}</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={t("blog.searchPlaceholder")} />
        <kbd>⌘ K</kbd>
      </label>
      <div className="blog-sidebar-tree" data-lenis-prevent>
        <TreeContent pageTree={pageTree} activeUrl={activeUrl} searchResults={searchResults} query={deferredQuery} />
      </div>
      {!mobile ? (
        <nav className="blog-sidebar-nav" aria-label={t("blog.navigation")}>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/cv">CV</Link>
          <Link href="/api-relay">API Relay</Link>
        </nav>
      ) : null}
    </>
  );

  return (
    <>
      <aside className="blog-sidebar" aria-label={t("blog.directory")}>
        {content()}
      </aside>
      <details className="blog-sidebar-mobile">
        <summary><span>☰</span><strong>{t("blog.mobileTitle")}</strong><small>{countPages(pageTree.children)} {t("blog.noteCount")}</small></summary>
        <div className="blog-sidebar-mobile-content">{content(true)}</div>
      </details>
    </>
  );
}
