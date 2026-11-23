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

export const portfolioEntries: ContentEntry[] = [
  {
    slug: "cliproxyapiplus",
    title: "CLIProxyAPIPlus",
    date: "2026-04-20",
    type: "Portfolio",
    summary: "用 Go 维护的模型 API 网关与协议扩展服务，负责多渠道转发、流式适配和工具调用兼容。",
    summaryEn: "A Go model API gateway and protocol relay handling multi-provider routing, streaming adaptation, and tool-call compatibility.",
    href: "/portfolio/cliproxyapiplus",
    tags: ["Go", "API Gateway", "SSE / Relay"],
    sourceUrl: "https://github.com/Tonkic/CLIProxyAPIPlus",
    content:
      "面向多模型调用场景的 Go 网关服务，负责上游渠道分发、OpenAI 兼容层与流式响应转换，并和本站的 API Relay 状态页配合提供公开可用性参考。",
    contentEn:
      "A Go backend service for multi-model API routing, OpenAI-compatible protocol translation, and streaming responses, paired with this site's public API Relay status page.",
  },
  {
    slug: "tonkic-github-io",
    title: "Tonkic.github.io",
    date: "2026-05-27",
    type: "Portfolio",
    summary: "当前这个双语个人网站：基于 Next.js 静态导出，把知识库笔记、中转站状态、项目归档和在线简历收拢在一处。",
    summaryEn: "This bilingual personal site: statically exported with Next.js to bring together notes, gateway status, projects, and a printable CV.",
    href: "/portfolio/tonkic-github-io",
    tags: ["Next.js", "TypeScript", "Static Export"],
    sourceUrl: "https://github.com/Tonkic/Tonkic.github.io",
    content:
      "基于 Next.js App Router 与 TypeScript 构建并静态部署在 GitHub Pages。包含 Obsidian 目录树同步、轻量 Markdown 与 KaTeX 渲染、API 中转定时健康快照、可打印 A4 简历以及静态巡检测试。",
    contentEn:
      "Built with the Next.js App Router and TypeScript for GitHub Pages. Features Obsidian tree sync, lightweight Markdown and KaTeX rendering, scheduled API relay health snapshots, a print-ready A4 CV, and automated static regression checks.",
  },
  {
    slug: "tonkic-obsidian-vault",
    title: "tonkic-obsidian-vault",
    date: "2026-04-20",
    type: "Portfolio",
    summary: "日常维护的个人知识库源仓库，记录人工智能、数学基础与工程实践笔记，每日自动同步到本站 Blog。",
    summaryEn: "My day-to-day Obsidian vault covering AI, math foundations, and engineering notes, synced daily into the Blog.",
    href: "/portfolio/tonkic-obsidian-vault",
    tags: ["Obsidian", "Markdown", "Knowledge Base"],
    sourceUrl: "https://github.com/Tonkic/tonkic-obsidian-vault",
    content:
      "存放日常学习与开发整理的原版 Markdown 笔记和配图。GitHub Actions 每天拉取最新内容并生成静态目录树与独立文章页，保留原有文件夹层级。",
    contentEn:
      "Stores raw Markdown notes and figures from daily study and engineering work. GitHub Actions syncs updates every day into a browsable directory tree and standalone note pages.",
  },
  {
    slug: "cn-rail-data-pagerank-viz",
    title: "cn-rail-data-pagerank-viz",
    date: "2025-11-02",
    type: "Portfolio",
    summary: "基于中国铁路站点与车次数据构建有向图，用 PageRank 评估枢纽重要度并做交互式地图可视化。",
    summaryEn: "Builds a directed graph from Chinese railway schedule data, ranking hub centrality with PageRank and interactive map visualizations.",
    href: "/portfolio/cn-rail-data-pagerank-viz",
    tags: ["Python", "PageRank", "Visualization"],
    sourceUrl: "https://github.com/Tonkic/cn-rail-data-pagerank-viz",
    content:
      "从原始车次与站点数据清洗建模出发，构建全国铁路网络图并计算节点 PageRank 权重，直观对比地理分布与路网拓扑枢纽度。",
    contentEn:
      "Cleans raw train and station data into a national rail network graph, computes PageRank centrality scores, and visualizes how topological hub importance compares with geography.",
  },
];

export const publicationEntries: ContentEntry[] = [];

export const talkEntries: ContentEntry[] = [];
