"use client";

import React from "react";
import { Hero } from "../../components/portfolio/Hero";
import { Experience } from "../../components/portfolio/Experience";
import { Projects } from "../../components/portfolio/Projects";
import { Skills } from "../../components/portfolio/Skills";

export default function PortfolioPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-cyan-500/30 transition-colors duration-300">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white dark:from-slate-900 dark:via-neutral-950 dark:to-neutral-950 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <Hero fadeInUp={fadeInUp} />
        <Experience fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
        <Projects fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
        <Skills fadeInUp={fadeInUp} staggerContainer={staggerContainer} />

        <footer className="text-center text-slate-500 dark:text-slate-600 py-12 border-t border-slate-200 dark:border-neutral-900 mt-12">
          <p>© {year || 2024} Ahmed Nasser. Built with Next.js & Motion.</p>
        </footer>
      </div>
    </div>
  );
}
