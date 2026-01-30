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
import { JsonLd } from "@/components/seo/json-ld";
import { PROFILE } from "@/lib/data";
import { mdxComponents } from "@/components/blog/mdx-components";
import { BackToTop } from "@/components/blog/back-to-top";

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
    alternates: {
      canonical: `/blog/${slug}`,
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.description,
    image: metadata.image ? [metadata.image] : [],
    datePublished: metadata.date,
    author: {
      "@type": "Person",
      name: metadata.author?.name || PROFILE.name,
      url: PROFILE.links.linkedin,
    },
    publisher: {
      "@type": "Organization",
      name: "Ahmed Nasser",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <BackToTop />

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-24">
          <article className="min-w-0">
            <header className="mb-20">
              <div className="flex items-center gap-4 text-base text-muted-foreground font-mono mb-10">
                <time dateTime={metadata.date} className="bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 rounded-md">
                  {format(new Date(metadata.date), "MMMM d, yyyy")}
                </time>
                <span className="opacity-40">•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{metadata.readingTimeMin} min read</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-12 leading-[1.05] text-balance">
                {metadata.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-12">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10 text-sm font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {metadata.author && (
                <div className="flex items-center gap-5 p-5 rounded-[1.25rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 w-fit">
                  <Avatar className="w-12 h-12 border-2 border-background shadow-md">
                    <AvatarImage
                      src={metadata.author.avatar}
                      alt={metadata.author.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {metadata.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-base font-bold">
                      {metadata.author.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Senior Software Engineer
                    </span>
                  </div>
                </div>
              )}
            </header>

            <div
              className="prose prose-zinc dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight 
              prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-10 prose-h2:pb-4 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-800/50
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
              prose-p:text-[1.25rem] prose-p:leading-[1.9] prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:mb-8
              prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline underline-offset-8
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-blockquote:text-xl
              prose-pre:bg-zinc-50 dark:prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-zinc-800 prose-pre:rounded-3xl prose-pre:shadow-2xl prose-pre:my-10
              prose-code:text-primary prose-code:bg-primary/5 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none prose-code:font-medium
              prose-img:rounded-3xl prose-img:border prose-img:border-border/50 prose-img:shadow-2xl prose-img:my-12
              prose-hr:border-zinc-100 dark:prose-hr:border-zinc-800/50 prose-hr:my-20
              prose-ul:list-disc prose-ul:pl-8 prose-ul:mb-8 prose-li:mb-4 prose-li:text-[1.25rem]
              prose-ol:list-decimal prose-ol:pl-8 prose-ol:mb-8 prose-li:marker:text-primary prose-li:marker:font-bold
            "
            >
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      [
                        // @ts-ignore
                        (await import("rehype-pretty-code")).default,
                        {
                          theme: {
                            dark: "github-dark",
                            light: "github-light",
                          },
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
