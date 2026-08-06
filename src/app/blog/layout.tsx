import { BlogSidebar } from "@/components/BlogSidebar";
import { blogListEntries, blogPageTree } from "@/lib/blog-source";

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="blog-layout">
      <BlogSidebar pageTree={blogPageTree} entries={blogListEntries} />
      <div className="blog-layout-content">{children}</div>
    </div>
  );
}
