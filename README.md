# Tonkic.github.io

Tonkic 的中英文个人网站，使用 Next.js App Router、React 和 TypeScript 构建，并静态导出到 GitHub Pages。

站点右上角提供 `中 / EN` 切换。语言偏好保存在浏览器 `localStorage`，在同一 URL 上即时切换，不复制 Blog 路由。

## 页面

- `/`：简洁首页与主要入口。
- `/blog`：从 Obsidian 同步的知识库目录；每篇笔记使用独立页面。
- `/api-relay`：模型 API 中转站入口与最近一次自动健康快照。
- `/portfolio`：精选项目，项目卡片直接链接 GitHub。
- `/cv`：网页简历与打印样式。
- `/academic`：研究兴趣，以及暂为空的 Publications / Talks 列表。

`/overview` 仅用于兼容旧链接，不属于当前导航。

## 技术栈

- Next.js 15、React 19、TypeScript
- Framer Motion、Lenis
- Fumadocs Core
- KaTeX
- 轻量 typed dictionaries + React Context 国际化
- GitHub Actions、GitHub Pages

## 中英文内容约定

- 新增或修改用户可见的界面文案时，必须同时更新 `src/i18n/messages.ts` 的 `zh` 与 `en`。
- 新增 Portfolio 等结构化内容时，必须同时提供 `summary` / `summaryEn` 与 `content` / `contentEn`。
- CV 使用 `src/data/resume.ts` 与 `src/data/resume-en.ts` 两套完整模板，字段结构必须保持一致。
- Blog 笔记正文保留源仓库中的原始语言；导航、搜索、操作提示和空状态仍需中英双语。
- 当前采用同 URL 客户端切换，因此英文界面不会形成独立的 `/en` SEO 页面。需要独立英文收录时，可沿用现有字典迁移到静态 locale 路由。

## 本地开发

```bash
npm ci
npm run dev
```

常用命令：

```bash
npm run check       # TypeScript
npm run test:unit   # Relay 与中英文数据契约
npm run build       # 静态导出到 out/
npm run test:static # 检查已导出的路由、链接和公式
npm test            # 完整验证
```

## 内容与状态同步

Blog 由 `scripts/sync-obsidian-blog.mjs` 从 `Tonkic/tonkic-obsidian-vault` 读取 Markdown，并生成 `src/data/obsidian-blog.ts`：

```bash
npm run sync:blog
```

API Relay 快照由 `scripts/sync-relay-snapshot.mjs` 请求公开的 `/api/status`，只保存服务可达性、探测时间、最近成功时间和公开错误信息：

```bash
npm run sync:relay
```

Relay 同步只请求无需鉴权的公开状态接口，不使用 API Key。Blog 同步可使用 GitHub Token 读取源仓库，但不会将 Token 写入生成文件。本站不保存中转服务的用户数据、额度或请求记录。

## 部署

`next.config.ts` 使用 `output: "export"`。`.github/workflows/deploy-github-pages.yml` 在推送 `main`、手动触发和定时任务时刷新 Relay 快照、执行完整验证，并部署 `out/`。

架构与约束见 `CONTEXT.md`、`docs/architecture.md` 和 `docs/adr/`。
