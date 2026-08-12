import { EmptyArchivePage } from "@/components/EmptyArchivePage";
import { publicationEntries } from "@/data/site";

export const metadata = { title: "Publications", description: "Tonkic publications and public academic work. Tonkic 的论文与公开学术成果。", alternates: { canonical: "/publications/" } };
export default function PublicationsPage() { return <EmptyArchivePage entries={publicationEntries} kind="publications" />; }
