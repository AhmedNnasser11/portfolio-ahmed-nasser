"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Experience() {
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

      <div className="space-y-16 relative border-l border-slate-200 dark:border-neutral-800 ml-3 md:ml-4 pl-8 md:pl-12">
        {/* INCode */}
        <motion.div variants={fadeInUp} className="relative">
          <span className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-white dark:bg-neutral-950 border-4 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
            <h4 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Frontend Developer
            </h4>
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm mt-1 sm:mt-0 font-bold">
              Feb 2024 – Present
            </span>
          </div>
          <div className="text-lg text-slate-700 dark:text-slate-300 mb-2 font-medium">
            INCode | Cairo, Egypt
          </div>

          <div className="space-y-6 mt-6">
            <div className="group">
              <h5 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                Elli - School Management Ecosystem
              </h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Architected an enterprise-grade school management platform,
                integrating sophisticated quiz engines, assignment tracking
                systems, and automated scheduling modules. Implemented a{" "}
                <strong>dynamic roles and permissions</strong> system to manage
                granular access for administrators, teachers, and students.
              </p>
            </div>

            <div className="group">
              <h5 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                Olimi.ai - Voice AI platform
              </h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Architected and engineered the unified management dashboard for{" "}
                <strong>Olimi.ai</strong>, a MENA-focused Voice AI platform.
                Developed high-performance interfaces for managing 20+
                languages/dialects and real-time analytics (Intent Accuracy,
                CSAT). Implemented automated post-call workflows including{" "}
                <strong>AI Call Summaries</strong>,{" "}
                <strong>Sentiment Analysis</strong>, and knowledge base
                integrations (PDF/TXT).
              </p>
            </div>

            <div className="group">
              <h5 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                Deraya - Enterprise Analytics Dashboards
              </h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Engineered high-performance analytics dashboards for the
                insurance and education sectors, focusing on complex data
                visualization, real-time reporting, and insightful data
                management.
              </p>
            </div>

            <div className="group">
              <h5 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                Eatery, Kokomo, & Otto - Restaurant Management Ecosystem
              </h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Engineered a sophisticated multi-brand restaurant management
                system for high-profile hospitality groups. Developed a
                centralized dashboard to manage{" "}
                <strong>multiple brands and branches</strong>, featuring dynamic
                digital menus, specialized branch configurations, and
                streamlined end-to-end ordering processes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {[
              "Next.js",
              "TypeScript",
              "TanStack Query",
              "React Hook Form",
              "Zod",
              "Tailwind CSS",
              "RizzUI",
              "html-to-image",
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

        {/* Mazeed */}
        <motion.div variants={fadeInUp} className="relative">
          <span className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-white dark:bg-neutral-950 border-4 border-slate-400 dark:border-slate-600"></span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
            <h4 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Frontend Developer
            </h4>
            <span className="text-slate-500 font-mono text-sm mt-1 sm:mt-0 font-bold">
              Apr 2022 – Feb 2024
            </span>
          </div>
          <div className="text-lg text-slate-700 dark:text-slate-300 mb-2 font-medium">
            Mazeed | Cairo, Egypt
          </div>

          <div className="space-y-6 mt-6">
            <div className="group">
              <h5 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                Internal Meeting Management Platform
              </h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Designed and implemented a centralized meeting management
                system, optimizing organizational scheduling and collaborative
                workflows across departments.
              </p>
            </div>

            <div className="group">
              <h5 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                Real-time Voting Application
              </h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Developed a secure, high-concurrency voting application
                featuring robust user authentication and live results
                synchronization for transparent decision-making.
              </p>
            </div>

            <div className="group">
              <h5 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                Task Management & Productivity System
              </h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Maintained and scaled a comprehensive task management system,
                enhancing team productivity through optimized project tracking
                features and intuitive UI.
              </p>
            </div>

            <div className="group">
              <h5 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                Committee Management System
              </h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Contributed to the development of a professional committee
                management platform, automating administrative tasks and
                implementing a <strong>dynamic roles and permissions</strong>{" "}
                system to ensure secure access and operational efficiency for
                large-scale organizations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {[
              "React.js",
              "Redux",
              "Tailwind CSS",
              "React Hook Form",
              "Yup",
              "Moment.js",
              "i18next",
              "Lodash",
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
