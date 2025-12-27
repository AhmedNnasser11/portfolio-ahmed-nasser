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

  return (
    <Section className="py-24 md:py-32">
      <Container>
        <BlogView posts={posts} />
      </Container>
    </Section>
  );
}
