# Tonkic.github.io

Tonkic 的个人网站，使用 Next.js App Router、React 和 TypeScript 构建，并静态导出到 GitHub Pages。

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
- GitHub Actions、GitHub Pages

## 本地开发

```bash
npm ci
npm run dev
```

常用命令：

```bash
npm run check       # TypeScript
npm run test:unit   # 快照数据契约
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

Relay 同步不使用任何 API Key。Blog 同步可使用 GitHub Token 读取源仓库，但不会将 Token 写入生成文件。本站不保存中转服务的用户数据、额度或请求记录。

## 部署

`next.config.ts` 使用 `output: "export"`。`.github/workflows/deploy-github-pages.yml` 在推送 `main`、手动触发和定时任务时刷新 Relay 快照、执行完整验证，并部署 `out/`。

架构与约束见 `CONTEXT.md`、`docs/architecture.md` 和 `docs/adr/`。
