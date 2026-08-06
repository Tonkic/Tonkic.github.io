import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { extractMarkdownHeadings } from "@/lib/markdown";
import type { ContentEntry } from "@/data/site";

export function BlogArticle({ entry, linkMap, previous, next }: {
  entry?: ContentEntry;
  linkMap?: Record<string, string>;
  previous?: ContentEntry;
  next?: ContentEntry;
}) {
  if (!entry) notFound();
  const headings = extractMarkdownHeadings(entry.content ?? "").filter((heading) => heading.depth <= 4);

  return (
    <div className="blog-article-layout">
      <article className="blog-article">
        <header className="blog-article-header">
          <div className="blog-breadcrumb">
            <Link href="/blog/">Blog</Link>
            <span>/</span>
            <span>Note</span>
          </div>
          <h1>{entry.title}</h1>
          {entry.tags?.length ? (
            <div className="tag-row blog-article-tags" aria-label="Tags">
              {entry.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          ) : null}
          <div className="blog-article-meta">
            {entry.date ? <span>{entry.date}</span> : null}
            {entry.sourceUrl ? <Link href={entry.sourceUrl} target="_blank" rel="noreferrer">查看原始笔记 ↗</Link> : null}
          </div>
        </header>
        {entry.content ? (
          <div className="blog-article-body">
            <MarkdownContent content={entry.content} linkMap={linkMap} sourcePath={entry.sourcePath} />
          </div>
        ) : <p className="blog-sidebar-empty">这篇笔记暂时没有正文。</p>}
        <nav className="blog-article-pagination" aria-label="文章导航">
          {previous ? <Link href={previous.href}><small>上一篇</small><strong>{previous.title}</strong></Link> : <span />}
          {next ? <Link href={next.href} className="next"><small>下一篇</small><strong>{next.title}</strong></Link> : <span />}
        </nav>
      </article>
      <aside className="blog-article-aside" aria-label="文章目录">
        <div className="blog-toc">
          <span className="blog-aside-label">ON THIS PAGE</span>
          {headings.length ? (
            <nav>
              {headings.map((heading) => <a href={`#${heading.id}`} className={`depth-${heading.depth}`} key={heading.id}>{heading.text}</a>)}
            </nav>
          ) : <p>暂无目录</p>}
        </div>
      </aside>
    </div>
  );
}
