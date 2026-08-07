import { PrintResumeButton } from "@/components/PrintResumeButton";
import type { ReactNode } from "react";
import {
  resumeEducation,
  resumeExperiences,
  resumeProfile,
  resumeProjects,
  resumeSkills,
} from "@/data/resume";

export const metadata = {
  title: "CV",
  description: "Tonkic 的教育、实习、项目与专业技能简历。",
  alternates: { canonical: "/cv/" },
};

export default function CvPage() {
  const contacts = [resumeProfile.phone, resumeProfile.email, resumeProfile.location].filter(Boolean);

  return (
    <div className="resume-export-page">
      <div className="resume-toolbar">
        <PrintResumeButton />
      </div>

      <article className="resume-a4" aria-label="Tonkic 的求职简历">
        <header className="resume-a4-header">
          <div className="resume-identity">
            <h1>{resumeProfile.name}</h1>
            <p>{contacts.join(" 丨 ")}</p>
            <p className="resume-links">
              {resumeProfile.github} 丨 {resumeProfile.website}
            </p>
            <p className="resume-target-line">求职方向：{resumeProfile.target}</p>
          </div>
          <div className="resume-photo" aria-label={resumeProfile.photoAlt}>
            证件照
          </div>
        </header>

        <ResumeSection title="教育经历">
          {resumeEducation.map((item) => (
            <div className="resume-line-item" key={`${item.school}-${item.degree}`}>
              <div>
                <strong>{item.school}</strong>
                {item.tags.map((tag) => (
                  <span className="resume-badge" key={tag}>
                    {tag}
                  </span>
                ))}
                <p>
                  {item.detail} {item.degree}
                </p>
              </div>
              <time>{item.period}</time>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="实习经历">
          {resumeExperiences.map((item) => (
            <div className="resume-internship" key={`${item.company}-${item.role}`}>
              <div className="resume-line-item compact">
                <strong>{item.company}</strong>
                <time>{item.period}</time>
              </div>
              <div className="resume-line-item compact muted">
                <span>{item.role}</span>
                <span>{item.location}</span>
              </div>
              <p className="resume-tech-stack">
                <strong>技术栈：</strong>
                {item.techStack}
              </p>
              <BulletList items={item.bullets} />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="项目经历">
          {resumeProjects.map((project) => (
            <div className="resume-block-item" key={project.name}>
              <strong>
                {project.name}
                <span>{project.description}</span>
              </strong>
              <BulletList items={project.bullets} />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="专业技能">
          <div className="resume-skill-matrix">
            {resumeSkills.map((skill) => (
              <div className="resume-skill-item" key={skill.category}>
                <strong>{skill.category}</strong>
                <p>{skill.detail}</p>
              </div>
            ))}
          </div>
        </ResumeSection>
      </article>
    </div>
  );
}

function ResumeSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="resume-a4-section">
      <h2>{title}</h2>
      <div className="resume-section-body">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="resume-bullets">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
