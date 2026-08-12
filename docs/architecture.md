# 项目架构

## 运行模型

本站是静态个人网站。Next.js 在构建时生成 `out/`，GitHub Pages 直接提供静态资源；项目没有 Next.js 服务端运行时、Route Handler 或数据库。

## 目录

- `src/app/`：App Router 路由、metadata、sitemap、robots、manifest 和全局样式。
- `src/components/`：站点外壳、首页、Blog 导航与文章、Markdown、Relay、Portfolio/CV 共用视图。
- `src/data/site-config.ts`：可以进入客户端 bundle 的轻量站点配置。
- `src/data/site.ts`：Blog fallback、Portfolio 和学术列表数据。
- `src/data/obsidian-blog.ts`：同步生成的 Blog 内容，不手工编辑。
- `src/data/relay-snapshot.json`：同步生成的最小健康快照。
- `src/lib/blog-source.ts`：将 Blog 条目适配为 Fumadocs page tree，并为列表移除正文。
- `scripts/`：Blog 同步、Relay 快照、快照契约测试与静态访问回归。

## 页面结构

- 首页是独立的设计型 landing page，只链接知识库、项目和 CV。
- Blog layout 使用 `BlogSidebar` 渲染目录树和搜索；`/blog/[slug]` 使用 `BlogArticle` 渲染独立文章、目录和上下篇导航。
- Portfolio 列表直接跳转项目 GitHub；详情路由仍为已有外部链接提供页面。
- CV 使用独立 A4 样式和打印媒体规则。
- Academic 展示研究兴趣；Publications / Talks 当前使用空列表，没有动态详情路由。
- API Relay 使用 `ApiRelayDashboard` 展示最近健康快照、服务地址和外部入口。

## Blog 数据流

```text
Obsidian repository
  -> scripts/sync-obsidian-blog.mjs
  -> src/data/obsidian-blog.ts
  -> src/data/site.ts
  -> src/lib/blog-source.ts
  -> BlogSidebar / BlogArticle / MarkdownContent
```

`sourcePath` 用于目录树和内部链接解析。`blogListEntries` 会移除正文，避免每篇文章把整个知识库序列化到页面 HTML。KaTeX 在构建时生成公式 HTML，长公式只在公式容器内滚动。

## Relay 数据流

```text
https://tonkicapi.xyz/api/status
  -> scripts/sync-relay-snapshot.mjs
  -> src/data/relay-snapshot.json
  -> ApiRelayDashboard
```

快照 Interface 只有 `health`。同步失败时记录本次失败并保留 `lastSuccessAt`；成功时更新 `lastSuccessAt`。浏览器探测代码保留为条件能力，但 `relayBrowserProbeEnabled` 当前为 `false`。

## 自动化

- `deploy-github-pages.yml`：推送、手动或每 15 分钟触发；同步 Relay、类型检查、快照单元测试、构建、静态访问测试、部署。
- `sync-obsidian-blog.yml`：每日同步 Blog；验证后只提交 `src/data/obsidian-blog.ts`，提交会触发 Pages 部署。

## 验证

- `npm run check`：TypeScript Interface 检查。
- `npm run test:unit`：Relay 快照 schema 与失败回退语义。
- `npm run build`：生成全部静态页面。
- `npm run test:static`：从 `out/` 启动本地静态服务器，检查主要路由、内部链接、KaTeX 回归、文章体积和历史 CSS 不回归。
- `npm test`：依次执行以上验证。

## 约束

- 任何 API Key、用户信息、额度和请求记录不得进入仓库或前端资源。
- 公开站点不得依赖浏览器跨域读取 Relay 才能显示基本状态。
- `obsidian-blog.ts` 和 `relay-snapshot.json` 是生成数据，修改逻辑应发生在对应脚本。
- 新栏目或详情路由只有在存在真实内容时才引入。
