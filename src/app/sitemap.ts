import type { MetadataRoute } from "next";
import { blogEntries, portfolioEntries } from "@/data/site";
import { siteProfile } from "@/data/site-config";

export const dynamic = "force-static";

const absoluteUrl = (pathname: string) => new URL(pathname, siteProfile.siteUrl).toString();

const validDate = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/blog/"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/api-relay/"), changeFrequency: "hourly", priority: 0.9 },
    { url: absoluteUrl("/portfolio/"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/cv/"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/academic/"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/publications/"), changeFrequency: "monthly", priority: 0.3 },
    { url: absoluteUrl("/talks/"), changeFrequency: "monthly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogEntries.map((entry) => ({
    url: absoluteUrl(`${entry.href}/`),
    lastModified: validDate(entry.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = portfolioEntries.map((entry) => ({
    url: absoluteUrl(`${entry.href}/`),
    lastModified: validDate(entry.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...projectPages];
}
