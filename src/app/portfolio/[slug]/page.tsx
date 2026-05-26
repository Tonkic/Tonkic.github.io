import { EntryDetail } from "@/components/EntryDetail";
import { portfolioEntries } from "@/data/site";

export function generateStaticParams() {
  return portfolioEntries.map((entry) => ({ slug: entry.slug }));
}

export default async function PortfolioEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryDetail entry={portfolioEntries.find((entry) => entry.slug === slug)} />;
}
