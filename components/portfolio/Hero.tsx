"use client";

import { motion } from "motion/react";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";

interface HeroProps {
  fadeInUp: any;
}

export function Hero({ fadeInUp }: HeroProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [showFixedButton, setShowFixedButton] = React.useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
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
    } finally {
      setIsDownloading(false);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowFixedButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          variant="secondary"
          size="lg"
          className="cursor-pointer rounded-full font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg border-2 border-white/20 dark:border-black/20"
        >
          {isDownloading ? (
            <>
              Generating PDF...
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            </>
          ) : (
            <>
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
            </>
          )}
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
      </div>

      {/* Floating Download Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showFixedButton ? 1 : 0,
          scale: showFixedButton ? 1 : 0.8,
          y: showFixedButton ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
        style={{ pointerEvents: showFixedButton ? "auto" : "none" }}
      >
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          size="lg"
          className="cursor-pointer rounded-full font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl border-4 border-white/20 dark:border-black/20 animate-pulse"
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
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
            </>
          )}
        </Button>
      </motion.div>
    </motion.section>
  );
}
