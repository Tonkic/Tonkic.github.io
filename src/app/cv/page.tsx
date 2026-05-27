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
        面向求职和工作场景，集中放教育背景、技能、项目经历与联系方式。
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
