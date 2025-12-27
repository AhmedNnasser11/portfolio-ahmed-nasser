"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
    <div className="hidden lg:block space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-100 dark:bg-zinc-800" />
        <ul className="space-y-3 text-sm">
          {headings.map((item) => (
            <li key={item.id} className="pl-4 relative">
              {activeId === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-px bg-primary z-10" />
              )}
              <a
                href={`#${item.id}`}
                className={cn(
                  "block transition-colors hover:text-foreground line-clamp-2",
                  activeId === item.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
