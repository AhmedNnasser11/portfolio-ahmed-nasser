import React from "react";
import { Container, Section } from "@/components/layout/layout-primitives";
import { getAllPosts } from "@/lib/blog";
import { BlogView } from "@/components/blog/blog-view";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Thoughts on software engineering, product design, and building scalable web applications.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_BASE_URL || "https://ahmednasser.com",
      },
      { "@type": "ListItem", position: 2, name: "Blog" },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Section className="py-24 md:py-32">
        <Container>
          <BlogView posts={posts} />
        </Container>
      </Section>
    </>
  );
}
