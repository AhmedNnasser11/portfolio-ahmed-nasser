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
        className="group relative block p-6 -mx-6 rounded-3xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground font-mono">
              <time dateTime={post.date} className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
              <span className="opacity-40">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTimeMin} min read</span>
              </div>
            </div>

            <h2 className="text-xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors leading-tight">
              {post.title}
            </h2>

            <p className="text-muted-foreground leading-relaxed line-clamp-2 text-lg">
              {post.summary || post.description}
            </p>

            <div className="flex items-center justify-between pt-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] md:text-xs font-medium text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
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
      className="group flex flex-col h-full p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="space-y-5 flex-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <time dateTime={post.date} className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
            {format(new Date(post.date), "MMM d, yyyy")}
          </time>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTimeMin} min</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h2>

        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
          {post.summary || post.description}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-zinc-50 dark:bg-zinc-800 text-[10px] font-medium text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
