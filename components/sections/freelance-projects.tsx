"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/layout-primitives";
import { PROJECTS } from "@/lib/data";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function FreelanceProjects() {
  const freelanceProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <Section id="freelance" className="bg-secondary/5">
      <div className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Other <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A collection of freelance work and personal experiments that
            contributed to my growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelanceProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-3xl bg-background border hover:border-primary/30 transition-all duration-300 flex flex-col gap-4 group"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.link !== "#" && (
                  <Link
                    href={project.link}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={18} />
                  </Link>
                )}
              </div>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest text-primary/60 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
