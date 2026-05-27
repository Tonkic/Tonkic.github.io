# Tonkic Personal Website

Tonkic 的个人网站，使用 Next.js + TypeScript 构建。

当前核心内容：

- Blog：技术、知识与学习类文章入口。
- API Relay：对外公开的模型 API 中转展示页。
- Portfolio / CV / Academic：第二层内容入口。

Blog 内容通过 `scripts/sync-obsidian-blog.mjs` 从 `Tonkic/tonkic-obsidian-vault` 同步，生成 `src/data/obsidian-blog.ts`。

## Development

```bash
npm install
npm run dev
```

同步 Obsidian Blog 内容：

```bash
npm run sync:blog
```

## Build

```bash
npm run check
npm run build
```

项目使用 `output: "export"`，适配 GitHub Pages 静态部署。
