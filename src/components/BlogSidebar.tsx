"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type { PageTree } from "fumadocs-core/server";
import type { BlogSearchItem } from "@/lib/blog-source";
import { useLanguage } from "@/components/LanguageProvider";

type TreeNode = PageTree.Node;
type FolderNode = PageTree.Folder;

const normalizeUrl = (url?: string) => {
  if (!url) return "";
  return url.endsWith("/") ? url : `${url}/`;
};

const nodeText = (value: PageTree.Node["name"], fallback: string) =>
  typeof value === "string" || typeof value === "number" ? String(value).replace(/_$/, "") : fallback;

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

function TreePage({ node, activeUrl, depth, unnamed }: { node: PageTree.Item; activeUrl: string; depth: number; unnamed: string }) {
  const href = normalizeUrl(node.url);
  const active = activeUrl === href;
  return (
    <Link className={`blog-tree-link ${active ? "active" : ""}`} href={href} aria-current={active ? "page" : undefined}>
      <span className="blog-tree-marker" aria-hidden="true">{active ? "●" : "·"}</span>
      <span style={{ paddingInlineStart: `${depth * 10}px` }}>{nodeText(node.name, unnamed)}</span>
    </Link>
  );
}

function TreeNodeView({ node, activeUrl, depth, unnamed }: { node: TreeNode; activeUrl: string; depth: number; unnamed: string }) {
  if (node.type === "page") return <TreePage node={node} activeUrl={activeUrl} depth={depth} unnamed={unnamed} />;
  if (node.type !== "folder") return null;
  return <TreeFolder node={node} activeUrl={activeUrl} depth={depth} unnamed={unnamed} />;
}

function TreeFolder({ node, activeUrl, depth, unnamed }: { node: FolderNode; activeUrl: string; depth: number; unnamed: string }) {
  const [open, setOpen] = useState(depth < 1 || containsActivePage(node, activeUrl));
  const pageCount = countPages(node.children) + (node.index ? 1 : 0);

  useEffect(() => {
    if (containsActivePage(node, activeUrl)) setOpen(true);
  }, [activeUrl, node]);

  return (
    <div className="blog-tree-folder" style={{ "--tree-depth": depth } as CSSProperties}>
      <button className="blog-tree-folder-button" onClick={() => setOpen((value) => !value)} type="button" aria-expanded={open}>
        <span className="blog-tree-chevron" aria-hidden="true">{open ? "−" : "+"}</span>
        <span>{nodeText(node.name, unnamed)}</span>
        <small>{pageCount}</small>
      </button>
      {open ? (
        <div className="blog-tree-children">
          {node.index ? <TreePage node={node.index} activeUrl={activeUrl} depth={depth + 1} unnamed={unnamed} /> : null}
          {node.children.map((child) => (
            <TreeNodeView
              key={child.$id ?? `${child.type}-${nodeText(child.name, unnamed)}`}
              node={child}
              activeUrl={activeUrl}
              depth={depth + 1}
              unnamed={unnamed}
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
  searchResults: BlogSearchItem[];
  query: string;
}) {
  const { t } = useLanguage();
  const unnamed = t("blog.unnamed");

  if (query) {
    return searchResults.length ? (
      <div className="blog-search-results">
        {searchResults.map((entry) => (
          <Link className={`blog-search-result ${activeUrl === normalizeUrl(entry.href) ? "active" : ""}`} href={entry.href} key={entry.slug}>
            <strong>{entry.title}</strong>
            <small>{entry.tags?.join(" / ") || "Blog"}</small>
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
        <TreeNodeView key={node.$id ?? `${node.type}-${nodeText(node.name, unnamed)}`} node={node} activeUrl={activeUrl} depth={0} unnamed={unnamed} />
      ))}
    </div>
  );
}

export function BlogSidebar({ pageTree, entries }: { pageTree: PageTree.Root; entries: BlogSearchItem[] }) {
  const pathname = usePathname() ?? "/blog/";
  const { locale, t } = useLanguage();
  const activeUrl = normalizeUrl(pathname);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const mobileDetailsRef = useRef<HTMLDetailsElement>(null);

  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());
  const totalNotes = useMemo(() => countPages(pageTree.children), [pageTree.children]);
  const searchResults = useMemo(
    () =>
      entries
        .filter((entry) =>
          [entry.title, entry.summary, entry.sourcePath]
            .filter(Boolean)
            .some((value) => value!.toLocaleLowerCase().includes(deferredQuery)),
        )
        .slice(0, 50),
    [deferredQuery, entries],
  );

  useEffect(() => {
    setMobileOpen(false);
    if (mobileDetailsRef.current) {
      mobileDetailsRef.current.open = false;
    }
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (window.matchMedia("(max-width: 860px)").matches) {
          setMobileOpen(true);
          if (mobileDetailsRef.current) mobileDetailsRef.current.open = true;
          window.requestAnimationFrame(() => mobileInputRef.current?.focus());
        } else {
          desktopInputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const renderContent = (mobile = false): ReactNode => {
    const inputId = mobile ? "blog-search-mobile" : "blog-search-desktop";
    return (
      <>
        {!mobile ? (
          <div className="blog-sidebar-head">
            <Link className="blog-sidebar-root-link" href="/blog">
              {locale === "zh" ? "知识图谱" : "Constellation"}
            </Link>
            <span>{totalNotes} {t("blog.noteCount")}</span>
          </div>
        ) : null}
        <div className="blog-sidebar-search">
          <label className="sr-only" htmlFor={inputId}>{t("blog.searchLabel")}</label>
          <input
            id={inputId}
            ref={mobile ? mobileInputRef : desktopInputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                if (query) setQuery("");
                else event.currentTarget.blur();
              }
            }}
            type="search"
            placeholder={t("blog.searchPlaceholder")}
          />
          {query ? (
            <button
              aria-label={locale === "zh" ? "清空搜索" : "Clear search"}
              className="blog-search-clear"
              onClick={() => setQuery("")}
              type="button"
            >
              ×
            </button>
          ) : (
            <kbd aria-hidden="true">⌘K</kbd>
          )}
        </div>
        <div className="blog-sidebar-tree" data-lenis-prevent>
          <TreeContent pageTree={pageTree} activeUrl={activeUrl} searchResults={searchResults} query={deferredQuery} />
        </div>
      </>
    );
  };

  return (
    <>
      <aside className="blog-sidebar" aria-label={t("blog.directory")}>
        {renderContent(false)}
      </aside>
      <details
        className="blog-sidebar-mobile"
        onToggle={(event) => setMobileOpen(event.currentTarget.open)}
        ref={mobileDetailsRef}
      >
        <summary>
          <span aria-hidden="true">☰</span>
          <strong>{t("blog.mobileTitle")}</strong>
          <small>{totalNotes} {t("blog.noteCount")}</small>
        </summary>
        {mobileOpen ? <div className="blog-sidebar-mobile-content">{renderContent(true)}</div> : null}
      </details>
    </>
  );
}
