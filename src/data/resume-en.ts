import type { ResumeEducation, ResumeExperience, ResumeProject, ResumeSkill } from "./resume";

export const resumeProfileEn = {
  name: "Tonkic",
  handle: "Tonkic",
  phone: "",
  location: "Guangzhou",
  target: "Artificial Intelligence / Data Systems / Backend Engineering",
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
    description: "Go / API Gateway / Protocol Relay",
    url: "https://tonkicapi.xyz/",
    urlLabel: "tonkicapi.xyz",
    bullets: [
      "Extended New API and CLIProxyAPI into a multi-model aggregation and relay platform covering provider integration, protocol conversion, and unified access; processed 105,911 requests and 9.4 billion tokens.",
      "Improved compatibility across OpenAI Responses, Codex, and GitHub Copilot request flows, including SSE/WebSocket streaming, tool-call results, and model routing.",
      "Integrated usage statistics and Keeper services, and maintained Linux update scripts, GitHub Actions releases, Alibaba Cloud OSS distribution, and Nginx HTTPS reverse proxy deployment.",
    ],
  },
  {
    name: "Personal Website and Knowledge Base",
    description: "Next.js / TypeScript / GitHub Pages",
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
  { category: "Programming and Software Engineering", detail: "Primary languages: Python, Java, Go, and TypeScript. Experienced with object-oriented design, interface abstraction, asynchronous and concurrent programming, error handling, testable code organization, and Git-based collaboration." },
  { category: "Backend and Data Systems", detail: "Hands-on experience with Spring Boot, MyBatis, REST APIs, and model gateways. Familiar with MySQL indexing, execution plans, slow-query diagnosis, caching, message queues, streaming responses, and protocol adaptation." },
  { category: "Big Data and Machine Learning", detail: "Working knowledge of Spark, Hive, Flink, Kafka, batch/stream processing, and offline data warehouses; experienced with PyTorch, deep-learning evaluation, computer vision, anomaly detection, CUDA acceleration, and inference workflows." },
  { category: "Frontend and Visualization", detail: "Able to build responsive static sites and data interfaces with Next.js, React, TypeScript, and CSS, including Markdown, KaTeX, complex content layout, ECharts, and Metabase." },
  { category: "Infrastructure and Delivery", detail: "Experienced with Linux, Shell, Docker, Nginx, HTTPS deployment, GitHub Actions, static publishing, automation scripts, and troubleshooting through logs, networks, and process state." },
];

export const resumeExperiencesEn: ResumeExperience[] = [
  {
    company: "China DataCom Information Co., Ltd.",
    role: "Java Backend Intern",
    location: "Guangzhou",
    period: "Aug 2024 – Oct 2024",
    techStack: "Spring Boot, MyBatis, MySQL, jQuery",
    bullets: [
      "Contributed to an enterprise OA workflow module, implementing backend endpoints and page interactions for submission, approval, routing, rejection, and related states.",
      "Mapped approval rules into workflow states, field validation, and approval-record queries, and collaborated on API integration, error feedback, and data rendering.",
      "Participated in requirement analysis, interface development, integration testing, and delivery verification for an enterprise Java Web system.",
    ],
  },
];
