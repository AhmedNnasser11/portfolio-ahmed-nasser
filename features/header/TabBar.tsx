"use client";

import { useEffect, useState } from "react";

type Tab = {
  id: string;
  href: string;
  label: string;
  /** Section ids that make this tab active. */
  sections: string[];
  icon: React.ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const TABS: Tab[] = [
  {
    id: "home",
    href: "#top",
    label: "Home",
    sections: ["top"],
    icon: <path {...stroke} d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />,
  },
  {
    id: "skills",
    href: "#layers",
    label: "Skills",
    sections: ["layers", "stack"],
    icon: <path {...stroke} d="m12 3 9 4.5-9 4.5-9-4.5zM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />,
  },
  {
    id: "experience",
    href: "#experience",
    label: "Experience",
    sections: ["experience"],
    icon: (
      <>
        <rect {...stroke} x="3" y="7" width="18" height="13" rx="2" />
        <path {...stroke} d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
      </>
    ),
  },
  {
    id: "work",
    href: "#work",
    label: "Work",
    sections: ["work"],
    icon: (
      <>
        <rect {...stroke} x="4" y="4" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="13" y="4" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="4" y="13" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="13" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    id: "contact",
    href: "#contact",
    label: "Contact",
    sections: ["contact"],
    icon: (
      <>
        <rect {...stroke} x="3" y="5" width="18" height="14" rx="2" />
        <path {...stroke} d="m4 7 8 6 8-6" />
      </>
    ),
  },
];

/**
 * Phone bottom tab bar (< md). Plain anchors, so it works with JavaScript off;
 * JS only moves aria-current to the section crossing the middle of the viewport.
 * Solid background, no blur/backdrop-filter (CLAUDE.md §6 rule 7).
 * Height: var(--tabbar-h) = 64px + safe-area inset (globals.css).
 */
export function TabBar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sectionToTab = new Map<string, string>();
    const els: Element[] = [];
    for (const tab of TABS) {
      for (const id of tab.sections) {
        const el = document.getElementById(id);
        if (el) {
          sectionToTab.set(id, tab.id);
          els.push(el);
        }
      }
    }
    // A thin band across the middle of the viewport: the section crossing it is active.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const tab = sectionToTab.get(e.target.id);
            if (tab) setActive(tab);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-(--z-tabbar) h-(--tabbar-h) border-t border-line bg-bg pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] md:hidden"
    >
      <ul className="grid h-16 grid-cols-5">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <li key={tab.id} className="flex">
              <a
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-11 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-[0.01em] transition-colors ${
                  isActive ? "text-text" : "text-subtle"
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`size-6 ${isActive ? "text-accent" : ""}`}
                >
                  {tab.icon}
                </svg>
                {tab.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
