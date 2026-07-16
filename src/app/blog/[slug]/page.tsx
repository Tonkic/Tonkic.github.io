import type { Metadata } from "next";
import { BlogArticle } from "@/components/BlogArticle";
import { blogLinkMap, blogPages, blogSource } from "@/lib/blog-source";

export function generateStaticParams() {
  return blogPages.map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = blogSource.getPage([slug])?.data;
  if (!entry) return { title: "笔记未找到" };

  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `${entry.href}/` },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.summary,
      url: `${entry.href}/`,
    },
  };
}

export default async function BlogEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageIndex = blogPages.findIndex((page) => page.slugs[0] === slug);
  const entry = blogSource.getPage([slug])?.data;
  const previous = pageIndex > 0 ? blogPages[pageIndex - 1]?.data : undefined;
  const next = pageIndex >= 0 ? blogPages[pageIndex + 1]?.data : undefined;
  return <BlogArticle entry={entry} linkMap={blogLinkMap} previous={previous} next={next} />;
}
