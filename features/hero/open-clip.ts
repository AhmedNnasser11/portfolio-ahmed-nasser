// Clip A in the hero (CLAUDE.md §1 chapter 1): after the intro the laptop opens
// once, by time, and rests on its last frame (K2). Same frame files as the
// stage's first frame (public/media/clips/a/{d|m}/NNN.webp), so the scroll
// handoff lands on identical pixels.
// - Fetched as blobs at idle, after first paint, at low priority (§6 rule 5).
// - Decoded just ahead of the playhead with createImageBitmap (off the main
//   thread) and closed right after drawing: at most LOOKAHEAD bitmaps alive (§6 rule 4).
// - Time-based: a slow decoder skips frames instead of slowing the clip down.
// Docs: MDN createImageBitmap + ImageBitmap.close(), gsap.com ticker.

type Ticker = { add: (fn: () => void) => void; remove: (fn: () => void) => void };

const LOOKAHEAD = 8;
const MAX_IN_FLIGHT = 3;
const FETCHERS = 4;

export const clipAFrame = (dev: "d" | "m", i: number) =>
  `/media/clips/a/${dev}/${String(i).padStart(3, "0")}.webp`;

/** All frames of clip A as blobs (compressed: ~0.5 MB phone, ~1 MB desktop). */
export async function loadClipA(dev: "d" | "m", count: number, signal: AbortSignal): Promise<Blob[]> {
  const blobs: Blob[] = new Array(count);
  let next = 0;
  const worker = async () => {
    while (next < count) {
      const i = next++;
      const res = await fetch(clipAFrame(dev, i + 1), { signal, priority: "low" } as RequestInit);
      if (!res.ok) throw new Error(`clip A frame ${i + 1}: ${res.status}`);
      blobs[i] = await res.blob();
    }
  };
  await Promise.all(Array.from({ length: FETCHERS }, worker));
  return blobs;
}

export type Playback = {
  /** Jump to the last frame (drawn as soon as it is decoded). */
  finish: () => void;
  /** Stop without drawing anything more. */
  cancel: () => void;
};

const sineInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export function playFrames(
  blobs: Blob[],
  paint: (frame: ImageBitmap) => void,
  ticker: Ticker,
  { duration, onEnd }: { duration: number; onEnd: () => void },
): Playback {
  const n = blobs.length;
  const last = n - 1;
  const ready = new Map<number, ImageBitmap>();
  let shown = -1;
  let target = 0;
  let next = 0;
  let inFlight = 0;
  let t0 = -1;
  let rush = false;
  let lastFailed = false;
  let dead = false;

  const pump = () => {
    while (!dead && inFlight < MAX_IN_FLIGHT && next <= last && next <= Math.max(shown, target) + LOOKAHEAD) {
      if (next < target) next = target; // frames already late are never decoded
      const k = next++;
      inFlight++;
      createImageBitmap(blobs[k])
        .then(
          (bmp) => (dead || k <= shown ? bmp.close() : ready.set(k, bmp)),
          () => {
            if (k === last) lastFailed = true;
          },
        )
        .finally(() => {
          inFlight--;
          pump();
        });
    }
  };

  const stop = () => {
    dead = true;
    ticker.remove(tick);
    for (const bmp of ready.values()) bmp.close();
    ready.clear();
  };

  function tick() {
    if (t0 < 0) {
      if (!ready.has(0) && !rush) return; // the clock starts on the first decoded frame
      t0 = performance.now();
    }
    const lin = rush ? 1 : Math.min(1, (performance.now() - t0) / (duration * 1000));
    target = Math.round(sineInOut(lin) * last);
    let best = -1;
    for (const k of ready.keys()) if (k <= target && k > best) best = k;
    if (best > shown) {
      paint(ready.get(best)!); // the canvas keeps the pixels: close right away
      shown = best;
    }
    for (const [k, bmp] of ready) {
      if (k <= shown) {
        bmp.close();
        ready.delete(k);
      }
    }
    if (shown === last || (lastFailed && target === last)) {
      stop();
      onEnd();
      return;
    }
    pump();
  }

  pump();
  ticker.add(tick);
  return {
    finish() {
      rush = true;
      target = last;
      pump();
    },
    cancel: stop,
  };
}
