import React from "react";
import { getPostBySlug, getRelatedPosts, getPostSlugs } from "@/lib/blog";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/layout-primitives";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { ScrollProgress } from "@/components/blog/scroll-progress";
import { ShareActions } from "@/components/blog/share-actions";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorCard } from "@/components/blog/author-card";
import { RelatedPosts } from "@/components/blog/related-posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = getPostBySlug(slug);
  return {
    title: `${metadata.title} | Ahmed Nasser`,
    description: metadata.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata, content } = getPostBySlug(slug);

  // Calculate related posts
  const relatedPosts = getRelatedPosts(slug, metadata.tags);

  return (
    <>
      <ScrollProgress />

      <Container className="max-w-6xl py-24 md:py-32 relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-24">
          <article className="min-w-0">
            <header className="mb-12">
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono mb-6">
                <time dateTime={metadata.date}>
                  {format(new Date(metadata.date), "MMM d, yyyy")}
                </time>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{metadata.readingTimeMin} min read</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
                {metadata.title}
              </h1>

              <div className="flex gap-2 mb-8">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {metadata.author && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 border border-zinc-200 dark:border-zinc-800">
                    <AvatarImage
                      src={metadata.author.avatar}
                      alt={metadata.author.name}
                    />
                    <AvatarFallback>
                      {metadata.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {metadata.author.name}
                  </span>
                </div>
              )}
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

            <ShareActions
              title={metadata.title}
              slug={metadata.slug}
              className="mt-12 md:hidden"
              orientation="horizontal"
            />

            {metadata.author && (
              <AuthorCard
                author={metadata.author}
                date={metadata.date}
                readingTime={metadata.readingTimeMin}
              />
            )}
          </article>

          <aside className="hidden lg:block h-full">
            <div className="sticky top-32 space-y-12">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Share
                </p>
                <ShareActions title={metadata.title} slug={metadata.slug} />
              </div>
              <TableOfContents />
            </div>
          </aside>
        </div>

        <RelatedPosts posts={relatedPosts} />
      </Container>
    </>
  );
}
