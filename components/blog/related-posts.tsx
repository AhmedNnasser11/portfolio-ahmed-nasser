import React from "react";
import { PostMetadata } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function RelatedPosts({ posts }: { posts: PostMetadata[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="py-24 border-t border-zinc-100 dark:border-zinc-800/50 mt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-3">
            Continue Reading
          </h3>
          <p className="text-muted-foreground text-lg">
            More articles you might find interesting
          </p>
        </div>
        <Link 
          href="/blog"
          className="text-sm font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1"
        >
          View all articles <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} viewMode="grid" />
        ))}
      </div>
    </div>
  );
}
