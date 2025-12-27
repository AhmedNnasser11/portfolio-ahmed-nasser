"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PostMetadata } from "@/lib/blog";
import { BlogHeader } from "@/components/blog/blog-header";
import { PostCard } from "@/components/blog/post-card";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogView({ posts }: { posts: PostMetadata[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortOrder, setSortOrder] = useState<"newest" | "popular">("newest");

  // Filter and sort logic
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.summary?.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortOrder === "newest") {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      // Mock popularity sort (could use views if real)
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return result;
  }, [posts, searchQuery, sortOrder]);

  return (
    <>
      <BlogHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {filteredPosts.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <PostCard post={post} viewMode={viewMode} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-full mb-4">
            <SearchX className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            We couldn't find any articles matching your search query.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
            }}
          >
            Clear search
          </Button>
        </motion.div>
      )}
    </>
  );
}
