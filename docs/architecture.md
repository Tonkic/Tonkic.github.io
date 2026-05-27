# 项目架构说明

本站当前使用 Next.js + TypeScript。

## 核心结构

- `src/app/`：Next.js App Router 页面入口。
- `src/components/`：可复用 React 组件，包括动效、站点外壳、内容列表、Markdown 渲染和 API dashboard。
- `src/data/site.ts`：站点导航、栏目、内容条目和站点级配置。
- `src/lib/blog-source.ts`：使用 Fumadocs loader 将 Obsidian 同步数据构建为 Blog page tree。
- `src/app/globals.css`：全站视觉系统与动效样式。

## 已实现栏目

- `Blog`：第一梯队栏目，用于技术类、知识类、学习类文章。
- `模型 API 中转`：第一梯队栏目，展示对外售卖中转入口和公开状态。
- `Portfolio`：第二梯队栏目，展示项目。
- `CV`：第二梯队栏目，面向求职和工作信息。
- `学术内容`：第二梯队栏目，包含 `Publications` 和 `Talks` 子内容。

## Blog 知识库

Blog 内容来自每日同步的 `Tonkic/tonkic-obsidian-vault`。同步脚本生成 `src/data/obsidian-blog.ts`，其中 `sourcePath` 保留 Obsidian 原始文件路径。

Blog 页面不再按标签分类，而是使用 Fumadocs `loader()` 从 `sourcePath` 构建 page tree。`/blog` 的主体体验是知识库目录树，右侧显示当前选中笔记预览。

当前没有引入 Fumadocs UI/theme，避免和个人网站现有视觉系统冲突；Fumadocs 只负责内容 source 与目录树。

## 学术内容

`/academic` 是学术内容聚合页，`/publications` 和 `/talks` 是子内容列表页。

当前没有真实 publication 或 talk，因此不保留 `/publications/[slug]` 与 `/talks/[slug]` 动态详情路由。这样可以避免 Next.js `output: export` 在空参数动态路由上失败。等真实条目进入 `src/data/site.ts` 后，再恢复对应详情路由。

## API 中转 Dashboard

Dashboard 只展示对外售卖中转：

- 服务地址：`http://8.134.220.84:8020`
- 类型：New API 网关

已确认能力：

- 根路径 `/` 返回 New API 前端页面。
- `/api/status` 公开可读，可用于展示系统名、版本、服务地址、文档链接和公开价格字段。
- `/api/pricing` 公开可读，可用于展示模型名、供应商、美元价格、分组和 endpoint 类型。
- `/v1/models` 存在，但需要 token，不在公开网站中调用。
- 用户信息、模型管理等接口需要登录或 access token。

Dashboard 是浏览器端 React client component，但当前不在浏览器中直接读取 `/api/status` 和 `/api/pricing`。原因是 New API 的实际 `GET` 响应没有 `Access-Control-Allow-Origin`，浏览器会拦截静态站跨域读取。

因此当前页面使用最近公开信息快照展示模型与美元价格，并提供中转站和文档跳转。网站不保存、不输入、不展示任何 API Key。

如果以后要恢复动态读取，需要在 `http://8.134.220.84:8020` 的实际 `GET /api/status` 和 `GET /api/pricing` 响应上加 CORS 头，例如：

```nginx
add_header Access-Control-Allow-Origin * always;
add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
add_header Access-Control-Allow-Headers "*" always;
```

因为本站需要保留 GitHub Pages 静态部署能力，Dashboard 不使用 Next.js route handler 代理接口。
