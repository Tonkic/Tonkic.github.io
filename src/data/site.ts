import { obsidianBlogEntries } from "./obsidian-blog";

export type NavItem = {
  href: string;
  label: string;
  tone: "primary" | "secondary";
};

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

export const siteProfile = {
  name: "Tonkic",
  realName: "Zhang Tingyu",
  role: "Master's student in Artificial Intelligence",
  affiliation: "School of Artificial Intelligence, SCNU",
  email: "Tonkic.Tim@gmail.com",
  github: "https://github.com/Tonkic",
  publicRelayUrl: "http://8.134.220.84:8020/",
};

export const navItems: NavItem[] = [
  { href: "/overview", label: "总览", tone: "primary" },
  { href: "/blog", label: "Blog", tone: "primary" },
  { href: "/api-relay", label: "模型 API 中转", tone: "primary" },
  { href: "/portfolio", label: "Portfolio", tone: "secondary" },
  { href: "/cv", label: "CV", tone: "secondary" },
  { href: "/academic", label: "学术内容", tone: "secondary" },
];

export const firstTierCards: LinkCard[] = [
  {
    href: "/blog",
    label: "Blog",
    eyebrow: "技术 / 学习 / 知识库",
    description: "以技术类、知识类和学习类内容为主，来自 Obsidian vault 的 Markdown 笔记会每日同步。",
  },
  {
    href: "/api-relay",
    label: "模型 API 中转",
    eyebrow: "对外中转 / New API",
    description: "模型 API 中转站入口，提供可用模型和美元价格概览。",
  },
];

export const secondTierCards: LinkCard[] = [
  {
    href: "/portfolio",
    label: "Portfolio",
    eyebrow: "项目与能力",
    description: "稳定项目和阶段性成果，用来展示方向、能力与做过的东西。",
  },
  {
    href: "/cv",
    label: "CV",
    eyebrow: "求职 / 工作",
    description: "求职和工作相关信息，包括教育背景、技能、项目经历与联系方式。",
  },
  {
    href: "/academic",
    label: "学术内容",
    eyebrow: "科研 / 学术",
    description: "科研与学术相关内容，包含 Publications 和 Talks。",
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
    slug: "personal-website",
    title: "Personal Website",
    date: "2026-05-25",
    type: "Portfolio",
    summary: "一个用 Next.js 和 TypeScript 重建的个人网站，聚合 Blog、模型 API 中转、Portfolio、CV 与学术内容。",
    href: "/portfolio/personal-website",
    tags: ["Next.js", "TypeScript", "Motion"],
    content:
      "这个站点用 Next.js App Router 和 TypeScript 构建。Blog 来自 Obsidian vault 的每日同步；模型 API 中转页提供对外中转入口；Portfolio、CV 和学术内容用于承载更稳定的项目、工作资料和科研材料。",
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
