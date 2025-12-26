"use client";

import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Skills() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.h3
        variants={fadeInUp}
        className="text-3xl font-bold mb-12 flex items-center text-slate-900 dark:text-white"
      >
        <span className="w-8 h-1 bg-cyan-500 rounded-full mr-4"></span>
        Technical Skills
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          {
            category: "Core Technologies",
            items: [
              "JavaScript (ES6+)",
              "TypeScript",
              "React.js",
              "Next.js",
              "HTML5",
              "CSS3",
            ],
          },
          {
            category: "State Management",
            items: ["Redux Toolkit", "Zustand", "React Context API", "Signals"],
          },
          {
            category: "Styling & UI",
            items: [
              "Tailwind CSS",
              "MUI",
              "Shadcn/UI",
              "Headless UI",
              "RizzUI",
              "Styled-components",
            ],
          },
          {
            category: "Data Fetching & APIs",
            items: [
              "TanStack Query (React Query)",
              "Axios",
              "RESTful APIs",
              "WebSockets",
            ],
          },
          {
            category: "Architecture & Tools",
            items: [
              "Git",
              "Vite",
              "Webpack",
              "Performance Optimization",
              "SEO Best Practices",
              "Responsive Design",
            ],
          },
        ].map((skillGroup, idx) => (
          <motion.div key={idx} variants={fadeInUp}>
            <Card className="h-full bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800/50 shadow-sm dark:shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 border-b border-slate-100 dark:border-neutral-800 pb-2">
                  {skillGroup.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-slate-600 dark:text-slate-300 border-slate-200 dark:border-neutral-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
