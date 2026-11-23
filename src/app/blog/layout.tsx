import { BlogSidebar } from "@/components/BlogSidebar";
import { blogPageTree, blogSearchEntries } from "@/lib/blog-source";

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="blog-layout">
      <BlogSidebar pageTree={blogPageTree} entries={blogSearchEntries} />
      <div className="blog-layout-content">{children}</div>
    </div>
  );
}
