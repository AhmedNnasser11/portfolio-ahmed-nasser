"use client";

import { useCallback, useEffect, useRef } from "react";

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
]);

const btn =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-bg px-5 font-mono text-[12px] tracking-[0.12em] text-secondary uppercase hover:border-accent";

/**
 * Skip / Replay for the CSS intro reel, outside the aria-hidden overlay so both
 * are focusable. Two buttons that never move (no layout shift, CLS):
 * a fixed "Skip intro" removed when the reel ends, and an inline "Replay intro"
 * whose space is always reserved and which only becomes visible.
 * html[data-intro] drives both via CSS (globals.css).
 */
export function IntroToggle() {
  const detach = useRef<() => void>(() => {});

  const skip = useCallback(() => {
    detach.current();
    document.documentElement.dataset.intro = "done";
  }, []);

  const attach = useCallback(() => {
    detach.current();
    const overlay = document.getElementById("intro");
    const onKey = (e: KeyboardEvent) => SCROLL_KEYS.has(e.key) && skip();
    const onEnd = (e: AnimationEvent) => e.target === overlay && skip();
    const opts = { passive: true, once: true } as const;
    window.addEventListener("scroll", skip, opts);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchmove", skip, opts);
    window.addEventListener("keydown", onKey);
    overlay?.addEventListener("animationend", onEnd);
    detach.current = () => {
      window.removeEventListener("scroll", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", onKey);
      overlay?.removeEventListener("animationend", onEnd);
    };
  }, [skip]);

  useEffect(() => {
    const overlay = document.getElementById("intro");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Already scrolled (reload mid-page), reduced motion, or the reel already ended.
    const ended = overlay && getComputedStyle(overlay).visibility === "hidden";
    if (!overlay || reduced || window.scrollY > 0 || ended) skip();
    else attach();
    return () => detach.current();
  }, [attach, skip]);

  const replay = () => {
    const overlay = document.getElementById("intro");
    if (!overlay) return;
    document.documentElement.dataset.intro = "playing";
    // Restart every CSS animation in the reel (Web Animations API, no reflow hack).
    for (const a of overlay.getAnimations({ subtree: true })) {
      a.cancel();
      a.play();
    }
    attach();
  };

  return (
    <>
      <button type="button" className={`intro-skip ${btn}`} onClick={skip}>
        <span aria-hidden="true">»</span> Skip intro
      </button>
      <button type="button" className={`intro-replay ${btn}`} onClick={replay}>
        <span aria-hidden="true">↺</span> Replay intro
      </button>
    </>
  );
}
