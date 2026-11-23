import type { ResumeEducation, ResumeExperience, ResumeProfile, ResumeProject, ResumeSkill } from "./resume";

export const resumeProfileEn: ResumeProfile = {
  name: "Tonkic",
  location: "Guangzhou",
  target: "Backend Engineering / AI Infrastructure",
  email: "tonkic@qq.com",
  github: "https://github.com/Tonkic",
  website: "https://tonkic.github.io/",
};

export const resumeEducationEn: ResumeEducation[] = [
  {
    school: "South China Normal University",
    degree: "M.Eng.",
    detail: "Artificial Intelligence · School of Artificial Intelligence (Full-time)",
    period: "Sep 2025 – Jun 2028",
    tags: ["Project 211", "Double First-Class"],
  },
  {
    school: "South China Agricultural University",
    degree: "B.Eng.",
    detail: "Data Science & Big Data Technology · School of Mathematics & Informatics / Software (Full-time)",
    period: "Sep 2021 – Jun 2025",
    tags: ["Double First-Class"],
  },
];

export const resumeExperiencesEn: ResumeExperience[] = [
  {
    company: "China DataCom Information Co., Ltd.",
    projectName: "Enterprise R&D Metrics & Task Orchestration Dashboard",
    projectDescription: "Java · Spring Boot · MyBatis · MySQL · ECharts",
    role: "Backend Engineering Intern",
    location: "Guangzhou",
    period: "Jun 2024 – Oct 2024",
    bullets: [
      "Built scheduled Java jobs to pull and incrementally sync activity from internal Git repositories, Case trackers, and task platforms, capturing daily case submissions, code volume, and task transitions.",
      "Implemented Spring Boot, MyBatis, and MySQL aggregation APIs by member, team, and date range, handling record deduplication, cross-day status rollups, and task orchestration progress.",
      "Collaborated on dashboard frontend-backend integration with ECharts to visualize daily engineering output, case breakdowns, and task pipeline progress for routine project tracking.",
    ],
  },
];

export const resumeProjectsEn: ResumeProject[] = [
  {
    name: "Multi-model API Aggregation & Relay Gateway",
    description: "Go · API Gateway · SSE / WebSocket",
    url: "https://tonkicapi.xyz/",
    urlLabel: "tonkicapi.xyz",
    bullets: [
      "Built and run a production multi-model API gateway on top of New API and CLIProxyAPI, handling upstream auth, channel routing, and retries; served 136K+ requests and 11.82B tokens over the past month.",
      "Adapted compatibility layers for OpenAI Responses, Codex, and GitHub Copilot traffic, reconciling upstream differences in model aliases, SSE/WebSocket chunked streams, and tool-call payloads.",
      "Wired up usage accounting and health checks with an internal Keeper service; maintain Linux rollout scripts, GitHub Actions builds, Alibaba Cloud OSS artifact delivery, and Nginx TLS reverse proxies.",
    ],
  },
  {
    name: "Personal Site & Obsidian Sync Pipeline",
    description: "Next.js · TypeScript · GitHub Actions",
    url: "https://tonkic.github.io/",
    urlLabel: "tonkic.github.io",
    bullets: [
      "Built this bilingual site with Next.js App Router and TypeScript, statically exported to GitHub Pages to host technical notes, project archives, a printable CV, and a gateway status page.",
      "Wrote a sync script that pulls Markdown notes from an Obsidian Git repo into a browsable tree, paired with custom Markdown/KaTeX rendering for wikilinks and wide formulas while trimming serialized list payloads across 300+ static pages.",
      "Automated daily note syncs and 15-minute gateway health snapshots in GitHub Actions, backed by a static smoke-test crawler that checks broken links, math output, and page weight before deploy.",
    ],
  },
];

export const resumeSkillsEn: ResumeSkill[] = [
  {
    category: "Backend & API Gateways",
    detail: "Day-to-day work in Go, Java, and Python; comfortable with HTTP/REST design, concurrency control, SSE/WebSocket streaming, multi-provider model routing, OpenAI-compatible proxies, and tool-call translation.",
  },
  {
    category: "Linux & Production Ops",
    detail: "Practical experience with Linux CLI, Shell scripting, Docker, and Nginx HTTPS reverse proxies; set up GitHub Actions release pipelines, OSS artifact distribution, and log/process-based live debugging.",
  },
  {
    category: "Databases & Server Stack",
    detail: "Solid foundation in MySQL schema design, indexing, and EXPLAIN query tuning; built internal web backends with Spring Boot and MyBatis, with working knowledge of Redis caching and message queues.",
  },
  {
    category: "Data Engineering & AI",
    detail: "Coursework and project experience with Spark, Flink, Hive, and Kafka for batch/stream pipelines; familiar with PyTorch training/inference basics, LLM serving, and practical RAG workflows.",
  },
  {
    category: "Frontend & Tooling",
    detail: "Build clean, responsive dashboards and documentation sites with Next.js, React, and TypeScript, including static export tuning, Markdown/KaTeX typesetting, ECharts, and Metabase.",
  },
];
