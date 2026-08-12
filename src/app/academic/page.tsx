import { AcademicContent } from "@/components/AcademicContent";

export const metadata = {
  title: "Academic / 学术内容",
  description: "Tonkic 的研究兴趣、论文与学术分享。 Research interests, publications, and talks.",
  alternates: { canonical: "/academic/" },
};

export default function AcademicPage() {
  return <AcademicContent />;
}
