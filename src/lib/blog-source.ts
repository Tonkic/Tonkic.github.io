import { loader } from "fumadocs-core/source";
import type { MetaData, Source } from "fumadocs-core/source";
import { blogEntries, type ContentEntry } from "@/data/site";

export type BlogPageData = ContentEntry & {
  description: string;
};

export type BlogSearchItem = {
  slug: string;
  title: string;
  href: string;
  summary: string;
  sourcePath?: string;
  tags?: string[];
};

const cleanSummary = (summary: string) =>
  summary.replace(/^aliases:\s*/i, "").trim();

const toVirtualPath = (entry: ContentEntry) =>
  (entry.sourcePath?.replace(/\\/g, "/") ?? `${entry.slug}.md`)
    .split("/")
    .map((segment) => (segment.toLowerCase() === "index" ? "index_" : segment))
    .join("/");

const stripNumericPrefixes = (filePath: string) =>
  filePath
    .split("/")
    .map((segment) => segment.replace(/^\d+[_-]/, ""))
    .join("/");

const normalizeVaultPath = (value: string) =>
  value
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean)
    .join("/")
    .replace(/(?:\.md)+$/i, ".md");

const blogFiles = blogEntries.map((entry) => {
  const summary = cleanSummary(entry.summary);
  return {
    type: "page" as const,
    path: toVirtualPath(entry),
    absolutePath: toVirtualPath(entry),
    slugs: [entry.slug],
    data: {
      ...entry,
      summary,
      title: entry.title,
      description: summary,
    },
  };
});

const blogSourceConfig = {
  files: blogFiles,
} satisfies Source<{
  pageData: BlogPageData;
  metaData: MetaData;
}>;

export const blogSource = loader<{
  pageData: BlogPageData;
  metaData: MetaData;
}>({
  baseUrl: "/blog",
  source: blogSourceConfig,
});

export const blogPages = blogSource.getPages();
export const blogPageTree = blogSource.getPageTree();

export const blogListEntries = blogPages.map(({ data }) => {
  const { content, ...entry } = data;
  return entry;
});

export const blogSearchEntries: BlogSearchItem[] = blogListEntries.map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  href: entry.href,
  summary: entry.summary.slice(0, 96),
  sourcePath: entry.sourcePath,
  tags: entry.tags,
}));

const buildBlogLinkIndex = () => {
  const map: Record<string, string> = {};
  const basenameCounts = new Map<string, number>();

  for (const entry of blogListEntries) {
    if (!entry.sourcePath) continue;
    const normalized = entry.sourcePath.replace(/\\/g, "/");
    const base = normalized.split("/").pop()?.toLowerCase();
    if (base) basenameCounts.set(base, (basenameCounts.get(base) ?? 0) + 1);
  }

  for (const entry of blogListEntries) {
    if (!entry.sourcePath) continue;
    const normalized = entry.sourcePath.replace(/\\/g, "/");
    const lower = normalized.toLowerCase();
    const stripped = stripNumericPrefixes(normalized).toLowerCase();
    const base = lower.split("/").pop();

    map[normalized] = entry.href;
    map[lower] = entry.href;
    if (!map[stripped]) map[stripped] = entry.href;
    if (base && basenameCounts.get(base) === 1) {
      map[`basename:${base}`] = entry.href;
    }
  }

  return map;
};

const blogLinkIndex = buildBlogLinkIndex();

const resolveSingleVaultHref = (href: string, sourcePath?: string): string | null => {
  if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) return null;

  const [pathWithMaybeHash, rawHash = ""] = href.split("#");
  const [pathOnly] = pathWithMaybeHash.split("?");

  try {
    const decoded = decodeURI(pathOnly);
    const segments = decoded.startsWith("/") ? [] : sourcePath?.split("/").slice(0, -1) ?? [];

    for (const part of decoded.split("/")) {
      if (!part || part === ".") continue;
      if (part === "..") segments.pop();
      else segments.push(part);
    }

    const joined = normalizeVaultPath(segments.join("/"));
    if (!joined) return null;
    const withExt = joined.toLowerCase().endsWith(".md") ? joined : `${joined}.md`;
    const lower = withExt.toLowerCase();
    const stripped = stripNumericPrefixes(withExt).toLowerCase();
    const base = lower.split("/").pop();

    const target =
      blogLinkIndex[withExt] ??
      blogLinkIndex[lower] ??
      blogLinkIndex[stripped] ??
      (base ? blogLinkIndex[`basename:${base}`] : undefined);

    if (!target) return null;

    let decodedHash = rawHash;
    try {
      decodedHash = decodeURIComponent(rawHash);
    } catch {
      decodedHash = rawHash;
    }

    const headingSlug = decodedHash
      ? `#${decodedHash
          .normalize("NFKC")
          .toLocaleLowerCase()
          .replace(/[^\p{L}\p{N}]+/gu, "-")
          .replace(/^-+|-+$/g, "")}`
      : "";

    const normalizedTarget = target.endsWith("/") ? target : `${target}/`;
    return `${normalizedTarget}${headingSlug}`;
  } catch {
    return null;
  }
};

export const buildEntryLinkMap = (content?: string, sourcePath?: string): Record<string, string> | undefined => {
  if (!content) return undefined;
  const result: Record<string, string> = {};
  let count = 0;

  for (const match of content.matchAll(/(?<!!)\[[^\]]*]\(((?:[^()\n]|\([^()\n]*\))+)\)/g)) {
    const rawHref = match[1];
    if (result[rawHref]) continue;
    const resolved = resolveSingleVaultHref(rawHref, sourcePath);
    if (resolved) {
      result[rawHref] = resolved;
      count += 1;
    }
  }

  return count > 0 ? result : undefined;
};
