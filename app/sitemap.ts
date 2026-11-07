import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";

// Constant date: no `new Date()` under cacheComponents prerendering.
const LAST_MODIFIED = "2026-11-07";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
