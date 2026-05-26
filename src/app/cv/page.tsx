import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { siteProfile } from "@/data/site";

export const metadata = {
  title: "CV",
};

export default function CvPage() {
  return (
    <div className="page-stack">
      <PageHero eyebrow="Career" title="CV" outline="profile">
        CV 与学术内容分开。这里面向求职和工作场景，后续可以逐步补充教育经历、项目经历、技能栈与工作材料。
      </PageHero>
      <Reveal className="glass-panel split-panel">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>{siteProfile.realName}</h2>
          <p>{siteProfile.role}</p>
          <p>{siteProfile.affiliation}</p>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <p>Email: {siteProfile.email}</p>
          <p>
            GitHub:{" "}
            <Link href={siteProfile.github} target="_blank">
              {siteProfile.github}
            </Link>
          </p>
        </div>
      </Reveal>
    </div>
  );
}
