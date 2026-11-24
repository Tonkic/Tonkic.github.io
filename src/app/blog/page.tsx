import Link from "next/link";
import { BlogKnowledgeGraph } from "@/components/BlogKnowledgeGraph";
import { LocalizedText } from "@/components/LocalizedText";
import { messages } from "@/i18n/messages";
import { blogGraphData, blogListEntries } from "@/lib/blog-source";

export const metadata = {
  title: "Blog",
  description: "Tonkic 的人工智能、计算机与学习知识库。 AI, computing, and learning notes from Tonkic.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const featuredNotes = blogListEntries
    .filter((entry) => entry.summary && entry.summary.length > 20)
    .slice(0, 8);

  return (
    <div className="blog-workspace-home">
      <header className="blog-workspace-header">
        <h1>
          <span data-lang="zh">知识库</span>
          <span data-lang="en">Knowledge Base</span>
        </h1>
        <span className="blog-workspace-count">{blogListEntries.length}</span>
      </header>

      <BlogKnowledgeGraph data={blogGraphData} />

      {featuredNotes.length > 0 ? (
        <section className="blog-index-section">
          <h2 className="blog-index-section-title">
            <LocalizedText text={{ zh: messages.zh.blog.featured, en: messages.en.blog.featured }} />
          </h2>
          <div className="blog-note-index">
            {featuredNotes.map((entry) => (
              <Link className="blog-note-row" href={entry.href} key={entry.slug}>
                <div className="blog-note-row-main">
                  <strong>{entry.title}</strong>
                  <span>{entry.tags?.slice(0, 2).join(" / ") || "Note"}</span>
                </div>
                <i aria-hidden="true">→</i>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
