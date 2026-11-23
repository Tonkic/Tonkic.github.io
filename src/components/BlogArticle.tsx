import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { extractMarkdownHeadings } from "@/lib/markdown";
import type { ContentEntry } from "@/data/site";
import { LocalizedText } from "@/components/LocalizedText";
import { messages } from "@/i18n/messages";

export function BlogArticle({ entry, linkMap, previous, next }: {
  entry?: ContentEntry;
  linkMap?: Record<string, string>;
  previous?: ContentEntry;
  next?: ContentEntry;
}) {
  if (!entry) notFound();
  const headings = extractMarkdownHeadings(entry.content ?? "", entry.title).filter((heading) => heading.depth <= 4);

  return (
    <div className="blog-article-layout">
      <article className="blog-article">
        <header className="blog-article-header">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/blog/">Blog</Link>
            {entry.tags?.length ? (
              entry.tags.map((tag) => (
                <span className="blog-breadcrumb-item" key={tag}>
                  <span aria-hidden="true">/</span>
                  <span>{tag}</span>
                </span>
              ))
            ) : (
              <span className="blog-breadcrumb-item">
                <span aria-hidden="true">/</span>
                <span><LocalizedText text={{ zh: messages.zh.blog.note, en: messages.en.blog.note }} /></span>
              </span>
            )}
          </nav>
          <h1>{entry.title}</h1>
          {entry.tags?.length ? (
            <ul className="tag-row blog-article-tags" role="list">
              {entry.tags.map((tag) => (
                <li className="tag" key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
          <div className="blog-article-meta">
            {entry.date ? <time dateTime={entry.date}>{entry.date}</time> : null}
            {entry.sourceUrl ? (
              <Link href={entry.sourceUrl} target="_blank" rel="noreferrer">
                <LocalizedText text={{ zh: messages.zh.blog.original, en: messages.en.blog.original }} />
              </Link>
            ) : null}
          </div>
        </header>

        {entry.content ? (
          <div className="blog-article-body">
            <MarkdownContent
              content={entry.content}
              linkMap={linkMap}
              sourcePath={entry.sourcePath}
              title={entry.title}
            />
          </div>
        ) : (
          <p className="blog-sidebar-empty">
            <LocalizedText text={{ zh: messages.zh.blog.noBody, en: messages.en.blog.noBody }} />
          </p>
        )}

        <nav className="blog-article-pagination" aria-label="Article pagination">
          {previous ? (
            <Link href={previous.href}>
              <small><LocalizedText text={{ zh: messages.zh.blog.previous, en: messages.en.blog.previous }} /></small>
              <strong>{previous.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={next.href} className="next">
              <small><LocalizedText text={{ zh: messages.zh.blog.next, en: messages.en.blog.next }} /></small>
              <strong>{next.title}</strong>
            </Link>
          ) : <span />}
        </nav>
      </article>

      <aside className="blog-article-aside" aria-label="On this page">
        <div className="blog-toc">
          <span className="blog-aside-label">
            <LocalizedText text={{ zh: messages.zh.blog.onThisPage, en: messages.en.blog.onThisPage }} />
          </span>
          {headings.length ? (
            <nav aria-label="Sections">
              {headings.map((heading) => (
                <a href={`#${heading.id}`} className={`depth-${heading.depth}`} key={heading.id}>
                  {heading.text}
                </a>
              ))}
            </nav>
          ) : (
            <p><LocalizedText text={{ zh: messages.zh.blog.noToc, en: messages.en.blog.noToc }} /></p>
          )}
        </div>
      </aside>
    </div>
  );
}
