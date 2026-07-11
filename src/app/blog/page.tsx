import Link from "next/link";
import { BlogKnowledgeExplorer } from "@/components/BlogKnowledgeExplorer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { blogLinkMap, blogPageTree, blogPreviewEntries } from "@/lib/blog-source";

export const metadata = {
  title: "Blog",
  description: "Tonkic 的人工智能、计算机与学习知识库。",
  alternates: { canonical: "/blog/" },
};

const featuredSlugs = ["0d01619aaa-attention-mask", "9185bf3a6c-sigmoid", "10ce7af36f"];

export default function BlogPage() {
  const featuredEntries = featuredSlugs
    .map((slug) => blogPreviewEntries.find((entry) => entry.slug === slug))
    .filter((entry): entry is (typeof blogPreviewEntries)[number] => Boolean(entry));

  return (
    <div className="page-stack">
      <PageHero eyebrow="Writing" title="Blog" outline="notes">
        来自 Obsidian vault 的人工智能、计算机与学习笔记。可以按目录深入，也可以直接搜索。
      </PageHero>
      {featuredEntries.length ? (
        <Reveal className="featured-notes">
          <div className="section-heading compact-heading">
            <p className="eyebrow">Recommended</p>
            <h2>推荐阅读</h2>
          </div>
          <div className="note-grid">
            {featuredEntries.map((entry) => (
              <Link className="note-card" href={entry.href} key={entry.slug}>
                <span>{entry.sourcePath?.split("/").slice(-2, -1)[0] || "Blog"}</span>
                <strong>{entry.title}</strong>
                <p>{entry.summary}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      ) : null}
      <Reveal className="glass-panel">
        <BlogKnowledgeExplorer entries={blogPreviewEntries} linkMap={blogLinkMap} pageTree={blogPageTree} />
      </Reveal>
    </div>
  );
}
