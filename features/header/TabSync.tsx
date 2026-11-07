"use client";

import { useEffect } from "react";

/**
 * 1. Tab bar: aria-current follows the section crossing the middle of the
 *    viewport (IntersectionObserver).
 * 2. In-page anchors: below-fold sections use content-visibility:auto, so their
 *    placeholder heights can differ from the real ones. After a native anchor
 *    scroll ends, re-check the target and snap it under the header. (Desktop
 *    with Lenis corrects in the engine instead.)
 */
export function TabSync() {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Sections"] a[data-sections]'),
    );
    const bySection = new Map<string, HTMLAnchorElement>();
    for (const a of links) for (const id of a.dataset.sections!.split(" ")) bySection.set(id, a);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const active = e.isIntersecting && bySection.get(e.target.id);
          if (!active) continue;
          for (const l of links) {
            if (l === active) l.setAttribute("aria-current", "page");
            else l.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of bySection.keys()) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }

    const header = document.querySelector<HTMLElement>("header.sticky");
    const settle = (id: string, tries = 3) => {
      const el = document.getElementById(id);
      if (!el || !tries) return;
      const off = el.getBoundingClientRect().top - ((header?.offsetHeight ?? 0) + 8);
      if (Math.abs(off) <= 4) return;
      window.scrollBy({ top: off, behavior: "instant" });
      requestAnimationFrame(() => settle(id, tries - 1));
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href")?.slice(1);
      if (!id || document.documentElement.classList.contains("lenis")) return;
      if ("onscrollend" in window) window.addEventListener("scrollend", () => settle(id), { once: true });
      else setTimeout(() => settle(id), 900);
    };
    document.addEventListener("click", onClick);
    if (location.hash.length > 1) requestAnimationFrame(() => settle(location.hash.slice(1)));

    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
