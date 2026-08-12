# ADR 002：同 URL 的中英文界面

## 状态

已采用，2026-08-13。

## 背景

本站使用 Next.js App Router 与 `output: "export"` 部署到 GitHub Pages，没有服务端运行时。Blog 当前包含 300 多个静态页面；为每种语言复制路由会显著增加构建数量，而大多数笔记正文仍应保留原始语言。

## 决策

1. 保持 Next.js 15，不引入 `next-intl`、`next-i18next` 或 locale middleware。
2. 使用 `src/i18n/messages.ts` 的 typed dictionaries 与 React Context 切换界面语言。
3. 使用 `localStorage` 保存 `zh` / `en`，并在 React 水合前同步设置 `html[data-locale]` 与 `html[lang]`，减少语言闪烁。
4. 导航、按钮、状态、空页面与辅助文案必须同时提供中英文。
5. Portfolio 使用成对的 `summary` / `summaryEn`、`content` / `contentEn`；CV 使用结构一致的完整中英文数据模板。
6. Blog 正文和标题保留源内容语言，站点外壳使用当前界面语言。

## 结果

- 保持纯静态部署、原有中文 URL 和当前构建规模。
- 用户可即时切换语言，偏好在页面跳转与刷新后保留。
- 无需为简单的两语言界面承担额外框架依赖与升级风险。
- 英文界面没有独立 canonical URL，不会作为完整英文站单独收录。
- 若未来需要独立英文 SEO，可复用现有字典和内容字段生成 `/en` 静态路由，再补充 `hreflang` 与 sitemap。
