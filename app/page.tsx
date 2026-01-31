import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { PROFILE } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Ahmed Nasser | Senior Frontend Developer",
  description: PROFILE.summary,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: PROFILE.name,
        jobTitle: PROFILE.title,
        url: process.env.NEXT_PUBLIC_BASE_URL,
        sameAs: [
          PROFILE.links.github,
          PROFILE.links.linkedin,
          PROFILE.links.npm,
        ],
        worksFor: {
          "@type": "Organization",
          name: "E2E County",
        },
      },
      {
        "@type": "WebSite",
        name: "Ahmed Nasser Portfolio",
        url: process.env.NEXT_PUBLIC_BASE_URL,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <JsonLd data={jsonLd} />
      <Hero />
      <Experience />
      <FeaturedProjects />
      <Skills />
    </div>
  );
}

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 } as any,
  },
};
