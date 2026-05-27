import { BlogKnowledgeExplorer } from "@/components/BlogKnowledgeExplorer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { blogLinkMap, blogPageTree, blogPreviewEntries } from "@/lib/blog-source";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Writing" title="Blog" outline="notes">
        技术类、知识类和学习类内容会优先放在这里。内容来自 Obsidian vault 的每日同步，
        作为这个站的长期知识库入口。
      </PageHero>
      <Reveal className="glass-panel">
        <BlogKnowledgeExplorer entries={blogPreviewEntries} linkMap={blogLinkMap} pageTree={blogPageTree} />
      </Reveal>
    </div>
  );
}
