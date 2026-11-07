"use client";

import { useCallback, useEffect, useRef } from "react";
import type { IntroCtrl } from "./intro-timeline";

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
]);

/** If GSAP has not started the reel by then (slow network, chunk error), skip it. */
const START_TIMEOUT_MS = 5000;

const btn =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-bg px-5 font-mono text-[12px] tracking-[0.12em] text-secondary uppercase hover:border-accent";

/**
 * Skip / Replay for the intro reel, outside the aria-hidden overlay so both
 * are focusable. Two buttons that never move (no layout shift, CLS): a fixed
 * "Skip intro" removed when the reel ends, and an inline "Replay intro" whose
 * space is always reserved. html[data-intro] drives both via CSS.
 * The reel itself is one GSAP timeline in a lazy chunk (intro-timeline.ts),
 * imported after hydration, i.e. after first paint (CLAUDE.md §6 rule 12b).
 */
export function IntroToggle() {
  const detach = useRef<() => void>(() => {});
  const ctrl = useRef<IntroCtrl | null>(null);

  const skip = useCallback(() => {
    detach.current();
    ctrl.current?.finish();
    document.documentElement.dataset.intro = "done";
  }, []);

  const attach = useCallback(() => {
    detach.current();
    const onKey = (e: KeyboardEvent) => SCROLL_KEYS.has(e.key) && skip();
    const opts = { passive: true, once: true } as const;
    window.addEventListener("scroll", skip, opts);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchmove", skip, opts);
    window.addEventListener("keydown", onKey);
    detach.current = () => {
      window.removeEventListener("scroll", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, [skip]);

  useEffect(() => {
    const html = document.documentElement;
    const overlay = document.getElementById("intro");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Already scrolled (reload mid-page), reduced motion, or the CSS failsafe already hid it.
    const ended = overlay && getComputedStyle(overlay).visibility === "hidden";
    if (!overlay || reduced || window.scrollY > 0 || ended) {
      skip();
      return () => detach.current();
    }
    html.dataset.intro = "playing"; // turns off the CSS-only failsafe
    attach();
    let cancelled = false;
    const failsafe = window.setTimeout(skip, START_TIMEOUT_MS);
    import("./intro-timeline")
      .then(({ playIntro }) => {
        // A new task: GSAP's evaluation and the first timeline build never share one (TBT).
        window.setTimeout(() => {
          if (cancelled || html.dataset.intro === "done") return;
          window.clearTimeout(failsafe);
          ctrl.current = playIntro(skip);
        });
      })
      .catch(skip);
    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      detach.current();
    };
  }, [attach, skip]);

  const replay = () => {
    if (!ctrl.current) return;
    document.documentElement.dataset.intro = "playing";
    ctrl.current.replay();
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
