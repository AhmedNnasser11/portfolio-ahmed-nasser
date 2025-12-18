"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

interface ExperienceProps {
  fadeInUp: any;
  staggerContainer: any;
}

export function Experience({ fadeInUp, staggerContainer }: ExperienceProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="mb-24"
    >
      <motion.h3
        variants={fadeInUp}
        className="text-3xl font-bold mb-12 flex items-center text-slate-900 dark:text-white"
      >
        <span className="w-8 h-1 bg-cyan-500 rounded-full mr-4"></span>
        Professional Experience
      </motion.h3>

      <div className="space-y-12 relative border-l border-slate-200 dark:border-neutral-800 ml-3 md:ml-4 pl-8 md:pl-12">
        {/* INCode */}
        <motion.div variants={fadeInUp} className="relative">
          <span className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-white dark:bg-neutral-950 border-4 border-cyan-500"></span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
            <h4 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Frontend Developer
            </h4>
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm mt-1 sm:mt-0">
              Feb 2024 – Present
            </span>
          </div>
          <div className="text-lg text-slate-700 dark:text-slate-300 mb-2 font-medium">
            INCode
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Cairo, Egypt
          </p>
          <ul className="list-disc list-outside ml-4 text-slate-600 dark:text-slate-400 space-y-2 mb-6 text-sm md:text-base">
            <li>
              Created comprehensive school management dashboard featuring quiz
              management, assignment tracking, and event scheduling systems.
            </li>
            <li>
              Developed and deployed an AI-powered call assistant dashboard to
              drive customer interaction efficiency.
            </li>
            <li>
              Built intuitive, data-driven dashboards for the insurance and
              education sectors.
            </li>
            <li>
              Developed interactive restaurant menu system with management
              dashboard.
            </li>
          </ul>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "TanStack Query", "RizzUI"].map(
              (tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-neutral-700"
                >
                  {tech}
                </Badge>
              )
            )}
          </div>
        </motion.div>

        {/* Mazeed */}
        <motion.div variants={fadeInUp} className="relative">
          <span className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-white dark:bg-neutral-950 border-4 border-slate-400 dark:border-slate-600"></span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
            <h4 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Frontend Developer
            </h4>
            <span className="text-slate-500 font-mono text-sm mt-1 sm:mt-0">
              Apr 2022 – Feb 2024
            </span>
          </div>
          <div className="text-lg text-slate-700 dark:text-slate-300 mb-2 font-medium">
            Mazeed
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Cairo, Egypt
          </p>
          <ul className="list-disc list-outside ml-4 text-slate-600 dark:text-slate-400 space-y-2 mb-6 text-sm md:text-base">
            <li>
              Developed an internal meeting management system to streamline
              scheduling.
            </li>
            <li>
              Built a comprehensive voting application with real-time results.
            </li>
            <li>
              Created a task management system for efficient project tracking.
            </li>
            <li>
              Delivered committee management solutions to simplify
              administrative processes.
            </li>
          </ul>
          <div className="flex flex-wrap gap-2">
            {[
              "React.js",
              "Redux",
              "Tailwind CSS",
              "React Hook Form",
              "i18next",
            ].map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-neutral-700"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
