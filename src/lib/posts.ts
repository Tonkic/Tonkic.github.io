import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs"
import { dirname, extname, join, normalize, relative } from "node:path"
import matter from "gray-matter"
import { marked } from "marked"

export type Post = {
  slug: string
  notePath: string
  folder: string
  title: string
  date?: string
  tags: string[]
  aliases: string[]
  categories: string[]
  attributes: Record<string, string[]>
  searchText: string
  excerpt: string
  body: string
}

export type PostGroup = {
  folder: string
  posts: Post[]
}

export type DirectoryEntry = {
  path: string
  name: string
  depth: number
  parentPath: string | null
  childDirPaths: string[]
  posts: Post[]
}

const localPostsDir = join(process.cwd(), "content", "posts")
const vaultPostsDir = join(process.cwd(), "content", "vault")
const publicVaultAssetsDir = join(process.cwd(), "public", "vault-assets")

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp", ".avif"])

type AssetIndex = {
  byRelative: Map<string, string>
  byBasename: Map<string, string>
}

function collectMarkdownFiles(rootDir: string): string[] {
  if (!existsSync(rootDir)) return []

  const results: string[] = []
  const stack = [rootDir]

  while (stack.length > 0) {
    const current = stack.pop()!
    const entries = readdirSync(current, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(current, entry.name)
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".") || entry.name === "node_modules") continue
        stack.push(fullPath)
        continue
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        results.push(fullPath)
      }
    }
  }

  return results
}

function notePathFromPath(rootDir: string, fullPath: string): string {
  const rel = relative(rootDir, fullPath).replace(/\\/g, "/")
  return rel.replace(/\.md$/i, "")
}

function normalizeNotePath(path: string): string {
  if (!path || path.trim() === "") return ""
  return normalize(path.replace(/\\/g, "/")).replace(/\\/g, "/").replace(/\.md$/i, "")
}

function slugFromNotePath(notePath: string): string {
  return normalizeNotePath(notePath)
}

function pathDepth(path: string): number {
  if (!path) return 0
  return path.split("/").filter(Boolean).length
}

function pathName(path: string): string {
  if (!path) return "全部笔记"
  const parts = path.split("/")
  return parts[parts.length - 1] || path
}

function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^\)]+\)/g, "")
    .replace(/\[[^\]]+\]\([^\)]+\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/[>*_~\-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function toStringArray(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((v) => String(v).trim()).filter(Boolean)
  }
  if (typeof input === "string") {
    return input
      .split(/[\n\r,;]+/)
      .map((v) => v.trim())
      .filter(Boolean)
  }
  if (input == null) return []
  return [String(input).trim()].filter(Boolean)
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((v) => v.trim()).filter(Boolean)))
}

function normalizeAttributes(data: Record<string, unknown>, ignoredKeys: Set<string>): Record<string, string[]> {
  const attrs: Record<string, string[]> = {}
  for (const [key, raw] of Object.entries(data)) {
    if (ignoredKeys.has(key)) continue

    const values = toStringArray(raw)
    if (values.length === 0) continue
    attrs[key] = values
  }
  return attrs
}

function mergeFrontmatter(base: Record<string, unknown>, extra: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base }

  for (const [key, value] of Object.entries(extra)) {
    const prev = result[key]
    if (prev === undefined) {
      result[key] = value
      continue
    }

    if (Array.isArray(prev) || Array.isArray(value)) {
      const merged = [...toStringArray(prev), ...toStringArray(value)]
      result[key] = uniqueStrings(merged)
      continue
    }

    const prevString = String(prev).trim()
    const nextString = String(value).trim()
    if (!prevString) {
      result[key] = value
      continue
    }

    if (!nextString || prevString === nextString) continue
    result[key] = uniqueStrings([prevString, nextString])
  }

  return result
}

function parseChainedFrontmatter(raw: string) {
  let remaining = raw
  let mergedData: Record<string, unknown> = {}
  let parsedAny = false

  while (/^\s*---\s*\r?\n/.test(remaining)) {
    const parsed = matter(remaining)
    mergedData = mergeFrontmatter(mergedData, parsed.data as Record<string, unknown>)
    remaining = parsed.content
    parsedAny = true
  }

  if (!parsedAny) {
    const parsed = matter(raw)
    return {
      data: parsed.data as Record<string, unknown>,
      content: parsed.content,
    }
  }

  return {
    data: mergedData,
    content: remaining,
  }
}

function encodePathSegments(path: string): string {
  return normalizeNotePath(path)
    .split("/")
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
    .join("/")
}

function toNoteUrl(notePath: string): string {
  return `/posts/${encodePathSegments(notePath)}`
}

function toDirectoryUrl(dirPath: string): string {
  if (!dirPath) return "/posts"
  return `/posts/${encodePathSegments(dirPath)}`
}

function buildPostIndexes(posts: Post[]) {
  const byPath = new Map<string, Post>()
  const byBaseName = new Map<string, Post>()

  for (const post of posts) {
    const pathKey = normalizeNotePath(post.notePath).toLowerCase()
    byPath.set(pathKey, post)

    const parts = post.notePath.split("/")
    const base = parts[parts.length - 1]?.toLowerCase()
    if (base && !byBaseName.has(base)) {
      byBaseName.set(base, post)
    }
  }

  return { byPath, byBaseName }
}

function buildDirectoryIndexes(posts: Post[]) {
  const dirMap = new Map<string, DirectoryEntry>()

  const ensureDir = (dirPath: string) => {
    const normalized = normalizeNotePath(dirPath)
    if (dirMap.has(normalized)) return

    const parentPath = normalized.includes("/")
      ? normalized.slice(0, normalized.lastIndexOf("/"))
      : normalized
        ? ""
        : null

    dirMap.set(normalized, {
      path: normalized,
      name: pathName(normalized),
      depth: pathDepth(normalized),
      parentPath,
      childDirPaths: [],
      posts: [],
    })
  }

  ensureDir("")

  for (const post of posts) {
    const parts = post.notePath.split("/")
    const dirParts = parts.slice(0, -1)
    let current = ""
    ensureDir(current)

    for (const part of dirParts) {
      const next = current ? `${current}/${part}` : part
      ensureDir(next)

      const parent = dirMap.get(current)!
      if (!parent.childDirPaths.includes(next)) parent.childDirPaths.push(next)

      current = next
    }

    dirMap.get(current)!.posts.push(post)
  }

  for (const entry of dirMap.values()) {
    entry.childDirPaths.sort((a, b) => a.localeCompare(b, "zh-CN"))
    entry.posts.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"))
  }

  const dirByBaseName = new Map<string, DirectoryEntry>()
  for (const entry of dirMap.values()) {
    if (!entry.path) continue
    const key = entry.name.toLowerCase()
    if (!dirByBaseName.has(key)) dirByBaseName.set(key, entry)
  }

  return { dirMap, dirByBaseName }
}

function isImagePath(input: string): boolean {
  const clean = input.split("?")[0].split("#")[0]
  const ext = extname(clean).toLowerCase()
  return IMAGE_EXTS.has(ext)
}

function buildAssetIndex(baseDir: string): AssetIndex {
  const byRelative = new Map<string, string>()
  const byBasename = new Map<string, string>()

  const stack = [baseDir]
  while (stack.length > 0) {
    const current = stack.pop()!
    const entries = readdirSync(current, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(current, entry.name)
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".")) continue
        stack.push(fullPath)
        continue
      }

      if (!entry.isFile()) continue
      if (!IMAGE_EXTS.has(extname(entry.name).toLowerCase())) continue

      const rel = relative(baseDir, fullPath).replace(/\\/g, "/")
      byRelative.set(rel.toLowerCase(), fullPath)

      const base = entry.name.toLowerCase()
      if (!byBasename.has(base)) byBasename.set(base, fullPath)
    }
  }

  return { byRelative, byBasename }
}

function encodeUrlPath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
    .join("/")
}

function copyVaultAssetAndGetUrl(baseDir: string, currentNotePath: string, rawTarget: string): string | null {
  const target = decodeURIComponent(rawTarget.split("|")[0].trim())
  if (!target || /^(https?:)?\/\//i.test(target)) return target || null

  const currentMdPath = join(baseDir, `${currentNotePath}.md`)
  const currentDir = dirname(currentMdPath)
  const assetIndex = buildAssetIndex(baseDir)

  const normalizedTarget = target.replace(/\\/g, "/").trim()
  const strippedTarget = normalizedTarget.replace(/^\.?\//, "").replace(/^(\.\.\/)+/, "")

  const candidates: string[] = [
    normalize(join(currentDir, normalizedTarget)),
    normalize(join(baseDir, normalizedTarget)),
    normalize(join(baseDir, strippedTarget)),
  ]

  let source: string | null = null
  for (const candidate of candidates) {
    if (!existsSync(candidate)) continue
    const rel = relative(baseDir, candidate)
    if (rel.startsWith("..")) continue
    source = candidate
    break
  }

  if (!source) {
    const byRel = assetIndex.byRelative.get(strippedTarget.toLowerCase())
    if (byRel) source = byRel
  }

  if (!source) {
    const fileName = normalizedTarget.split("/").at(-1)?.toLowerCase()
    if (fileName) {
      const byName = assetIndex.byBasename.get(fileName)
      if (byName) source = byName
    }
  }

  if (source) {
    const rel = relative(baseDir, source).replace(/\\/g, "/")
    const dest = join(publicVaultAssetsDir, rel)
    mkdirSync(dirname(dest), { recursive: true })
    copyFileSync(source, dest)
    return `/vault-assets/${encodeUrlPath(rel)}`
  }

  return null
}

type NotesModel = {
  posts: Post[]
  byPath: Map<string, Post>
  byBaseName: Map<string, Post>
  dirMap: Map<string, DirectoryEntry>
  dirByBaseName: Map<string, DirectoryEntry>
}

let cachedModel: NotesModel | null = null

function buildPosts(): Post[] {
  const vaultFiles = collectMarkdownFiles(vaultPostsDir)
  const localFiles = collectMarkdownFiles(localPostsDir)

  const useVault = vaultFiles.length > 0
  const files = useVault ? vaultFiles : localFiles
  const baseDir = useVault ? vaultPostsDir : localPostsDir

  const posts = files.map((fullPath) => {
    const raw = readFileSync(fullPath, "utf-8")
    const parsed = parseChainedFrontmatter(raw)

    const notePath = notePathFromPath(baseDir, fullPath)
    const slug = slugFromNotePath(notePath)
    const fallbackTitle = fullPath
      .split(/[\\/]/)
      .pop()
      ?.replace(/\.md$/i, "")
      .replace(/[-_]/g, " ")
      .trim()

    const title =
      typeof parsed.data.title === "string"
        ? parsed.data.title.replace(/^['\"]|['\"]$/g, "")
        : fallbackTitle || slug

    const frontmatter = parsed.data as Record<string, unknown>

    const date = typeof frontmatter.date === "string" ? frontmatter.date : undefined
    const tags = uniqueStrings(toStringArray(frontmatter.tags))
    const aliases = uniqueStrings(toStringArray(frontmatter.aliases))
    const explicitCategories = uniqueStrings([
      ...toStringArray(frontmatter.category),
      ...toStringArray(frontmatter.categories),
      ...toStringArray(frontmatter.classification),
      ...toStringArray(frontmatter.class),
      ...toStringArray(frontmatter.type),
    ])
    const categories = explicitCategories.length > 0 ? explicitCategories : tags

    const attributes = normalizeAttributes(
      frontmatter,
      new Set(["title", "date", "tags", "aliases", "category", "categories", "classification", "class", "type"]),
    )

    const text = plainText(parsed.content)
    const excerpt = text.slice(0, 170) + (text.length > 170 ? "..." : "")
    const attributeText = Object.entries(attributes)
      .map(([k, vals]) => `${k} ${vals.join(" ")}`)
      .join(" ")
    const searchText = `${title} ${excerpt} ${text} ${aliases.join(" ")} ${categories.join(" ")} ${tags.join(" ")} ${attributeText}`
      .toLowerCase()

    return {
      slug,
      notePath,
      folder: notePath.includes("/") ? notePath.split("/")[0] : "未分类",
      title,
      date,
      tags,
      aliases,
      categories,
      attributes,
      searchText,
      excerpt,
      body: parsed.content,
    }
  })

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return a.title.localeCompare(b.title, "zh-CN")
    return a.date < b.date ? 1 : -1
  })
}

function getNotesModel(): NotesModel {
  if (cachedModel) return cachedModel

  const posts = buildPosts()
  const { byPath, byBaseName } = buildPostIndexes(posts)
  const { dirMap, dirByBaseName } = buildDirectoryIndexes(posts)

  cachedModel = {
    posts,
    byPath,
    byBaseName,
    dirMap,
    dirByBaseName,
  }

  return cachedModel
}

export function renderPostHtml(post: Post, allPosts: Post[]): string {
  const { byPath, byBaseName } = buildPostIndexes(allPosts)
  const { dirMap, dirByBaseName } = buildDirectoryIndexes(allPosts)
  const useVault = existsSync(vaultPostsDir)
  const baseDir = useVault ? vaultPostsDir : localPostsDir
  let markdown = post.body

  // Obsidian image/embed syntax: ![[path/to/file.png]]
  markdown = markdown.replace(/!\[\[([^\]]+)\]\]/g, (_match, rawTarget: string) => {
    const target = rawTarget.split("|")[0].trim()
    if (!target) return ""

    if (isImagePath(target)) {
      const url = copyVaultAssetAndGetUrl(baseDir, post.notePath, target)
      if (url) return `![](${url})`
      return `![](${target})`
    }

    const normalized = normalizeNotePath(target).toLowerCase()
    const foundPost = byPath.get(normalized) ?? byBaseName.get(normalized)
    if (foundPost) {
      return `[${foundPost.title}](${toNoteUrl(foundPost.notePath)})`
    }
    const foundDir = dirMap.get(normalized) ?? dirByBaseName.get(normalized)
    if (foundDir) {
      return `[${pathName(target)}](${toDirectoryUrl(foundDir.path)})`
    }
    return target
  })

  // Standard Markdown image syntax: ![alt](path/to/file.png)
  markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt: string, rawTarget: string) => {
    const target = String(rawTarget).trim()
    if (!target) return _match

    // Keep remote or absolute links unchanged.
    if (/^(https?:)?\/\//i.test(target) || target.startsWith("/")) {
      return `![${alt}](${target})`
    }

    const assetUrl = copyVaultAssetAndGetUrl(baseDir, post.notePath, target)
    if (assetUrl) {
      return `![${alt}](${assetUrl})`
    }

    return _match
  })

  // Obsidian wikilink syntax: [[path|label]]
  markdown = markdown.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, rawTarget: string, rawLabel?: string) => {
    const target = String(rawTarget).trim()
    const label = (rawLabel ? String(rawLabel) : target).trim()
    const normalized = normalizeNotePath(target).toLowerCase()
    const foundPost = byPath.get(normalized) ?? byBaseName.get(normalized)

    if (foundPost) {
      return `[${label}](${toNoteUrl(foundPost.notePath)})`
    }

    const foundDir = dirMap.get(normalized) ?? dirByBaseName.get(normalized)
    if (foundDir) {
      return `[${label}](${toDirectoryUrl(foundDir.path)})`
    }

    return label
  })

  return marked.parse(markdown) as string
}

export function getAllPosts(): Post[] {
  return getNotesModel().posts
}

export function groupPostsByFolder(posts: Post[]): PostGroup[] {
  const groups = new Map<string, Post[]>()

  for (const post of posts) {
    if (!groups.has(post.folder)) groups.set(post.folder, [])
    groups.get(post.folder)!.push(post)
  }

  return Array.from(groups.entries())
    .sort((a, b) => a[0].localeCompare(b[0], "zh-CN"))
    .map(([folder, groupPosts]) => ({ folder, posts: groupPosts }))
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}

export function getPostByNotePath(notePath: string): Post | undefined {
  return getNotesModel().byPath.get(normalizeNotePath(notePath).toLowerCase())
}

export function getDirectoryByPath(path: string): DirectoryEntry | undefined {
  return getNotesModel().dirMap.get(normalizeNotePath(path))
}

export function getDirectoryEntries(): DirectoryEntry[] {
  return Array.from(getNotesModel().dirMap.values()).sort((a, b) => {
    if (a.depth !== b.depth) return a.depth - b.depth
    return a.path.localeCompare(b.path, "zh-CN")
  })
}

export function getDirectoryPaths(): string[] {
  return getDirectoryEntries()
    .map((d) => d.path)
    .filter(Boolean)
}

export function getDirectoryUrl(path: string): string {
  return toDirectoryUrl(path)
}

export function getNoteUrl(path: string): string {
  return toNoteUrl(path)
}
