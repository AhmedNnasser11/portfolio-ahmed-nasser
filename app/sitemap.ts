import { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ahmednasser.com";
    const postSlugs = getPostSlugs();

    const blogPosts = postSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug.replace(/\.mdx?$/, "")}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
    ];

    return [...staticRoutes, ...blogPosts];
}
