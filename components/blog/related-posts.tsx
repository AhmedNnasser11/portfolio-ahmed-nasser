import React from "react";
import { PostMetadata } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";

export function RelatedPosts({ posts }: { posts: PostMetadata[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="py-12 border-t border-zinc-100 dark:border-zinc-800">
      <h3 className="text-2xl font-bold tracking-tight mb-8">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} viewMode="grid" />
        ))}
      </div>
    </div>
  );
}
