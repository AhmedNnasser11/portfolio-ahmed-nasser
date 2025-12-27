import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "content/posts");

export type PostMetadata = {
    title: string;
    date: string;
    summary?: string;
    description?: string;
    image?: string;
    slug: string;
    tags: string[];
    readingTimeMin: number;
    views?: number;
    author?: {
        name: string;
        avatar: string;
    };
};

export function getPostSlugs() {
    if (!fs.existsSync(POSTS_PATH)) return [];
    return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
}

// Simple reading time calculation (200 words per minute)
function calculateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
}

export function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const readingTimeMin = calculateReadingTime(content);

    return {
        metadata: {
            ...data,
            slug: realSlug,
            readingTimeMin,
            // Mock data for now as per spec
            author: {
                name: "Ahmed Nasser",
                avatar: "/avatar-placeholder.png" // We'll need a real avatar later
            },
            views: Math.floor(Math.random() * 1000) + 100 // Mock views
        } as PostMetadata,
        content,
    };
}

export function getAllPosts() {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug).metadata)
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
    return posts;
}
