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
    eyebrow: "技术 / 学习 / 知识",
    description: "以技术类、知识类、学习类内容为主，内容来源会每日同步 Obsidian vault。",
  },
  {
    href: "/api-relay",
    label: "模型 API 中转",
    eyebrow: "对外售卖中转 / New API",
    description: "展示对外售卖中转入口、公开状态、文档链接、公开模型与美元价格，不在网站中保存 API Key。",
  },
];

export const secondTierCards: LinkCard[] = [
  {
    href: "/portfolio",
    label: "Portfolio",
    eyebrow: "项目与能力",
    description: "沉淀能代表方向、能力和阶段性成果的项目。",
  },
  {
    href: "/cv",
    label: "CV",
    eyebrow: "求职 / 工作",
    description: "面向工作场景，回答我能做什么、做过什么、如何联系我。",
  },
  {
    href: "/academic",
    label: "学术内容",
    eyebrow: "科研 / 学术",
    description: "科研相关内容的聚合入口，Publications 和 Talks 会作为子内容存在。",
  },
];

export const fallbackBlogEntries: ContentEntry[] = [
  {
    slug: "site-building-log",
    title: "个人网站建设记录",
    date: "2026-05-25",
    type: "Blog",
    summary: "记录从学术模板迁移到 TypeScript-first 站点的结构、设计和取舍。",
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
    summary: "面向陌生访客的个人综合网站，聚合 Blog、模型 API 中转、项目、CV 与学术内容。",
    href: "/portfolio/personal-website",
    tags: ["Next.js", "TypeScript", "Motion"],
  },
];

export const publicationEntries: ContentEntry[] = [
  {
    slug: "research-placeholder",
    title: "Research publication placeholder",
    type: "Publication",
    summary: "学术论文内容暂不虚构，保留结构，后续填入真实 publication。",
    href: "/publications/research-placeholder",
    tags: ["Research"],
  },
];

export const talkEntries: ContentEntry[] = [
  {
    slug: "talk-placeholder",
    title: "Talk placeholder",
    type: "Talk",
    summary: "Talks 作为学术内容子内容保留，后续填入真实报告或分享。",
    href: "/talks/talk-placeholder",
    tags: ["Academic"],
  },
];

export const allEntries = [
  ...blogEntries,
  ...portfolioEntries,
  ...publicationEntries,
  ...talkEntries,
];
