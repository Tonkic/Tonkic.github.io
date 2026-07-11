import { obsidianBlogEntries } from "./obsidian-blog";
export { navItems, siteProfile } from "./site-config";
export type { NavItem } from "./site-config";

export type LinkCard = {
  href: string;
  label: string;
  eyebrow: string;
  description: string;
};

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

export const firstTierCards: LinkCard[] = [
  {
    href: "/blog",
    label: "Blog",
    eyebrow: "Knowledge Base",
    description: "人工智能、计算机与学习笔记。按知识库目录浏览，也可以直接搜索。",
  },
  {
    href: "/api-relay",
    label: "模型 API 中转",
    eyebrow: "API Relay",
    description: "New API 中转站入口、公开模型价格与服务状态。",
  },
];

export const secondTierCards: LinkCard[] = [
  {
    href: "/portfolio",
    label: "Portfolio",
    eyebrow: "Selected Work",
    description: "挑选能够说明工程能力、研究方向和持续投入的项目。",
  },
  {
    href: "/cv",
    label: "CV",
    eyebrow: "Resume",
    description: "教育、实习、项目和技能，可直接导出为 PDF。",
  },
  {
    href: "/academic",
    label: "学术内容",
    eyebrow: "Research",
    description: "研究兴趣、Publications 与 Talks。",
  },
];

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
      "仓库中的 Markdown、图片和目录结构会由 GitHub Actions 同步进本站，并通过 Fumadocs source 构建知识库目录树和笔记预览。",
  },
  {
    slug: "imagerag",
    title: "ImageRAG",
    date: "2026-03-15",
    type: "Portfolio",
    summary: "图像检索增强生成方向的研究原型，用于验证多模态检索与生成链路。",
    href: "/portfolio/imagerag",
    tags: ["Python", "RAG", "Research"],
    sourceUrl: "https://github.com/Tonkic/ImageRAG",
    content:
      "围绕图像检索增强生成进行原型验证，体现对 RAG、多模态检索和研究型代码实现的持续探索。",
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

export const allEntries = [
  ...blogEntries,
  ...portfolioEntries,
  ...publicationEntries,
  ...talkEntries,
];
