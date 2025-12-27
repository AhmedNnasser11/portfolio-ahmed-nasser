import React from "react";
import { Container, Section } from "@/components/layout/layout-primitives";
import { PROJECTS } from "@/lib/data";
import { FeaturedProjects } from "@/components/sections/featured-projects";

export const metadata = {
  title: "Projects | Ahmed Nasser",
  description:
    "Explore my full portfolio of web applications, experiments, and open-source contributions.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <Section>
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Work
          </h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive list of my professional work, freelance projects,
            and personal experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.slug}
              className="group p-6 rounded-3xl bg-secondary/20 border hover:bg-secondary/40 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {project.year}
                </span>
              </div>
              <p className="text-muted-foreground text-sm flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase text-primary/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
