"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/layout-primitives";
import { EXPERIENCE } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience" className="bg-secondary/10">
      <div className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A journey through my career, focusing on senior frontend roles and
            impactful contributions.
          </p>
        </div>

        <div className="relative border-l border-muted-foreground/20 ml-4 md:ml-0 pl-8 md:pl-12 flex flex-col gap-12">
          {EXPERIENCE.map((item, index) => (
            <motion.div
              key={item.company + item.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(var(--primary),0.5)]" />

              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{item.role}</h3>
                  <p className="text-primary font-medium">{item.company}</p>
                </div>
                <span className="text-sm font-mono text-muted-foreground mt-1 md:mt-0">
                  {item.period}
                </span>
              </div>

              <p className="text-muted-foreground mb-4 max-w-2xl text-balance">
                {item.description}
              </p>

              <ul className="flex flex-col gap-2">
                {item.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="text-sm text-balance before:content-['→'] before:mr-2 before:text-primary/50"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
