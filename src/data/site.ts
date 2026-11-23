import githubProjectsData from "./github-projects.json";
import { obsidianBlogEntries } from "./obsidian-blog";

export type ContentEntry = {
  slug: string;
  title: string;
  titleEn?: string;
  date?: string;
  type: string;
  summary: string;
  summaryEn?: string;
  href: string;
  tags?: string[];
  content?: string;
  contentEn?: string;
  sourcePath?: string;
  sourceUrl?: string;
  stars?: number;
  forks?: number;
  isFork?: boolean;
};

export type GitHubRepoSnapshotItem = {
  name: string;
  htmlUrl: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  isFork: boolean;
  pushedAt: string;
  homepage: string;
};

type RepoCuratedCopy = {
  summary: string;
  summaryEn: string;
  tags?: string[];
  content?: string;
  contentEn?: string;
};

export const repoCuratedOverrides: Record<string, RepoCuratedCopy> = {
  "cpa-codex-turn-state-plugin": {
    summary: "面向 CLIProxyAPI 的原生 Go 插件，按账号与模型维度缓存并主动刷新 Codex 会话状态（已归档留作参考）。",
    summaryEn: "Native Go plugin for CLIProxyAPI providing per-account and per-model Codex turn-state caching and proactive refresh.",
    tags: ["Go", "CLIProxyAPI", "Codex"],
  },
  airesearchtoolkit: {
    summary: "面向科研工作者的 AI 研究工具与多 Agent 论文/假设探索目录。",
    summaryEn: "Curated directory of AI-assisted scientific discovery tools and multi-agent research workflows.",
    tags: ["AI4Science", "Agents", "Research"],
  },
  "tonkic-obsidian-vault": {
    summary: "日常维护的个人知识库源仓库，记录人工智能、数学基础与工程实践笔记，每日自动同步至本站 Blog。",
    summaryEn: "My day-to-day Obsidian vault covering AI, math foundations, and engineering notes, synced daily into the Blog.",
    tags: ["Obsidian", "Markdown", "Knowledge Base"],
  },
  quantcanvas: {
    summary: "可组合的量化研究、多策略并行回测与交易执行工作台，整合 CCXT、Polars、DuckDB 与 SMC 规则。",
    summaryEn: "Composable quantitative research, parallel multi-strategy backtesting, and execution workbench built on CCXT, Polars, and DuckDB.",
    tags: ["Python", "Quant", "DuckDB", "Polars"],
  },
  "tonkic.github.io": {
    summary: "当前这个中英双语个人网站：基于 Next.js 与 TypeScript 静态导出，承载知识库、API 中转状态、GitHub 项目与在线简历。",
    summaryEn: "This bilingual personal site: statically exported with Next.js and TypeScript for notes, gateway status, GitHub projects, and CV.",
    tags: ["Next.js", "TypeScript", "Static Export"],
  },
  playsage: {
    summary: "基于 MCP 后端的游戏活动知识检索、操作证据回放与受控网格规则验证原型。",
    summaryEn: "MCP-backed prototype for game event knowledge lookup, action evidence replay, and guarded grid-rule verification.",
    tags: ["Python", "MCP", "Agent Memory"],
  },
  "pi-agent-governance": {
    summary: "供 Antigravity、PI-Desktop、Codex 与 Claude Code 共用的仓库级 Agent 架构看板、渐进上下文与文档治理工具。",
    summaryEn: "Repository-level agent governance workbench for task lifecycle, architecture views, and progressive context across coding agents.",
    tags: ["JavaScript", "MCP", "Agent Tooling"],
  },
  "tonkic-api": {
    summary: "基于 New API 维护的统一多模型聚合与协议转换网关，支持 OpenAI、Claude 与 Gemini 兼容格式。",
    summaryEn: "Unified multi-model API gateway fork supporting cross-protocol conversion across OpenAI, Claude, and Gemini formats.",
    tags: ["Go", "API Gateway", "LLM Relay"],
  },
  cliproxyapiplus: {
    summary: "面向多模型 API 中转与调用链路扩展的 Go 网关服务。",
    summaryEn: "Go gateway service for multi-provider model API relay and request pipeline extensions.",
    tags: ["Go", "API Gateway", "Relay"],
  },
  "cn-rail-data-pagerank-viz": {
    summary: "基于中国铁路站点与车次数据构建有向图，使用 PageRank 评估枢纽重要度并生成交互式可视化。",
    summaryEn: "Directed-graph analysis of Chinese railway schedule data using PageRank centrality and interactive map visualizations.",
    tags: ["Python", "PageRank", "Visualization"],
  },
  "scnu-java-assignments": {
    summary: "华南师范大学研究生《Java 大数据开发》课程实验代码与环境配置说明。",
    summaryEn: "Coursework code and VM setup notes for the graduate Java & Big Data Development course at SCNU.",
    tags: ["Java", "Big Data", "Coursework"],
  },
  "ok-end-field": {
    summary: "基于 ok-script 框架的桌面端图像识别与自动化脚本分支。",
    summaryEn: "Desktop vision and automation script fork built on the ok-script framework.",
    tags: ["Python", "Automation"],
  },
};

export const toRepoSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "repo";

export const enrichGitHubRepo = (repo: GitHubRepoSnapshotItem): ContentEntry => {
  const key = repo.name.toLowerCase();
  const curated = repoCuratedOverrides[key];
  const rawDesc = repo.description.trim();
  const summary = curated?.summary ?? (rawDesc || "暂无仓库简介，点击前往 GitHub 查看源码与说明。");
  const summaryEn = curated?.summaryEn ?? (rawDesc || "No repository description yet — view source and README on GitHub.");
  const mergedTags = curated?.tags?.length
    ? curated.tags
    : [repo.language, ...repo.topics].filter(Boolean).slice(0, 4);

  return {
    slug: toRepoSlug(repo.name),
    title: repo.name,
    date: repo.pushedAt || undefined,
    type: "Portfolio",
    summary,
    summaryEn,
    href: `/portfolio/${toRepoSlug(repo.name)}`,
    tags: mergedTags,
    sourceUrl: repo.htmlUrl,
    content: curated?.content ?? summary,
    contentEn: curated?.contentEn ?? summaryEn,
    stars: repo.stars,
    forks: repo.forks,
    isFork: repo.isFork,
  };
};

export const fallbackBlogEntries: ContentEntry[] = [
  {
    slug: "site-building-log",
    title: "个人网站重构记录",
    date: "2026-05-25",
    type: "Blog",
    summary: "记录个人网站迁移到 Next.js 与 TypeScript 静态架构时的结构取舍。",
    href: "/blog/site-building-log",
    tags: ["Website", "Next.js"],
    content: "这是站点内置的兜底笔记。正常情况下，Blog 会直接展示从 Obsidian 仓库同步过来的知识库内容。",
  },
];

export const blogEntries: ContentEntry[] = obsidianBlogEntries.length
  ? obsidianBlogEntries
  : fallbackBlogEntries;

export const githubRepoSnapshot = githubProjectsData as {
  owner: string;
  syncedAt: string;
  projects: GitHubRepoSnapshotItem[];
};

export const portfolioEntries: ContentEntry[] = githubRepoSnapshot.projects.map(enrichGitHubRepo);

export const publicationEntries: ContentEntry[] = [];

export const talkEntries: ContentEntry[] = [];
