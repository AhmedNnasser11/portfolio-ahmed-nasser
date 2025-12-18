import React from "react";
import { Hero } from "../components/portfolio/Hero";
import { Experience } from "../components/portfolio/Experience";
import { Projects } from "../components/portfolio/Projects";
import { Skills } from "../components/portfolio/Skills";
import { Footer } from "../components/portfolio/Footer";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-cyan-500/30 transition-colors duration-300">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white dark:from-slate-900 dark:via-neutral-950 dark:to-neutral-950 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <Hero />
        <Experience />
        <Projects />
        <Skills />

        <Footer />
      </div>
    </div>
  );
}
