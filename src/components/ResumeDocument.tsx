"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { PrintResumeButton } from "@/components/PrintResumeButton";
import { useLanguage } from "@/components/LanguageProvider";
import { resumeEducation, resumeExperiences, resumeProfile, resumeProjects, resumeSkills } from "@/data/resume";
import { resumeEducationEn, resumeExperiencesEn, resumeProfileEn, resumeProjectsEn, resumeSkillsEn } from "@/data/resume-en";

export function ResumeDocument() {
  const { locale } = useLanguage();
  const english = locale === "en";
  const profile = english ? resumeProfileEn : resumeProfile;
  const education = english ? resumeEducationEn : resumeEducation;
  const experiences = english ? resumeExperiencesEn : resumeExperiences;
  const projects = english ? resumeProjectsEn : resumeProjects;
  const skills = english ? resumeSkillsEn : resumeSkills;
  const contacts = [profile.phone, profile.email, profile.location].filter(Boolean);

  return (
    <div className="resume-export-page">
      <div className="resume-toolbar"><PrintResumeButton /></div>
      <article className="resume-a4" aria-label={english ? "Tonkic resume" : "Tonkic 的求职简历"}>
        <header className="resume-a4-header">
          <div className="resume-identity">
            <h1>{profile.name}</h1>
            <p>{contacts.join(" 丨 ")}</p>
            <p className="resume-links">{profile.github} 丨 {profile.website}</p>
            <p className="resume-target-line">{english ? "Target: " : "求职方向："}{profile.target}</p>
          </div>
          <div className="resume-photo" aria-label={profile.photoAlt}>{english ? "PHOTO" : "证件照"}</div>
        </header>

        <ResumeSection title={english ? "Education" : "教育经历"}>
          {education.map((item) => (
            <div className="resume-line-item" key={`${item.school}-${item.degree}`}>
              <div><strong>{item.school}</strong>{item.tags.map((tag) => <span className="resume-badge" key={tag}>{tag}</span>)}<p>{item.detail} {item.degree}</p></div>
              <time>{item.period}</time>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title={english ? "Experience" : "实习经历"}>
          {experiences.map((item) => (
            <div className="resume-internship" key={`${item.company}-${item.role}`}>
              <div className="resume-line-item compact"><strong>{item.company}</strong><time>{item.period}</time></div>
              <div className="resume-line-item compact muted"><span>{item.role}</span><span>{item.location}</span></div>
              <p className="resume-tech-stack"><strong>{english ? "Stack: " : "技术栈："}</strong>{item.techStack}</p>
              <BulletList items={item.bullets} />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title={english ? "Projects" : "项目经历"}>
          {projects.map((project) => (
            <div className="resume-block-item" key={project.name}>
              <strong>{project.name}{project.url ? <Link className="resume-project-link" href={project.url} target="_blank" rel="noreferrer">{project.urlLabel ?? project.url}</Link> : null}<span>{project.description}</span></strong>
              <BulletList items={project.bullets} />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title={english ? "Skills" : "专业技能"}>
          {skills.map((skill) => <div className="resume-block-item" key={skill.category}><strong>{skill.category}</strong><ul className="resume-bullets"><li>{skill.detail}</li></ul></div>)}
        </ResumeSection>
      </article>
    </div>
  );
}

function ResumeSection({ children, title }: { children: ReactNode; title: string }) {
  return <section className="resume-a4-section"><h2>{title}</h2><div className="resume-section-body">{children}</div></section>;
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="resume-bullets">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
