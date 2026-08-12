import { obsidianBlogEntries } from "./obsidian-blog";

export type ContentEntry = {
  slug: string;
  title: string;
  date?: string;
  type: string;
  summary: string;
  href: string;
  tags?: string[];
  content?: string;
  sourcePath?: string;
  sourceUrl?: string;
};

export const fallbackBlogEntries: ContentEntry[] = [
  {
    slug: "site-building-log",
    title: "个人网站建设记录",
    date: "2026-05-25",
    type: "Blog",
    summary: "记录从学术模板迁移到 TypeScript-first 个人网站的结构、设计和取舍。",
    href: "/blog/site-building-log",
    tags: ["Website", "Next.js"],
    content: "这篇文章是站点内置 fallback。Obsidian vault 同步成功后，Blog 会优先展示 vault 中的笔记。",
  },
];

export const blogEntries: ContentEntry[] = obsidianBlogEntries.length
  ? obsidianBlogEntries
  : fallbackBlogEntries;

export const portfolioEntries: ContentEntry[] = [
  {
    slug: "tonkic-github-io",
    title: "Tonkic.github.io",
    date: "2026-05-27",
    type: "Portfolio",
    summary: "当前这站本身：一个用 Next.js 和 TypeScript 重建的个人网站，聚合 Blog、模型 API 中转、Portfolio、CV 与学术内容。",
    href: "/portfolio/tonkic-github-io",
    tags: ["Next.js", "TypeScript", "Motion"],
    sourceUrl: "https://github.com/Tonkic/Tonkic.github.io",
    content:
      "使用 Next.js App Router 与 TypeScript 构建并静态导出到 GitHub Pages。站点整合 Obsidian 知识库同步、Markdown 与公式渲染、模型 API 公开状态快照、项目展示和可打印简历，并通过自动化工作流持续部署。",
  },
  {
    slug: "cliproxyapiplus",
    title: "CLIProxyAPIPlus",
    date: "2026-04-20",
    type: "Portfolio",
    summary: "面向模型 API 中转与能力扩展的 Go 服务，承担网关和调用链路相关工作。",
    href: "/portfolio/cliproxyapiplus",
    tags: ["Go", "API Gateway", "Relay"],
    sourceUrl: "https://github.com/Tonkic/CLIProxyAPIPlus",
    content:
      "模型 API 中转相关的后端项目，使用 Go 承接实际调用和网关逻辑，并与本站的 API Relay 状态页形成前后端分层。",
  },
  {
    slug: "tonkic-obsidian-vault",
    title: "tonkic-obsidian-vault",
    date: "2026-04-20",
    type: "Portfolio",
    summary: "个人知识库与 Blog 内容源，通过自动化同步形成可浏览的目录树。",
    href: "/portfolio/tonkic-obsidian-vault",
    tags: ["Obsidian", "Markdown", "Knowledge Base"],
    sourceUrl: "https://github.com/Tonkic/tonkic-obsidian-vault",
    content:
      "仓库中的 Markdown、图片和目录结构会由 GitHub Actions 同步进本站，并通过 Fumadocs source 构建知识库目录树与独立笔记页面。",
  },

  {
    slug: "cn-rail-data-pagerank-viz",
    title: "cn-rail-data-pagerank-viz",
    date: "2025-11-02",
    type: "Portfolio",
    summary: "将中国铁路数据处理、PageRank 图算法与交互可视化串成完整分析流程。",
    href: "/portfolio/cn-rail-data-pagerank-viz",
    tags: ["Python", "Visualization", "PageRank"],
    sourceUrl: "https://github.com/Tonkic/cn-rail-data-pagerank-viz",
    content:
      "围绕铁路网络构建数据分析与可视化流程，使用 PageRank 观察节点重要性，展示从数据整理、图算法到结果表达的完整能力。",
  },
];

export const publicationEntries: ContentEntry[] = [];

export const talkEntries: ContentEntry[] = [];
