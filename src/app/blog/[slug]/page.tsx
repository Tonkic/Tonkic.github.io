import { EntryDetail } from "@/components/EntryDetail";
import { blogLinkMap, blogPages, blogSource } from "@/lib/blog-source";

export function generateStaticParams() {
  return blogPages.map((page) => ({ slug: page.slugs[0] }));
}

export default async function BlogEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryDetail entry={blogSource.getPage([slug])?.data} linkMap={blogLinkMap} />;
}
