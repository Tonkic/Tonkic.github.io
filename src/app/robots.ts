import type { MetadataRoute } from "next";
import { siteProfile } from "@/data/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteProfile.siteUrl}/sitemap.xml`,
    host: siteProfile.siteUrl,
  };
}
