import React from "react";
import { Container, Section } from "@/components/layout/layout-primitives";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
  title: "Blog | Ahmed Nasser",
  description:
    "Read my latest thoughts on frontend development, design, and engineering mindset.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <div className="max-w-2xl mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Blog
        </h1>
        <p className="text-muted-foreground text-lg">
          Sharing my journey, learnings, and technical deep dives in the world
          of web development.
        </p>
      </div>

      <div className="grid gap-12">
        {posts.map((post) => (
          <article key={post.slug} className="group relative">
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-32 pt-1 text-sm text-muted-foreground font-mono">
                {format(new Date(post.date), "MMM d, yyyy")}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.summary || post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-primary/60 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
