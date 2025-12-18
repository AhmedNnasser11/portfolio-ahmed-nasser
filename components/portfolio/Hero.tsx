"use client";

import { motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

interface HeroProps {
  fadeInUp: any;
}

export function Hero({ fadeInUp }: HeroProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch("/api/export-pdf");
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Ahmed_Nasser_CV.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="mb-24 text-center md:text-left relative"
    >
      <div className="absolute top-0 right-0 z-20">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-block rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 bg-cyan-100 px-4 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
      >
        Available for work
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
        Ahmed Nasser
      </h1>
      <h2 className="text-2xl md:text-3xl font-light text-slate-600 dark:text-slate-400 mb-8">
        Front End Web Developer (React.js & Next.js)
      </h2>
      <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6 mx-auto md:mx-0">
        Highly skilled and results-driven Front End Web Developer with extensive
        experience in React.js, Next.js, and TypeScript. I build scalable,
        high-performance web applications with a focus on intuitive, data-driven
        dashboards and seamless user experiences.
      </p>
      <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-10 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <span>Cairo, Egypt</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <span>+20 10 686 920 41</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <span>ahmednnasser111@gmail.com</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button asChild size="lg" className="rounded-lg font-semibold">
          <a href="mailto:ahmednnasser111@gmail.com">Contact Me</a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-lg font-medium"
        >
          <a
            href="https://www.linkedin.com/in/ahmed-nasser-931490212/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-lg font-medium"
        >
          <a
            href="https://www.npmjs.com/~ahmednnasser111"
            target="_blank"
            rel="noopener noreferrer"
          >
            NPM Profile
          </a>
        </Button>
        <Button
          onClick={handleDownload}
          variant="secondary"
          size="lg"
          className="rounded-lg font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 border border-cyan-200 dark:border-cyan-800"
        >
          Download CV
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
        </Button>
      </div>
    </motion.section>
  );
}
