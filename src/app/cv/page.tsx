import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  resumeEducation,
  resumeExperiences,
  resumeProfile,
  resumeSkills,
} from "@/data/resume";

export const metadata = {
  title: "CV",
};

export default function CvPage() {
  return (
    <div className="page-stack resume-page">
      <Reveal className="resume-sheet">
        <header className="resume-header">
          <div>
            <p className="eyebrow">Career Resume</p>
            <h1>{resumeProfile.name}</h1>
            <p className="resume-handle">{resumeProfile.handle}</p>
            <p className="resume-target">求职方向：{resumeProfile.target}</p>
          </div>
          <address className="resume-contact">
            <a href={`mailto:${resumeProfile.email}`}>{resumeProfile.email}</a>
            <Link href={resumeProfile.github} target="_blank">
              GitHub
            </Link>
            <Link href={resumeProfile.website} target="_blank">
              Website
            </Link>
          </address>
        </header>

        <section className="resume-section resume-summary">
          <h2>个人简介</h2>
          <p>{resumeProfile.summary}</p>
        </section>

        <section className="resume-section">
          <h2>教育经历</h2>
          <div className="resume-timeline">
            {resumeEducation.map((item) => (
              <article className="resume-item" key={`${item.school}-${item.degree}`}>
                <div className="resume-item-main">
                  <h3>{item.school}</h3>
                  <p>
                    {item.degree} · {item.detail}
                  </p>
                  <div className="tag-row">
                    {item.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <time>{item.period}</time>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>实习经历</h2>
          <div className="resume-timeline">
            {resumeExperiences.map((item) => (
              <article className="resume-item resume-experience" key={`${item.company}-${item.role}`}>
                <div className="resume-item-main">
                  <div className="resume-item-title">
                    <h3>{item.company}</h3>
                    <span>{item.location}</span>
                  </div>
                  <p className="resume-role">{item.role}</p>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <time>{item.period}</time>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>技能栈</h2>
          <div className="resume-skills">
            {resumeSkills.map((group) => (
              <article key={group.label}>
                <h3>{group.label}</h3>
                <p>{group.items.join(" / ")}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
