import { EntryDetail } from "@/components/EntryDetail";
import { publicationEntries } from "@/data/site";

export function generateStaticParams() {
  return publicationEntries.map((entry) => ({ slug: entry.slug }));
}

export default async function PublicationEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryDetail entry={publicationEntries.find((entry) => entry.slug === slug)} />;
}
