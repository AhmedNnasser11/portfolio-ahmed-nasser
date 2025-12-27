"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/layout-primitives";
import { SKILLS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  const categories = [
    { title: "Core Technologies", items: SKILLS.core },
    { title: "State Management", items: SKILLS.state },
    { title: "Styling & UI", items: SKILLS.ui },
    { title: "Data Fetching & APIs", items: SKILLS.data },
    { title: "Architecture & Tools", items: SKILLS.tools },
  ];

  return (
    <Section id="skills">
      <div className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive set of tools and technologies I use to build modern,
            scalable web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-secondary/20 border border-transparent hover:border-primary/20 transition-all duration-300"
            >
              <h3 className="text-lg font-bold mb-4 text-primary/80">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat?.items?.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
