"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectsProps {
  fadeInUp: any;
  staggerContainer: any;
}

export function Projects({ fadeInUp, staggerContainer }: ProjectsProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="mb-24"
    >
      <motion.h3
        variants={fadeInUp}
        className="text-3xl font-bold mb-12 flex items-center text-slate-900 dark:text-white"
      >
        <span className="w-8 h-1 bg-cyan-500 rounded-full mr-4"></span>
        Freelance Projects
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Kenzytours",
            desc: "Tourism & Travel Website built with Next.js",
            tags: ["Next.js", "TypeScript", "Tailwind"],
            link: "https://kenzytours.com/",
            linkText: "kenzytours.com",
          },
          {
            title: "Kemet Travel",
            desc: "Tourism Platform with comprehensive booking flow",
            tags: ["Next.js", "TypeScript", "Tailwind"],
            link: "https://www.kemet.travel/",
            linkText: "kemet.travel",
          },
          {
            title: "Agza E-commerce Dashboard",
            desc: "A powerful dashboard for managing e-commerce operations",
            tags: ["React.js", "Redux", "Tailwind"],
            link: null,
          },
          {
            title: "Kayef Partners & Kayef App",
            desc: "Landing Pages for Kayef App",
            tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            link: "https://kayef.app/partners",
            linkText: "kayef.app/partners",
          },
          {
            title: "SeenShow",
            desc: "Modern Movies Website UI with Shadcn",
            tags: ["Next.js", "Shadcn/UI", "TypeScript"],
            link: "https://seenshow.com/",
            linkText: "seenshow.com",
          },
        ].map((project, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="h-full bg-white dark:bg-neutral-900/50 border-slate-200 dark:border-neutral-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 mb-4 h-12">
                  {project.desc}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-slate-100 dark:bg-neutral-950 text-slate-500 border-slate-200 dark:border-neutral-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                {project.link ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Visit Project
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </Button>
                ) : (
                  <Button disabled variant="ghost" size="sm" className="w-full">
                    Internal System
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
