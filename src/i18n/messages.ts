import type { Locale } from "./config";

export const messages = {
  zh: {
    language: { label: "语言", switchTo: "切换到英文", short: "中" },
    nav: { home: "首页", main: "主导航", blog: "Blog", relay: "API 中转", portfolio: "Portfolio", cv: "CV", academic: "学术" },
    home: {
      landing: "Tonkic 首页",
      knowledge: "知识库",
      knowledgeSub: "人工智能 · 数学 · 系统笔记",
      projects: "开源项目",
      projectsSub: "GitHub 仓库 · 按 Star 排列",
      relay: "API 中转",
      relaySub: "多模型网关 · 在线状态",
      cv: "个人简历",
      cvSub: "华南师大 · 后端与 AI 基础设施",
      notesUnit: "篇笔记",
      reposUnit: "个仓库",
      online: "在线",
    },
    blog: {
      noteCount: "篇", searchLabel: "搜索知识库", searchPlaceholder: "搜索笔记...",
      noResults: "无匹配结果", directory: "知识库目录", mobileTitle: "目录",
      note: "笔记", original: "源码 ↗", noBody: "暂无正文",
      previous: "上一篇", next: "下一篇", onThisPage: "目录", noToc: "无小节",
      unnamed: "未命名", copy: "复制", copied: "已复制", copyFormula: "复制 TeX", formula: "公式",
      graphAll: "全部", graphAi: "计算机与 AI", graphExam: "408 与基础", graphMath: "数学",
      graphPause: "暂停动效", graphPlay: "恢复动效", graphReset: "重置视图",
      featured: "精选笔记",
    },
    relay: {
      noSuccess: "—", onlineSnapshot: "在线", offline: "离线",
      httpsPending: "HTTPS 待启用", liveOnline: "在线", justProbed: "实时", unreadable: "快照",
      open: "进入中转控制台", address: "Endpoint", copiedUrl: "已复制",
    },
    portfolio: {
      originalOnly: "原创", allRepos: "全部",
      forkBadge: "Fork", noDescription: "GitHub 公开仓库",
    },
    common: { noDate: "—", viewObsidian: "源笔记", viewGithub: "GitHub", empty: "暂无记录", exportPdf: "导出 PDF" },
  },
  en: {
    language: { label: "Language", switchTo: "Switch to Chinese", short: "EN" },
    nav: { home: "Home", main: "Main navigation", blog: "Blog", relay: "API Relay", portfolio: "Portfolio", cv: "CV", academic: "Academic" },
    home: {
      landing: "Tonkic landing page",
      knowledge: "Knowledge Base",
      knowledgeSub: "AI · Math · Systems Notes",
      projects: "Open Source",
      projectsSub: "GitHub Repos · Ranked by Stars",
      relay: "API Relay",
      relaySub: "Model Gateway · Health",
      cv: "Curriculum Vitae",
      cvSub: "SCNU · Backend & AI Infra",
      notesUnit: "notes",
      reposUnit: "repos",
      online: "Online",
    },
    blog: {
      noteCount: "notes", searchLabel: "Search notes", searchPlaceholder: "Search...",
      noResults: "No matches", directory: "Knowledge directory", mobileTitle: "Directory",
      note: "Note", original: "Raw ↗", noBody: "Empty note",
      previous: "Previous", next: "Next", onThisPage: "Outline", noToc: "—",
      unnamed: "Untitled", copy: "Copy", copied: "Copied", copyFormula: "Copy TeX", formula: "Formula",
      graphAll: "All", graphAi: "CS & AI", graphExam: "Systems & 408", graphMath: "Math",
      graphPause: "Pause motion", graphPlay: "Resume motion", graphReset: "Reset view",
      featured: "Selected Notes",
    },
    relay: {
      noSuccess: "—", onlineSnapshot: "Online", offline: "Offline",
      httpsPending: "HTTPS pending", liveOnline: "Online", justProbed: "Live", unreadable: "Snapshot",
      open: "Launch Console", address: "Endpoint", copiedUrl: "Copied",
    },
    portfolio: {
      originalOnly: "Original", allRepos: "All",
      forkBadge: "Fork", noDescription: "Public GitHub repository",
    },
    common: { noDate: "—", viewObsidian: "Source", viewGithub: "GitHub", empty: "No entries yet", exportPdf: "Export PDF" },
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
