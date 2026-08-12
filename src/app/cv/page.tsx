import { ResumeDocument } from "@/components/ResumeDocument";

export const metadata = {
  title: "CV",
  description: "Tonkic 的中英文教育、实习、项目与专业技能简历。 Bilingual CV covering education, experience, projects, and skills.",
  alternates: { canonical: "/cv/" },
};

export default function CvPage() {
  return <ResumeDocument />;
}
