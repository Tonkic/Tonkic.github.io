import { EntryDetail } from "@/components/EntryDetail";
import { talkEntries } from "@/data/site";

export function generateStaticParams() {
  return talkEntries.map((entry) => ({ slug: entry.slug }));
}

export default async function TalkEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryDetail entry={talkEntries.find((entry) => entry.slug === slug)} />;
}
