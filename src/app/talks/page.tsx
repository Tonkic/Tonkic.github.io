import { EmptyArchivePage } from "@/components/EmptyArchivePage";
import { talkEntries } from "@/data/site";

export const metadata = { title: "Talks", description: "Tonkic talks, presentations, and academic exchanges. Tonkic 的报告、分享与学术交流记录。", alternates: { canonical: "/talks/" } };
export default function TalksPage() { return <EmptyArchivePage entries={talkEntries} kind="talks" />; }
