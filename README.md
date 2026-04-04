# Tonkic Personal Website

A lightweight personal site built with Astro + React + TypeScript.

## Stack

- TypeScript
- Astro
- React
- Marked (Markdown rendering)
- @chenglou/pretext (text measurement optimization)

## Development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run typecheck
npm run build
```

Build artifacts are generated in `dist/` and deployed by GitHub Pages workflow.

## Content

- Home page: `content/index.md`
- CV page: `content/cv.md`
- Posts: `content/posts/*.md`

## Obsidian Vault Blog Source

Blog posts can be sourced from `https://github.com/Tonkic/tonkic-obsidian-vault`.

```bash
npm run sync:vault
```

When `content/vault/` exists, the site will prioritize Markdown files from that folder.
If it doesn't exist, it will fall back to `content/posts/`.
