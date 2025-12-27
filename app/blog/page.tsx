import React from "react";
import { Container, Section } from "@/components/layout/layout-primitives";
import { getAllPosts } from "@/lib/blog";
import { BlogView } from "@/components/blog/blog-view";

export const metadata = {
  title: "Writing | Ahmed Nasser",
  description:
    "Thoughts on software engineering, product design, and building scalable web applications.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <Section className="py-24 md:py-32">
      <Container>
        <BlogView posts={posts} allTags={allTags} />
      </Container>
    </Section>
  );
}
