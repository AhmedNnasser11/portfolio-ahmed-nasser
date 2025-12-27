import React from "react";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Section } from "@/components/layout/layout-primitives";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata, content } = getPostBySlug(slug);

  return (
    <Container className="max-w-3xl py-20">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to blog
      </Link>

      <header className="mb-12">
        <div className="text-sm text-muted-foreground font-mono mb-4">
          {format(new Date(metadata.date), "MMMM d, yyyy")}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {metadata.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {metadata.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-primary/70">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-primary hover:prose-a:underline prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  // @ts-ignore
                  (await import("rehype-pretty-code")).default,
                  {
                    theme: "github-dark",
                    keepBackground: false,
                    defaultLang: "js",
                  },
                ],
                // @ts-ignore
                (await import("rehype-slug")).default,
                [
                  // @ts-ignore
                  (await import("rehype-autolink-headings")).default,
                  {
                    behavior: "wrap",
                    properties: {
                      className: ["no-underline"],
                    },
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </Container>
  );
}
