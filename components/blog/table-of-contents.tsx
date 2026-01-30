"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ToCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Select all H2/H3 in the article body (inside .prose)
    const elements = Array.from(
      document.querySelectorAll(".prose h2, .prose h3")
    );
    const items = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.substring(1)),
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden lg:block space-y-8">
      <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted-foreground/60">
        <div className="w-6 h-px bg-primary/30" />
        On this page
      </div>
      <div className="relative">
        <ul className="space-y-5 text-base border-l border-zinc-100 dark:border-zinc-800/50">
          {headings.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={cn(
                  "block pl-4 transition-all duration-300 hover:text-primary",
                  activeId === item.id
                    ? "text-primary font-semibold translate-x-1"
                    : "text-muted-foreground"
                )}
                style={{
                  paddingLeft: `${(item.level - 1) * 1}rem`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    const offset = 100; // Offset for sticky header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {activeId === item.id && (
                  <motion.div
                    layoutId="toc-active"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span className="line-clamp-2">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
