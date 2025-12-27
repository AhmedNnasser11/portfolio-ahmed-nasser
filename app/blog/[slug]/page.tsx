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
    <Container className="max-w-3xl py-24 md:py-32">
      <Link
        href="/blog"
        className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft
          size={16}
          className="mr-2 group-hover:-translate-x-1 transition-transform"
        />
        Back to writing
      </Link>

      <header className="mb-16">
        <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono mb-6">
          <time dateTime={metadata.date}>
            {format(new Date(metadata.date), "MMMM d, yyyy")}
          </time>
          <span>•</span>
          <span>{metadata.tags[0]}</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
          {metadata.title}
        </h1>

        <div className="flex gap-2">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose prose-zinc dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight 
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
        prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl
        prose-img:rounded-xl prose-img:border prose-img:border-border/50
        prose-hr:border-border
      "
      >
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
