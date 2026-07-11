"use client";

import Link from "next/link";
import type { CSSProperties, WheelEvent } from "react";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import type { PageTree } from "fumadocs-core/server";
import { MarkdownContent } from "@/components/MarkdownContent";
import type { ContentEntry } from "@/data/site";

type TreeNode = PageTree.Node;
type FolderNode = PageTree.Folder;

const normalizeUrl = (url?: string) => {
  if (!url) return "";
  return url.endsWith("/") ? url : `${url}/`;
};

const getNodeText = (value: PageTree.Node["name"]) =>
  typeof value === "string" || typeof value === "number" ? String(value).replace(/_$/, "") : "未命名";

const countPages = (nodes: TreeNode[]): number =>
  nodes.reduce((total, node) => {
    if (node.type === "page") return total + 1;
    if (node.type === "folder") return total + countPages(node.children) + (node.index ? 1 : 0);
    return total;
  }, 0);

const stopWheelPropagation = (event: WheelEvent<HTMLElement>) => {
  event.stopPropagation();
};

const TreePage = ({
  activeUrl,
  node,
  onSelect,
}: {
  activeUrl: string;
  node: PageTree.Item;
  onSelect: (url: string) => void;
}) => {
  const nodeUrl = normalizeUrl(node.url);

  return (
    <button
      aria-pressed={activeUrl === nodeUrl}
      className={activeUrl === nodeUrl ? "knowledge-page-link active" : "knowledge-page-link"}
      onClick={() => onSelect(nodeUrl)}
      type="button"
    >
      {getNodeText(node.name)}
    </button>
  );
};

const TreeFolder = ({
  activeUrl,
  node,
  onSelect,
  depth = 0,
}: {
  activeUrl: string;
  node: FolderNode;
  onSelect: (url: string) => void;
  depth?: number;
}) => {
  const [open, setOpen] = useState(depth < 2);
  const pageCount = countPages(node.children) + (node.index ? 1 : 0);

  return (
    <div className="knowledge-folder" style={{ "--depth": depth } as CSSProperties}>
      <button className="knowledge-folder-button" onClick={() => setOpen((value) => !value)} type="button">
        <span>{open ? "-" : "+"}</span>
        <strong>{getNodeText(node.name)}</strong>
        <em>{pageCount}</em>
      </button>
      {open ? (
        <div className="knowledge-folder-children">
          {node.index ? <TreePage activeUrl={activeUrl} node={node.index} onSelect={onSelect} /> : null}
          {node.children.map((child) => (
            <TreeNodeView
              activeUrl={activeUrl}
              depth={depth + 1}
              key={child.$id ?? `${child.type}-${getNodeText(child.name)}`}
              node={child}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const TreeNodeView = ({
  activeUrl,
  node,
  onSelect,
  depth,
}: {
  activeUrl: string;
  node: TreeNode;
  onSelect: (url: string) => void;
  depth: number;
}) => {
  if (node.type === "folder") {
    return <TreeFolder activeUrl={activeUrl} depth={depth} node={node} onSelect={onSelect} />;
  }
  if (node.type === "page") return <TreePage activeUrl={activeUrl} node={node} onSelect={onSelect} />;
  return null;
};

export function BlogKnowledgeExplorer({
  entries,
  linkMap,
  pageTree,
}: {
  entries: ContentEntry[];
  linkMap?: Record<string, string>;
  pageTree: PageTree.Root;
}) {
  const entriesByHref = useMemo(() => new Map(entries.map((entry) => [normalizeUrl(entry.href), entry])), [entries]);
  const entriesBySlug = useMemo(() => new Map(entries.map((entry) => [entry.slug, entry])), [entries]);
  const firstEntry = entries[0];
  const [activeSlug, setActiveSlug] = useState(firstEntry?.slug ?? "");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());
  const previewRef = useRef<HTMLElement>(null);
  const activeEntry = entriesBySlug.get(activeSlug) ?? firstEntry;
  const normalizedActiveUrl = normalizeUrl(activeEntry?.href);
  const searchResults = useMemo(() => {
    if (!deferredQuery) return [];
    return entries
      .filter((entry) =>
        [entry.title, entry.summary, entry.sourcePath]
          .filter(Boolean)
          .some((value) => value!.toLocaleLowerCase().includes(deferredQuery)),
      )
      .slice(0, 40);
  }, [deferredQuery, entries]);

  const selectEntry = (url: string) => {
    const entry = entriesByHref.get(normalizeUrl(url));
    if (entry) {
      setActiveSlug(entry.slug);
      previewRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="knowledge-explorer">
      <aside className="knowledge-tree" aria-label="Blog 知识库目录树">
        <div className="blog-explorer-head compact">
          <div>
            <span className="entry-meta">Fumadocs page tree</span>
            <h2>知识库目录</h2>
          </div>
          <p>{countPages(pageTree.children)} 篇</p>
        </div>
        <label className="knowledge-search">
          <span className="sr-only">搜索知识库</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题、路径或内容摘要"
            type="search"
            value={query}
          />
          {query ? <strong>{searchResults.length}</strong> : <kbd>⌕</kbd>}
        </label>
        <div className="knowledge-tree-body" data-lenis-prevent onWheel={stopWheelPropagation}>
          {deferredQuery ? (
            searchResults.length ? (
              <div className="knowledge-search-results">
                {searchResults.map((entry) => (
                  <button
                    className={entry.slug === activeEntry?.slug ? "knowledge-search-result active" : "knowledge-search-result"}
                    key={entry.slug}
                    onClick={() => selectEntry(entry.href)}
                    type="button"
                  >
                    <strong>{entry.title}</strong>
                    <span>{entry.sourcePath}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state compact">没有找到匹配笔记。</div>
            )
          ) : (
            pageTree.children.map((node) => (
              <TreeNodeView
                activeUrl={normalizedActiveUrl}
                depth={0}
                key={node.$id ?? `${node.type}-${getNodeText(node.name)}`}
                node={node}
                onSelect={selectEntry}
              />
            ))
          )}
        </div>
      </aside>

      <section
        aria-label="笔记内容预览"
        className="knowledge-preview"
        data-lenis-prevent
        onWheel={stopWheelPropagation}
        ref={previewRef}
      >
        {activeEntry ? (
          <>
            <div className="blog-explorer-head compact">
              <div>
                <span className="entry-meta">{activeEntry.sourcePath ?? activeEntry.type}</span>
                <h2>{activeEntry.title}</h2>
              </div>
              <Link className="button ghost" href={activeEntry.href}>
                打开完整页面
              </Link>
            </div>
            <div className="knowledge-preview-body">
              <MarkdownContent
                content={activeEntry.content ?? activeEntry.summary}
                linkMap={linkMap}
                sourcePath={activeEntry.sourcePath}
              />
            </div>
          </>
        ) : (
          <div className="empty-state">暂时没有可预览的笔记。</div>
        )}
      </section>
    </div>
  );
}
