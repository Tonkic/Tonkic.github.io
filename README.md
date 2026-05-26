# Tonkic Personal Website

Tonkic 的个人网站，使用 Next.js + TypeScript 构建。

站点重点：

- Blog：技术类、知识类、学习类文章入口。
- Blog 内容源：每日同步 `Tonkic/tonkic-obsidian-vault` 中的 Markdown 笔记。
- 模型 API 中转：展示对外售卖 New API 中转站入口、公开模型和美元价格快照。
- Portfolio / CV / 学术内容：第二梯队信息入口。

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
