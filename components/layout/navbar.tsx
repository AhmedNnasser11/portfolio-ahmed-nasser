"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  // { label: "Uses", href: "/uses" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          AN<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Button
              variant="default"
              size="sm"
              className="animate-pulse hover:animate-none"
              asChild
            >
              <a href="/api/export-pdf">
                cv <Download className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b md:hidden p-6 flex flex-col gap-4"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-lg font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <Button variant="default" size="lg" className="w-full mt-4" asChild>
              <a href="/api/export-pdf">
                Download CV <Download className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
