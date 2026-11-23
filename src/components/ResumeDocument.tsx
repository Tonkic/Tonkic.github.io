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
  const githubLabel = profile.github.replace(/^https?:\/\//, "");
  const websiteLabel = profile.website.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="resume-export-page">
      <div className="resume-toolbar">
        <span className="resume-toolbar-hint">
          {english ? "A4 print-ready · Fits cleanly on PDF export" : "A4 排版已适配 · 支持直接导出单页 PDF"}
        </span>
        <PrintResumeButton />
      </div>

      <article className="resume-a4" aria-label={english ? "Tonkic resume" : "Tonkic 的个人简历"}>
        <header className="resume-a4-header">
          <div className="resume-identity">
            <h1>{profile.name}</h1>
            <p className="resume-target-line">
              {english ? "Target Role: " : "求职意向："}
              <strong>{profile.target}</strong>
            </p>
            <p className="resume-meta-row">
              <span>{profile.location}</span>
              <span aria-hidden>·</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span aria-hidden>·</span>
              <Link href={profile.github} target="_blank" rel="noreferrer">{githubLabel}</Link>
              <span aria-hidden>·</span>
              <Link href={profile.website} target="_blank" rel="noreferrer">{websiteLabel}</Link>
            </p>
          </div>
        </header>

        <ResumeSection title={english ? "Education" : "教育背景"}>
          {education.map((item) => (
            <div className="resume-line-item" key={`${item.school}-${item.degree}`}>
              <div>
                <div className="resume-school-row">
                  <strong>{item.school}</strong>
                  <span className="resume-degree">{item.degree}</span>
                  {item.tags.map((tag) => (
                    <span className="resume-badge" key={tag}>{tag}</span>
                  ))}
                </div>
                <p>{item.detail}</p>
              </div>
              <time>{item.period}</time>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title={english ? "Projects" : "项目经历"}>
          {projects.map((project) => (
            <div className="resume-block-item" key={project.name}>
              <div className="resume-project-heading">
                <strong>{project.name}</strong>
                <span>{project.description}</span>
                {project.url ? (
                  <Link className="resume-project-link" href={project.url} target="_blank" rel="noreferrer">
                    {project.urlLabel ?? project.url} ↗
                  </Link>
                ) : null}
              </div>
              <BulletList items={project.bullets} />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title={english ? "Internship Experience" : "实习经历"}>
          {experiences.map((item) => (
            <div className="resume-internship" key={`${item.company}-${item.role}`}>
              <div className="resume-line-item compact">
                <div className="resume-company-row">
                  <strong>{item.company}</strong>
                  <span className="resume-role-sep">·</span>
                  <span className="resume-role">{item.role}</span>
                  <span className="resume-location">（{item.location}）</span>
                </div>
                <time>{item.period}</time>
              </div>
              <div className="resume-experience-project">
                <strong>{item.projectName}</strong>
                <span>{item.projectDescription}</span>
              </div>
              <BulletList items={item.bullets} />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title={english ? "Technical Skills" : "专业技能"}>
          <ul className="resume-bullets resume-skills-list">
            {skills.map((skill) => (
              <li key={skill.category}>
                <strong>{skill.category}{english ? ": " : "："}</strong>
                <span>{skill.detail}</span>
              </li>
            ))}
          </ul>
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
