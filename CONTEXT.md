# 个人网站上下文

这是 Tonkic 的个人网站（Personal Website）。它面向第一次访问的陌生访客，用来回答两个问题：我是谁，以及这个站里有什么。

公开页面使用 `Tonkic` 作为主要身份标识；真实姓名只在 CV 等求职/工作语境中展示。

## 术语

- `栏目（Section）`：站点中的顶层内容分区，例如 Blog、模型 API 中转、Portfolio、CV、学术内容。
- `页面（Page）`：承载独立信息的页面，例如全站总览页、CV 页。
- `条目（Entry）`：栏目中的单条内容记录，例如一篇 Blog、一项 Portfolio、一条 Publication。
- `全站总览页`：访客导航页，不是 archive 或 sitemap。
- `模型 API 中转`：稳定栏目，用于介绍并跳转到对外售卖的模型 API 中转站。

## 内容优先级

第一梯队：

- `Blog`：以技术类、知识类、学习类文章为主，也允许少量其他内容。内容源来自 `Tonkic/tonkic-obsidian-vault` 的 Markdown 笔记。
- `模型 API 中转`：对外售卖的 New API 中转站入口和公开信息展示。

第二梯队：

- `Portfolio`：稳定项目和能力展示。
- `CV`：求职、工作相关信息，与学术内容分开。
- `学术内容`：科研、学术相关信息，包含 `Publications` 和 `Talks` 子内容。

## 模型 API 中转

当前统一展示模型 API 中转：

- 服务地址：`https://tonkic.opik.net/`
- 类型：New API 网关
- 公开入口：中转站首页和文档链接

公开接口能力：

- `/api/status`：公开状态信息。
- `/api/pricing`：公开模型、供应商、价格、分组和 endpoint 类型。
- `/v1/models`：需要 token，不在公开网站中调用。

本站不保存、不输入、不展示任何 API Key。真正调用模型、充值、token 管理都在 New API 中转站内完成。

当前 New API 已通过 `https://tonkic.opik.net/` 提供 HTTPS。Nginx 为 `GET /api/status` 和 `GET /api/pricing` 添加受限 CORS，仅允许 `https://tonkic.github.io` 跨域读取。

页面每 60 秒读取 `/api/status` 进行实时测活。部署工作流仍每 15 分钟在服务端构建环境中读取公开接口，生成 `src/data/relay-snapshot.json` 并重新部署静态页面，作为实时请求失败时的降级数据和价格快照。

## 技术栈

- Next.js App Router
- TypeScript
- React client components
- Framer Motion / Lenis 动效
- 静态导出，适配 GitHub Pages
- Blog 同步脚本：`scripts/sync-obsidian-blog.mjs`
- Blog 知识库目录树：Fumadocs source/page tree
- API 中转公开快照：`scripts/sync-relay-snapshot.mjs`

## 决策

- 站点保留 `Personal Website` 定位，不再沿用 Academic Pages/Jekyll 结构。
- `docs/` 存放已实现功能、架构和说明，不作为需求 backlog。
- Issue tracker 使用 GitHub Issues。
- CV 与学术内容完全分开。
- Publications / Talks 是学术内容的子内容，不作为主导航并列入口。
- Publications / Talks 当前没有真实条目，所以只保留列表页和空状态；等有真实内容后再恢复对应详情路由。
- Blog 内容通过 GitHub Actions 每日同步 Obsidian vault，并提交生成后的 `src/data/obsidian-blog.ts`。
- Blog 浏览体验采用“知识库目录树优先，时间流为辅”：目录树来自 Obsidian 的 `sourcePath`，由 Fumadocs 构建；右侧显示当前选中笔记预览。
- 首页承担访客总览功能；`/overview` 只作为旧链接兼容页，不在主导航中展示。
- 主导航只保留 Blog、模型 API 中转、Portfolio 和 CV；学术内容通过首页与页脚进入，等有真实成果后再评估恢复主导航。
- Portfolio 只公开精选项目，不将课程作业、旧站和描述不明确的实验仓库作为主要能力证明。
