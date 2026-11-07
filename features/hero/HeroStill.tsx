"use client";

import { useEffect, useRef } from "react";
import { afterLoadIdle } from "@/shared/lib/idle";

const SRC = "/media/posters/k1-d.avif";

/**
 * Desktop hero laptop (K1). Drawn on a <canvas> after load + idle: a canvas is
 * not an LCP candidate, so the h1 stays the LCP element (Ahmed's P2 review),
 * and decoding never competes with first paint. Phones skip it: the stage
 * right below the hero is the laptop there. <noscript> keeps a plain image.
 */
export function HeroStill() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !matchMedia("(min-width: 1024px)").matches) return;
    let cancelled = false;
    const cancelIdle = afterLoadIdle(async () => {
      const img = new Image();
      img.src = SRC;
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
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.dataset.ready = "1";
    });
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  return (
    <div className="relative hidden aspect-[1600/892] lg:block">
      <canvas
        ref={ref}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 data-[ready]:opacity-100"
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SRC}
          width={1600}
          height={892}
          alt="A closed aluminium laptop on a black pedestal in a dark studio"
          className="h-auto w-full"
        />
      </noscript>
    </div>
  );
}
