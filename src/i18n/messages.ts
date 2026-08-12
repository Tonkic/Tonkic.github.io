import type { Locale } from "./config";

export const messages = {
  zh: {
    language: { label: "语言", switchTo: "切换到英文", short: "中" },
    nav: { home: "首页", main: "主导航", blog: "Blog", relay: "模型 API 中转", portfolio: "Portfolio", cv: "CV", academic: "学术内容" },
    home: { landing: "Tonkic 首页", knowledge: "知识库", projects: "项目", online: "状态 — 在线" },
    blog: {
      backHome: "← 返回首页", noteCount: "篇笔记", searchLabel: "搜索知识库", searchPlaceholder: "搜索笔记...",
      noResults: "没有找到匹配笔记。", navigation: "站点导航", directory: "Blog 知识库目录", mobileTitle: "Blog 知识库",
      note: "笔记", original: "查看原始笔记 ↗", noBody: "这篇笔记暂时没有正文。", articleNavigation: "文章导航",
      previous: "上一篇", next: "下一篇", toc: "文章目录", onThisPage: "本页目录", noToc: "暂无目录",
      unnamed: "未命名", tags: "标签", copy: "复制", copied: "已复制", copyFormula: "复制公式", formula: "LaTeX 公式",
    },
    relay: {
      noSuccess: "暂无成功记录", latest: "最近探测", lastOnline: "上次在线", onlineSnapshot: "服务在线（自动快照）",
      offline: "最近探测未连接", corsPending: "实时探测等待接口开放 CORS", httpsPending: "实时探测等待中转站启用 HTTPS",
      liveOnline: "服务在线（实时）", justProbed: "刚刚通过状态接口探测", unreadable: "浏览器实时接口暂不可读",
      open: "打开中转站", address: "服务地址", footnote: "服务详情、模型列表与价格以中转站内实时信息为准。",
    },
    common: { noDate: "未注明日期", viewObsidian: "查看 Obsidian 源文件", viewGithub: "查看 GitHub 仓库", empty: "暂时没有可展示的条目。", details: "查看详情", exportPdf: "导出 PDF" },
  },
  en: {
    language: { label: "Language", switchTo: "Switch to Chinese", short: "EN" },
    nav: { home: "Home", main: "Main navigation", blog: "Blog", relay: "API Relay", portfolio: "Portfolio", cv: "CV", academic: "Academic" },
    home: { landing: "Tonkic landing page", knowledge: "Knowledge Base", projects: "Projects", online: "Status — Online" },
    blog: {
      backHome: "← Back home", noteCount: "notes", searchLabel: "Search knowledge base", searchPlaceholder: "Search notes...",
      noResults: "No matching notes found.", navigation: "Site navigation", directory: "Blog knowledge base directory", mobileTitle: "Blog Knowledge Base",
      note: "Note", original: "View original note ↗", noBody: "This note has no content yet.", articleNavigation: "Article navigation",
      previous: "Previous", next: "Next", toc: "Article table of contents", onThisPage: "On this page", noToc: "No headings",
      unnamed: "Untitled", tags: "Tags", copy: "Copy", copied: "Copied", copyFormula: "Copy formula", formula: "LaTeX formula",
    },
    relay: {
      noSuccess: "No successful probe yet", latest: "Latest probe", lastOnline: "Last online", onlineSnapshot: "Service online (snapshot)",
      offline: "Latest probe failed", corsPending: "Live probe is waiting for CORS", httpsPending: "Live probe is waiting for HTTPS",
      liveOnline: "Service online (live)", justProbed: "Status endpoint checked just now", unreadable: "Live endpoint is not readable in the browser",
      open: "Open relay", address: "Service URL", footnote: "See the relay site for live service details, models, and pricing.",
    },
    common: { noDate: "Date not specified", viewObsidian: "View Obsidian source", viewGithub: "View GitHub repository", empty: "Nothing to show yet.", details: "View details", exportPdf: "Export PDF" },
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
