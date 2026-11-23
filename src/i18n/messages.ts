import type { Locale } from "./config";

export const messages = {
  zh: {
    language: { label: "语言", switchTo: "切换到英文", short: "中" },
    nav: { home: "首页", main: "主导航", blog: "Blog", relay: "模型 API 中转", portfolio: "Portfolio", cv: "CV", academic: "学术内容" },
    home: { landing: "Tonkic 首页", knowledge: "知识库", projects: "项目", relay: "API 中转", online: "状态 — 在线" },
    blog: {
      backHome: "← 首页", noteCount: "篇笔记", searchLabel: "搜索知识库", searchPlaceholder: "搜索笔记或路径...",
      noResults: "没有找到匹配的笔记。", navigation: "站点导航", directory: "Blog 知识库目录", mobileTitle: "Blog 知识库目录",
      note: "笔记", original: "原始 Markdown ↗", noBody: "这篇笔记暂时没有正文。", articleNavigation: "上下篇导航",
      previous: "上一篇", next: "下一篇", toc: "文章目录", onThisPage: "本页目录", noToc: "暂无小节",
      unnamed: "未命名笔记", tags: "标签", copy: "复制", copied: "已复制", copyFormula: "复制公式", formula: "LaTeX 公式",
    },
    relay: {
      noSuccess: "暂无记录", latest: "最近巡检", lastOnline: "上次可达", onlineSnapshot: "服务在线",
      offline: "巡检未连接", snapshotCadence: "每 15 分钟自动快照", httpsPending: "等待启用 HTTPS",
      liveOnline: "服务在线（实时）", justProbed: "刚刚完成实时探测", unreadable: "浏览器实时探测受限",
      open: "前往中转站控制台", address: "接入地址", copyUrl: "复制地址", copiedUrl: "已复制地址",
      footnote: "模型列表、渠道状态与实时计费说明以中转站内页面为准。",
    },
    portfolio: {
      originalOnly: "原创仓库", allRepos: "全部公开仓库（含 Fork）",
      totalStars: "累计 Star", liveSynced: "已与 GitHub 实时同步", snapshotSynced: "基于 GitHub 公开仓库自动同步 · 按 Star 排序",
      forkBadge: "Fork", updated: "更新于", noDescription: "暂无仓库简介，点击前往 GitHub 查看源码与说明。",
    },
    common: { noDate: "未标注日期", viewObsidian: "查看源笔记", viewGithub: "查看 GitHub 仓库", empty: "暂时没有公开条目。", details: "项目详情", exportPdf: "导出 PDF" },
  },
  en: {
    language: { label: "Language", switchTo: "Switch to Chinese", short: "EN" },
    nav: { home: "Home", main: "Main navigation", blog: "Blog", relay: "API Relay", portfolio: "Portfolio", cv: "CV", academic: "Academic" },
    home: { landing: "Tonkic landing page", knowledge: "Knowledge Base", projects: "Projects", relay: "API Relay", online: "Status — Online" },
    blog: {
      backHome: "← Home", noteCount: "notes", searchLabel: "Search knowledge base", searchPlaceholder: "Search notes or paths...",
      noResults: "No matching notes found.", navigation: "Site navigation", directory: "Blog knowledge base directory", mobileTitle: "Knowledge Directory",
      note: "Note", original: "Raw Markdown ↗", noBody: "This note has no body content yet.", articleNavigation: "Article navigation",
      previous: "Previous", next: "Next", toc: "Table of contents", onThisPage: "On this page", noToc: "No sections",
      unnamed: "Untitled note", tags: "Tags", copy: "Copy", copied: "Copied", copyFormula: "Copy TeX", formula: "LaTeX formula",
    },
    relay: {
      noSuccess: "No record yet", latest: "Last checked", lastOnline: "Last reachable", onlineSnapshot: "Operational",
      offline: "Unreachable", snapshotCadence: "Auto-checked every 15m", httpsPending: "Waiting for HTTPS",
      liveOnline: "Operational (live)", justProbed: "Checked just now", unreadable: "Browser probe restricted",
      open: "Open Relay Console", address: "Base Endpoint", copyUrl: "Copy URL", copiedUrl: "Copied",
      footnote: "Live model availability, upstream channels, and pricing are maintained on the relay site.",
    },
    portfolio: {
      originalOnly: "Original Repos", allRepos: "All Public (incl. Forks)",
      totalStars: "Total Stars", liveSynced: "Synced live from GitHub", snapshotSynced: "Synced from GitHub public repos · Sorted by stars",
      forkBadge: "Fork", updated: "Pushed", noDescription: "No repository description yet — view source and README on GitHub.",
    },
    common: { noDate: "Undated", viewObsidian: "View source note", viewGithub: "View on GitHub", empty: "No public entries yet.", details: "Project details", exportPdf: "Export PDF" },
  },
} as const;

export type Messages = (typeof messages)[Locale];
export type MessagePath = {
  [K in keyof Messages]: `${K & string}.${keyof Messages[K] & string}`
}[keyof Messages];

export const getMessage = (locale: Locale, path: MessagePath): string => {
  const [section, key] = path.split(".") as [keyof Messages, string];
  return messages[locale][section][key as keyof Messages[typeof section]] as string;
};
