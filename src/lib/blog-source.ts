import { loader } from "fumadocs-core/source";
import type { MetaData, Source } from "fumadocs-core/source";
import { blogEntries, type ContentEntry } from "@/data/site";

export type BlogPageData = ContentEntry & {
  description: string;
};

const toVirtualPath = (entry: ContentEntry) =>
  (entry.sourcePath?.replace(/\\/g, "/") ?? `${entry.slug}.md`)
    .split("/")
    .map((segment) => (segment.toLowerCase() === "index" ? "index_" : segment))
    .join("/");

const blogFiles = blogEntries.map((entry) => ({
  type: "page" as const,
  path: toVirtualPath(entry),
  absolutePath: toVirtualPath(entry),
  slugs: [entry.slug],
  data: {
    ...entry,
    title: entry.title,
    description: entry.summary,
  },
}));

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

export const blogPreviewEntries = blogPages.map(({ data }) => data);

export const blogLinkMap = Object.fromEntries(
  blogPreviewEntries
    .filter((entry) => entry.sourcePath)
    .map((entry) => [entry.sourcePath!.replace(/\\/g, "/"), entry.href]),
);
