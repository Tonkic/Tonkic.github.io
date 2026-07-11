import type { Metadata } from "next";
import { EntryDetail } from "@/components/EntryDetail";
import { portfolioEntries } from "@/data/site";

export function generateStaticParams() {
  return portfolioEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = portfolioEntries.find((item) => item.slug === slug);
  if (!entry) return { title: "项目未找到" };

  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `${entry.href}/` },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      url: `${entry.href}/`,
    },
  };
}

export default async function PortfolioEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryDetail entry={portfolioEntries.find((entry) => entry.slug === slug)} />;
}
