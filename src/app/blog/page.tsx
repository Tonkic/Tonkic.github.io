export const metadata = {
  title: "Blog",
  description: "Tonkic 的人工智能、计算机与学习知识库。",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return (
    <div className="page-stack blog-page">
      <section className="blog-index-card">
        <span className="eyebrow">Tonkic / Blog</span>
        <h1>知识库</h1>
        <p>从左侧目录进入一篇笔记。内容按知识库路径组织，每篇笔记使用独立页面。</p>
        <div className="blog-index-rule" />
        <div className="blog-index-hint"><span>目录树优先</span><span>Markdown / LaTeX</span><span>持续同步</span></div>
      </section>
    </div>
  );
}
