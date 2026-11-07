"use client";

import { useEffect } from "react";
import { afterLoadIdle } from "@/shared/lib/idle";
import { detectTier } from "./device-tier";
import type { StageHandle } from "./engine";

const INTENT = ["wheel", "touchstart", "keydown", "scroll"] as const;

/**
 * Boots the scroll stage on the first scroll intent (wheel, touch, keys,
 * scroll) or when the page loads already scrolled; never just because the
 * page loaded. The engine (GSAP, ScrollTrigger, Lenis, frames) is a separate
 * chunk loaded with import(), so nothing of it is in the initial bundle or in
 * the load window (TBT, first-view transfer). Static tier loads nothing.
 * Also starts the hero laptop (features/hero/laptop.ts) after load + idle, and
 * opens the live demos: one delegated click listener for [data-demo]
 * buttons; the dialog and each demo are lazy chunks (features/demos).
 */
export function StageBoot({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;
    let handle: StageHandle | undefined;
    let cancelled = false;
    let started = false;
    // Tier at mount (cheap): CSS needs data-tier for ?tier=static and the low tier before any scroll.
    const tier = detectTier();
    document.documentElement.dataset.tier = tier;

    const removeTriggers = () => {
      for (const e of INTENT) window.removeEventListener(e, onIntent);
      window.removeEventListener("load", start);
    };

    async function start() {
      if (started || cancelled) return;
      started = true;
      removeTriggers();
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

    // Hero laptop (canvas, float, tilt, scroll handoff): a lazy chunk after load + idle.
    let laptop: { destroy: () => void } | undefined;
    const cancelHero = afterLoadIdle(async () => {
      const { startHeroLaptop } = await import("@/features/hero/laptop");
      if (cancelled) return;
      laptop = await startHeroLaptop(tier);
      if (cancelled) laptop?.destroy();
    });

    const onDemo = (e: MouseEvent) => {
      const btn = (e.target as Element).closest?.<HTMLElement>("[data-demo]");
      if (!btn?.dataset.demo) return;
      import("@/features/demos/open").then((m) => m.openDemo(btn.dataset.demo!, btn));
    };
    document.addEventListener("click", onDemo);
    // Preload the dialog + that demo's chunk on hover, focus or press (bundle-preload).
    const onIntentToOpen = (e: Event) => {
      const id = (e.target as Element).closest?.<HTMLElement>("[data-demo]")?.dataset.demo;
      if (id) import("@/features/demos/open").then((m) => m.preloadDemo(id));
    };
    for (const t of ["pointerover", "focusin", "pointerdown"] as const)
      document.addEventListener(t, onIntentToOpen, { passive: true });

    return () => {
      cancelled = true;
      cancelHero();
      laptop?.destroy();
      removeTriggers();
      document.removeEventListener("click", onDemo);
      for (const t of ["pointerover", "focusin", "pointerdown"] as const)
        document.removeEventListener(t, onIntentToOpen);
      handle?.destroy();
    };
  }, [targetId]);

  return null;
}
