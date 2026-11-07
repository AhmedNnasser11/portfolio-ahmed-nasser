"use client";

import { useEffect } from "react";
import { detectTier } from "./device-tier";
import type { StageHandle } from "./engine";

const INTENT = ["wheel", "touchstart", "keydown", "scroll"] as const;

/**
 * Boots the scroll stage on the first scroll intent (wheel, touch, keys,
 * scroll) or when the page loads already scrolled; never just because the
 * page loaded. The engine (GSAP, ScrollTrigger, Lenis, frames) is a separate
 * chunk loaded with import(), so nothing of it is in the initial bundle or in
 * the load window (TBT, first-view transfer). Static tier loads nothing.
 */
export function StageBoot({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;
    let handle: StageHandle | undefined;
    let cancelled = false;
    let started = false;

    const removeTriggers = () => {
      for (const e of INTENT) window.removeEventListener(e, onIntent);
      window.removeEventListener("load", start);
    };

    async function start() {
      if (started || cancelled) return;
      started = true;
      removeTriggers();
      const tier = detectTier();
      document.documentElement.dataset.tier = tier;
      if (tier === "static") return;
      const { startStage } = await import("./engine");
      if (cancelled) return;
      handle = await startStage(root!, tier);
      if (cancelled) handle.destroy();
    }

    function onIntent() {
      if (document.readyState === "complete") start();
      else window.addEventListener("load", start, { once: true });
    }

    for (const e of INTENT) window.addEventListener(e, onIntent, { passive: true, once: true });
    if (window.scrollY > 0) onIntent();

    return () => {
      cancelled = true;
      removeTriggers();
      handle?.destroy();
    };
  }, [targetId]);

  return null;
}
