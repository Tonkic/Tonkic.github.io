# 个人网站上下文

这是 Tonkic 的个人网站（Personal Website）。它面向第一次访问的陌生访客，提供身份入口、知识笔记、项目、简历和研究兴趣。

公开页面使用 `Tonkic` 作为主要身份标识；真实姓名只在 CV 等求职语境中展示。

## 术语

- `栏目（Section）`：顶层内容分区，例如 Blog、模型 API 中转、Portfolio、CV、学术内容。
- `页面（Page）`：承载独立内容的路由。
- `条目（Entry）`：栏目中的单条内容，例如一篇 Blog 或一个 Portfolio 项目。
- `健康快照（Health Snapshot）`：构建环境对模型 API 中转公开状态接口的一次探测结果。
- `兼容路由（Compatibility Route）`：只为旧外部链接保留、不进入导航和搜索索引的页面；当前仅 `/overview`。

## 栏目

- `Blog`：技术、知识和学习笔记，内容源来自 `Tonkic/tonkic-obsidian-vault`。
- `模型 API 中转`：`https://tonkicapi.xyz/` 的公开入口与服务健康状态。
- `Portfolio`：精选且可验证的项目。
- `CV`：求职与工作信息，可打印为 PDF。
- `学术内容`：研究兴趣，以及 Publications / Talks 子页面。

主导航只包含 Blog、模型 API 中转、Portfolio 和 CV。学术内容从页脚进入；Publications 和 Talks 当前没有真实条目，因此只提供空列表，不提供详情路由。

## Blog

GitHub Actions 每日运行 `scripts/sync-obsidian-blog.mjs`，将 Obsidian Markdown、目录路径和公开源链接生成到 `src/data/obsidian-blog.ts`。

Fumadocs Core 只负责从 `sourcePath` 构建目录树；本站不使用 Fumadocs UI。用户从左侧目录进入独立笔记页面。正文由自定义 Markdown 渲染 Module 处理，并使用 KaTeX 渲染公式。

## 模型 API 中转

- 服务地址：`https://tonkicapi.xyz/`
- 公开健康接口：`GET /api/status`
- 浏览器实时探测：当前关闭，因为接口没有向 `https://tonkic.github.io` 开放 CORS。
- 自动快照：GitHub Actions 每 15 分钟运行 `scripts/sync-relay-snapshot.mjs` 并重新部署。

`src/data/relay-snapshot.json` 只包含 `health`：服务是否可达、探测时间、上次成功时间和公开错误信息。模型列表、供应商和价格不进入本站快照；这些信息以中转站自身页面为准。

本站不保存、不输入、不展示任何 API Key、用户信息、额度或请求记录。浏览器实时探测只有在公开接口启用受限 CORS 后才能重新打开。

## 技术栈

- Next.js App Router、React、TypeScript
- Framer Motion、Lenis
- Fumadocs Core、KaTeX
- 静态导出、GitHub Pages
- GitHub Actions 内容同步与部署

## 决策

- 首页保持简洁，只承担身份展示和主要入口，不复制各栏目的内容。
- `/overview` 只作为兼容路由保留，设置 `noindex`。
- CV 与学术内容分开。
- Portfolio 只展示精选项目，并优先链接可验证的 GitHub 仓库。
- Blog 使用“目录树 + 独立文章页”，不保留旧版右侧即时预览和标签筛选实现。
- Relay 页面只展示健康状态和大入口，不在本站复制模型与价格目录。
- `docs/` 记录已实现架构和约束，不作为需求 backlog；需求进入 GitHub Issues。
