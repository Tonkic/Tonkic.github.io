# 项目架构说明

本站当前使用 Next.js + TypeScript。

## 核心结构

- `src/app/`：Next.js App Router 页面入口。
- `src/components/`：可复用 React 组件，包括动效、站点外壳、内容列表、Markdown 渲染和 API dashboard。
- `src/data/site.ts`：站点导航、栏目、内容条目和站点级配置。
- `src/data/site-config.ts`：可安全进入客户端 bundle 的轻量站点配置；与 Blog 正文数据隔离。
- `src/data/relay-snapshot.json`：构建时生成的中转站公开状态与价格快照。
- `src/lib/blog-source.ts`：使用 Fumadocs loader 将 Obsidian 同步数据构建为 Blog page tree。
- `src/app/globals.css`：全站视觉系统与动效样式。

## 已实现栏目

- `Blog`：第一梯队栏目，用于技术类、知识类、学习类文章。
- `模型 API 中转`：第一梯队栏目，展示对外售卖中转入口和公开状态。
- `Portfolio`：第二梯队栏目，展示项目。
- `CV`：第二梯队栏目，面向求职和工作信息。
- `学术内容`：研究兴趣页，包含 `Publications` 和 `Talks` 子内容；当前不占主导航。

## Blog 知识库

Blog 内容来自每日同步的 `Tonkic/tonkic-obsidian-vault`。同步脚本生成 `src/data/obsidian-blog.ts`，其中 `sourcePath` 保留 Obsidian 原始文件路径。

Blog 页面不再按标签分类，而是使用 Fumadocs `loader()` 从 `sourcePath` 构建 page tree。`/blog` 的主体体验是知识库目录树，右侧显示当前选中笔记预览。

当前没有引入 Fumadocs UI/theme，避免和个人网站现有视觉系统冲突；Fumadocs 只负责内容 source 与目录树。

## 学术内容

`/academic` 是学术内容聚合页，`/publications` 和 `/talks` 是子内容列表页。

当前没有真实 publication 或 talk，因此不保留 `/publications/[slug]` 与 `/talks/[slug]` 动态详情路由。`/academic` 展示现阶段研究兴趣，避免栏目只剩空入口。等真实条目进入 `src/data/site.ts` 后，再恢复对应详情路由。

## API 中转 Dashboard

Dashboard 只展示对外售卖中转：

- 服务地址：`https://tonkic.opik.net`
- 类型：New API 网关

已确认能力：

- 根路径 `/` 返回 New API 前端页面。
- `/api/status` 公开可读，可用于展示系统名、版本、服务地址、文档链接和公开价格字段。
- `/api/pricing` 公开可读，可用于展示模型名、供应商、美元价格、分组和 endpoint 类型。
- `/v1/models` 存在，但需要 token，不在公开网站中调用。
- 用户信息、模型管理等接口需要登录或 access token。

Dashboard 是浏览器端 React client component。中转站已经使用 HTTPS，但实际 `GET` 响应没有 `Access-Control-Allow-Origin`，因此 GitHub Pages 仍不能跨域读取响应。

`scripts/sync-relay-snapshot.mjs` 在 GitHub Actions 构建环境中请求公开接口，将经过筛选的数据写入 `src/data/relay-snapshot.json`。Pages 部署工作流每 15 分钟刷新快照并重新部署，因此不依赖浏览器 CORS，也不需要 API Key。

客户端保留实时探测能力，但当前通过 `relayBrowserProbeEnabled` 关闭，避免产生浏览器 CORS 错误。接口开放 CORS 后可启用，并每 60 秒读取 `/api/status`；当前展示自动快照和检测时间。网站不保存、不输入、不展示任何 API Key。

如果以后要启用浏览器实时读取，需要在 `GET /api/status` 响应上添加仅允许本站的 CORS 头，例如：

```nginx
add_header Access-Control-Allow-Origin https://tonkic.github.io always;
add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
add_header Access-Control-Allow-Headers "Accept, Content-Type" always;
```

因为本站需要保留 GitHub Pages 静态部署能力，Dashboard 不使用 Next.js route handler 代理接口。

## 首页与导航

首页直接承担访客总览：展示身份和关注方向、Blog 与 API 中转、精选项目、推荐笔记以及 CV/学术入口。旧 `/overview` 页面只保留兼容提示，避免外部旧链接直接失效。

主导航保持四个高频入口：Blog、模型 API 中转、Portfolio 和 CV。学术内容放在首页次级入口与页脚，等 Publications 或 Talks 有真实条目后再提升导航权重。

## SEO 与可访问性

- `src/app/sitemap.ts`、`robots.ts` 和 `manifest.ts` 生成站点发现信息。
- `src/app/opengraph-image.tsx` 生成社交分享图。
- 全站支持键盘焦点样式和 `prefers-reduced-motion`；启用减少动态效果时不初始化 Lenis 平滑滚动。
