import React from "react";
import { Container, Section } from "@/components/layout/layout-primitives";

export const metadata = {
  title: "Uses | Ahmed Nasser",
  description: "A list of the software and hardware I use for my daily work.",
};

const USES_DATA = [
  {
    category: "Workstation",
    items: [
      {
        name: "MacBook Pro M2 Max",
        description: "32GB RAM, 1TB SSD - My primary machine for development.",
      },
      {
        name: 'Dell UltraSharp 27"',
        description:
          "4K Monitor for crisp visuals and plenty of screen real estate.",
      },
      {
        name: "Keychron K2V2",
        description:
          "Mechanical keyboard with brown switches for a tactile typing experience.",
      },
      {
        name: "Logitech MX Master 3S",
        description: "The ultimate productivity mouse.",
      },
    ],
  },
  {
    category: "Software",
    items: [
      {
        name: "VS Code",
        description:
          "My editor of choice, heavily customized with 20+ extensions.",
      },
      {
        name: "Warp",
        description:
          "A modern, GPU-accelerated terminal with great AI integration.",
      },
      {
        name: "Arc Browser",
        description: "The internet, but better organized.",
      },
      {
        name: "Figma",
        description: "Where I prototype and design UI components.",
      },
    ],
  },
  {
    category: "Core Packages",
    items: [
      { name: "Next.js", description: "The foundation of my web projects." },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling for rapid development.",
      },
      {
        name: "Framer Motion",
        description: "For fluid and expressive animations.",
      },
      { name: "Lucide React", description: "Consistent and beautiful icons." },
    ],
  },
];

export default function UsesPage() {
  return (
    <Section>
      <div className="max-w-2xl mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Uses
        </h1>
        <p className="text-muted-foreground text-lg">
          A collection of the software, hardware, and tools I use on a daily
          basis to stay productive.
        </p>
      </div>

      <div className="grid gap-16">
        {USES_DATA.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <h2 className="text-xl font-bold md:col-span-1">
              {group.category}
            </h2>
            <div className="md:col-span-2 grid gap-6">
              {group.items.map((item) => (
                <div key={item.name}>
                  <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
