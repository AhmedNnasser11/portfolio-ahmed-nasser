import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { Section } from "@/components/layout/layout-primitives";
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
          name: "Freelance",
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

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>

          <div className="flex flex-col gap-4 items-center mb-8">
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {PROFILE.email}
            </a>
            <a
              href={`tel:${PROFILE.phone}`}
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {PROFILE.phone}
            </a>
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              LinkedIn
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-primary px-8 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              GitHub
            </a>
            <a
              href={PROFILE.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-primary px-8 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              NPM
            </a>
          </div>
        </div>
      </Section>
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
