import type { ResumeEducation, ResumeExperience, ResumeProject, ResumeSkill } from "./resume";

export const resumeProfileEn = {
  name: "Tonkic",
  handle: "Tonkic",
  phone: "",
  location: "Guangzhou",
  target: "Backend Engineering / AI Infrastructure",
  summary: "Focused on AI API gateways and backend engineering, with hands-on experience from protocol adaptation and model routing to Linux production delivery.",
  email: "tonkic@qq.com",
  github: "https://github.com/Tonkic",
  website: "https://tonkic.github.io/",
  photoAlt: "ID photo placeholder",
};

export const resumeEducationEn: ResumeEducation[] = [
  {
    school: "South China Agricultural University",
    degree: "B.Eng.",
    detail: "Data Science and Big Data Technology / School of Mathematics and Informatics, School of Software / Full-time",
    period: "Sep 2021 – Jun 2025",
    tags: ["Double First-Class"],
  },
  {
    school: "South China Normal University",
    degree: "M.Eng.",
    detail: "Artificial Intelligence / School of Artificial Intelligence / Full-time",
    period: "Sep 2025 – Jun 2028",
    tags: ["Project 211", "Double First-Class"],
  },
];

export const resumeProjectsEn: ResumeProject[] = [
  {
    name: "Multi-model API Aggregation and Relay Platform",
    description: "Go · API Gateway · Protocol Relay",
    url: "https://tonkicapi.xyz/",
    urlLabel: "tonkicapi.xyz",
    bullets: [
      "Extended New API and CLIProxyAPI into a multi-model aggregation and relay platform, connecting provider integration, unified access, and service operations; processed 136,034 requests and 11.82 billion tokens in the past month.",
      "Contributed to compatibility work across OpenAI Responses, Codex, and GitHub Copilot flows, adapting model routing, SSE/WebSocket streaming, and tool-call results.",
      "Contributed to usage-statistics and Keeper integration, while maintaining Linux update scripts, GitHub Actions releases, Alibaba Cloud OSS artifact distribution, and Nginx HTTPS reverse-proxy deployment.",
    ],
  },
  {
    name: "Personal Website and Knowledge Base",
    description: "Next.js · TypeScript · GitHub Pages",
    url: "https://tonkic.github.io/",
    urlLabel: "tonkic.github.io",
    bullets: [
      "Built a personal site with Next.js App Router and TypeScript for the knowledge base, portfolio, online CV, and API relay health page, using static export for GitHub Pages.",
      "Designed the Obsidian synchronization and directory-tree pipeline, including Markdown, KaTeX, internal links, and image rendering; optimized data payloads and long formulas across 300+ static pages.",
      "Established GitHub Actions workflows for content sync, type checking, production builds, regression tests, and Pages deployment.",
    ],
  },
];

export const resumeSkillsEn: ResumeSkill[] = [
  { category: "AI API Gateways and Backend Engineering", detail: "Backend experience with Go, Java, and Python, including REST APIs and multi-model gateways; familiar with model routing, OpenAI-compatible protocols, Responses/Codex flows, SSE/WebSocket streaming, and tool-call adaptation." },
  { category: "Linux Production Delivery", detail: "Hands-on with Linux, Shell, Nginx, HTTPS, and Docker deployment; contributed to GitHub Actions releases, OSS artifact distribution, update scripts, and diagnosis through reverse-proxy, application logs, and process state." },
  { category: "Programming and Data Systems", detail: "Primary languages include Go, Java, Python, and TypeScript. Familiar with object-oriented design, interface abstraction, asynchronous/concurrent programming, Spring Boot, MyBatis, MySQL indexing, execution plans, caching, and message queues." },
  { category: "Big Data and Data Engineering Foundations", detail: "Familiar with Spark, Hive, Flink, and Kafka, including batch/stream processing, partitioning, message consumption, ETL, and basic offline data-warehouse patterns; also experienced with PyTorch, computer vision, and model inference foundations." },
  { category: "Frontend and Content Engineering", detail: "Able to build responsive sites and data interfaces with Next.js, React, TypeScript, and CSS, including Markdown, KaTeX, static export, complex content layout, ECharts, and Metabase." },
];

export const resumeExperiencesEn: ResumeExperience[] = [
  {
    company: "China DataCom Information Co., Ltd.",
    projectName: "Enterprise OA Approval Workflow Backend",
    projectDescription: "Spring Boot · MyBatis · MySQL · jQuery",
    role: "Java Backend Intern",
    location: "Guangzhou",
    period: "Aug 2024 – Oct 2024",
    techStack: "Spring Boot, MyBatis, MySQL, jQuery",
    bullets: [
      "Contributed backend endpoints for submission, approval, routing, and rejection, translating approval rules into workflow states, node validation, and traceable records.",
      "Used Spring Boot, MyBatis, and MySQL for request validation, persistence, and approval-record queries, while collaborating on API integration, error feedback, and data rendering.",
      "Participated in requirement analysis, interface design, integration testing, and delivery verification, building practical experience in enterprise Java backend development and diagnosis.",
    ],
  },
];
