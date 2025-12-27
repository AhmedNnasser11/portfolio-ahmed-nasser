"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Clock, Eye, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PostMetadata } from "@/lib/blog";

interface PostCardProps {
  post: PostMetadata;
  viewMode: "grid" | "list";
}

export function PostCard({ post, viewMode }: PostCardProps) {
  if (viewMode === "list") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block p-6 -mx-6 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          {/* Placeholder for cover image if we had one */}
          {/* <div className="w-full md:w-48 aspect-video bg-zinc-100 rounded-lg shrink-0" /> */}

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground font-mono">
              <time dateTime={post.date}>
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readingTimeMin} min read</span>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>

            <p className="text-muted-foreground leading-relaxed line-clamp-2">
              {post.summary || post.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] md:text-xs font-medium text-muted-foreground group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Read Article <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300"
    >
      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMM d, yyyy")}
          </time>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readingTimeMin} min</span>
          </div>
        </div>

        <h2 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {post.summary || post.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-800 text-[10px] font-medium text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-800 text-[10px] font-medium text-muted-foreground">
              +{post.tags.length - 2}
            </span>
          )}
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
}
