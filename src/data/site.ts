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
  publicRelayUrl: "http://8.134.127.63:3000/",
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
    slug: "tonkic-github-io",
    title: "Tonkic.github.io",
    date: "2026-05-27",
    type: "Portfolio",
    summary: "当前这站本身：一个用 Next.js 和 TypeScript 重建的个人网站，聚合 Blog、模型 API 中转、Portfolio、CV 与学术内容。",
    href: "/portfolio/tonkic-github-io",
    tags: ["Next.js", "TypeScript", "Motion"],
    sourceUrl: "https://github.com/Tonkic/Tonkic.github.io",
    content:
      "这是目前的主站项目。它负责把 Blog、模型 API 中转、CV、Portfolio 和学术内容串成一个清晰的访客导航页，并且已经适配 GitHub Pages 静态部署。",
  },
  {
    slug: "cliproxyapiplus",
    title: "CLIProxyAPIPlus",
    date: "2026-04-20",
    type: "Portfolio",
    summary: "Plus version of CLIProxyAPI，用来做模型 API 中转与相关能力扩展。",
    href: "/portfolio/cliproxyapiplus",
    tags: ["Go", "API Gateway", "Relay"],
    sourceUrl: "https://github.com/Tonkic/CLIProxyAPIPlus",
    content:
      "这是你的模型 API 中转相关仓库之一，和当前网站里的 API Relay 页面强相关。它更像后端能力层，负责承接实际调用和中转逻辑。",
  },
  {
    slug: "tonkic-obsidian-vault",
    title: "tonkic-obsidian-vault",
    date: "2026-04-20",
    type: "Portfolio",
    summary: "个人知识库和 Blog 内容源，承载技术类、知识类和学习类笔记。",
    href: "/portfolio/tonkic-obsidian-vault",
    tags: ["Obsidian", "Markdown", "Knowledge Base"],
    sourceUrl: "https://github.com/Tonkic/tonkic-obsidian-vault",
    content:
      "这是 Blog 的内容来源。仓库中的 Markdown 笔记会被同步进站点，并构成 Blog 的知识库目录树与笔记预览。",
  },
  {
    slug: "imagerag",
    title: "ImageRAG",
    date: "2026-03-15",
    type: "Portfolio",
    summary: "图像检索增强生成方向的实验仓库，偏研究和原型验证。",
    href: "/portfolio/imagerag",
    tags: ["Python", "RAG", "Research"],
    sourceUrl: "https://github.com/Tonkic/ImageRAG",
    content:
      "这是一个偏研究实验的项目，适合放在 Portfolio 中展示你的研究兴趣、原型实现能力和对检索增强类方法的理解。",
  },
  {
    slug: "cn-rail-data-pagerank-viz",
    title: "cn-rail-data-pagerank-viz",
    date: "2025-11-02",
    type: "Portfolio",
    summary: "中国铁路数据及 PageRank 可视化项目。",
    href: "/portfolio/cn-rail-data-pagerank-viz",
    tags: ["Python", "Visualization", "PageRank"],
    sourceUrl: "https://github.com/Tonkic/cn-rail-data-pagerank-viz",
    content:
      "这是一个数据分析和可视化向的项目，适合用来展示你把数据处理、图算法和可视化串起来的能力。",
  },
  {
    slug: "tonkic-blog",
    title: "tonkic-blog",
    date: "2025-10-10",
    type: "Portfolio",
    summary: "早期博客/内容站仓库，承载过一阶段的写作与展示。",
    href: "/portfolio/tonkic-blog",
    tags: ["Blog", "Static Site", "Legacy"],
    sourceUrl: "https://github.com/Tonkic/tonkic-blog",
    content:
      "这是你的早期内容站或博客仓库，可以作为站点演化路径的一部分展示，说明你不是从零开始，而是持续迭代到现在这个版本。",
  },
  {
    slug: "scnu-java-assignments",
    title: "scnu-java-assignments",
    date: "2025-09-01",
    type: "Portfolio",
    summary: "Java 课程作业和练习集合。",
    href: "/portfolio/scnu-java-assignments",
    tags: ["Java", "Course Work"],
    sourceUrl: "https://github.com/Tonkic/scnu-java-assignments",
    content:
      "这是课程作业仓库，适合放在 Portfolio 中作为基础工程能力和早期实践记录。",
  },
  {
    slug: "ok-end-field",
    title: "ok-end-field",
    date: "2025-08-18",
    type: "Portfolio",
    summary: "一个偏实验性或工具性的仓库。",
    href: "/portfolio/ok-end-field",
    tags: ["Experiment", "Tooling"],
    sourceUrl: "https://github.com/Tonkic/ok-end-field",
    content:
      "这是一个适合放入 Portfolio 的实验/工具仓库。即使它不是最大项目，也可以帮助访客判断你的开发兴趣和技术广度。",
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
