export const metadata = {
  title: "Blog",
  description: "Tonkic 的人工智能、计算机与学习知识库。 AI, computing, and learning notes from Tonkic.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return (
    <div className="page-stack blog-page">
      <section className="blog-index-card">
        <span className="eyebrow">Tonkic / Blog</span>
        <h1><span data-lang="zh">知识库</span><span data-lang="en">Knowledge Base</span></h1>
        <p><span data-lang="zh">从左侧目录进入一篇笔记。内容按知识库路径组织，每篇笔记使用独立页面。</span><span data-lang="en">Choose a note from the directory. Content follows the knowledge-base structure and each note has its own page.</span></p>
        <div className="blog-index-rule" />
        <div className="blog-index-hint"><span><i data-lang="zh">目录树优先</i><i data-lang="en">Directory first</i></span><span>Markdown / LaTeX</span><span><i data-lang="zh">持续同步</i><i data-lang="en">Continuously synced</i></span></div>
      </section>
    </div>
  );
}
