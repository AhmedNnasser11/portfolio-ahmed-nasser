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
 * Also draws the desktop hero still (#hero-still) after load + idle, and opens the live demos: one delegated click listener for [data-demo]
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

    // Desktop hero laptop: decode off the critical path, draw once.
    const cancelHero = afterLoadIdle(async () => {
      const canvas = document.getElementById("hero-still") as HTMLCanvasElement | null;
      if (!canvas || !matchMedia("(min-width: 1024px)").matches) return;
      const img = new Image();
      img.src = "/media/posters/k1-d.avif";
      try {
        await img.decode();
      } catch {
        return;
      }
      if (cancelled) return;
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.getContext("2d", { alpha: false })?.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.dataset.ready = "1";
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
      removeTriggers();
      document.removeEventListener("click", onDemo);
      for (const t of ["pointerover", "focusin", "pointerdown"] as const)
        document.removeEventListener(t, onIntentToOpen);
      handle?.destroy();
    };
  }, [targetId]);

  return null;
}
