// Hero laptop motion (chapter 1). Loaded with import() after load + idle by
// StageBoot, so none of it is in the initial bundle or the load window.
// - draws K1 (closed) on the hero <canvas> (not an LCP candidate), then plays
//   clip A once after the intro so it rests open on K2 (open-clip.ts).
//   Reduced motion and low-end phones: K2 still only.
// - idle float (translateY ±6 px, 4 s) and desktop parallax tilt (≤ 6°, lerped)
// - scroll handoff: from scrollY 0 to the moment the stage engages, .lap-move
//   moves and scales onto the stage's first frame (the same K2 frame file), then
//   the stage takes over, so clip B starts from the exact hero frame (no jump)
// One loop on the gsap.ticker (§6 rule 6), paused off-screen and in hidden tabs.
// Docs: web.dev animations guide (transform/opacity only), MDN
// IntersectionObserver + Page Visibility, gsap.com ticker.
import manifest from "@/public/media/manifest.json";
import type { Tier } from "@/features/stage/device-tier";
import { loadClipA, playFrames, type Playback } from "./open-clip";

type Dev = "d" | "m";
type Variant = { dev: Dev; x0: number; w: number; h: number; aspect: number; fw: number; fh: number };

// Both frame sets come from the same 1928×1076 source (scripts/media.sh):
// desktop = full frame; phone = crop x 320–1600, full height.
// fw × fh: the encoded frame / poster size.
const D: Variant = { dev: "d", x0: 0, w: 1928, h: 1076, aspect: 1600 / 892, fw: 1600, fh: 892 };
const M: Variant = { dev: "m", x0: 320, w: 1280, h: 1076, aspect: 720 / 606, fw: 720, fh: 606 };
const poster = (name: "k1" | "k2", v: Variant) => `/media/posters/${name}-${v.dev}.avif`;

const OPEN_DURATION = 1.5; // s, clip A played once by time

const FLOAT_PX = 6;
const FLOAT_PERIOD = 4; // s
const TILT_DEG = 6;

export type LaptopHandle = { destroy: () => void };

export async function startHeroLaptop(tier: Tier): Promise<LaptopHandle | undefined> {
  const wrap = document.getElementById("hero-laptop");
  const move = wrap?.querySelector<HTMLElement>(".lap-move");
  const canvas = wrap?.querySelector("canvas");
  const hero = document.getElementById("top");
  if (!wrap || !move || !canvas || !hero) return;

  // The hero box follows the CSS breakpoint (48rem); the stage draws the
  // tier's frames (desktop tier: d; phone tier: m; low tier: the <picture>).
  // The hero canvas draws the stage's frame set inside its box, at its source
  // position, so the handoff lands on identical pixels even when they differ
  // (768–1023 px: desktop-shaped box, phone frames).
  const wide = matchMedia("(min-width: 48rem)").matches;
  const heroV = wide ? D : M;
  const stageV = tier === "desktop" ? D : tier === "phone" ? M : wide ? D : M;

  // Reduced motion and low-end phones: the open laptop (K2) as a still image, no clip A.
  const still = tier === "static" || tier === "low";
  const first = await decodeImage(poster(still ? "k2" : "k1", stageV));
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!first || !ctx) return;
  // The frames' native resolution: stays sharp while the handoff scales it up.
  const cpx = stageV.fh / stageV.h; // canvas px per source px
  canvas.width = heroV === stageV ? stageV.fw : Math.round(heroV.w * cpx);
  canvas.height = stageV.fh;
  const ox = Math.round((stageV.x0 - heroV.x0) * cpx);
  ctx.fillStyle = "#08090b"; // page background where the frame doesn't reach
  if (canvas.width !== stageV.fw) {
    // The edge fade (globals.css --frame-fade) follows the frame rect, as on the stage.
    canvas.style.setProperty("--fade-w", `${(stageV.fw / canvas.width) * 100}%`);
    canvas.style.setProperty("--fade-x", `${(ox / (canvas.width - stageV.fw)) * 100}%`);
  }
  const paint = (src: CanvasImageSource) => {
    if (ox !== 0) ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(src, ox, 0, stageV.fw, stageV.fh);
  };
  paint(first);
  canvas.dataset.ready = "1";
  // data-open: the lid sweep and the dots belong to the open laptop (CSS).
  const setOpen = (open: boolean) => wrap.toggleAttribute("data-open", open);
  if (still) setOpen(true);

  if (tier === "static") return { destroy() {} }; // reduced motion: still image only, no GSAP
  const { gsap } = await import("gsap"); // already loaded by the intro in most visits

  const stage = document.getElementById("layers");
  const media = stage?.querySelector<HTMLElement>(".stage-media");
  const header = document.querySelector<HTMLElement>("header.sticky");
  const tilt = matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

  // ---- geometry (document coordinates), measured on setup and on resize
  let yStart = 1;
  let dx = 0;
  let dy = 0;
  let k = 1;
  let boxW = 0;
  let boxH = 0;
  const measure = () => {
    if (!stage || !media) return;
    const sy = window.scrollY;
    // .hero-laptop is never moved by the loop; only the intro's settle (y) may be mid-tween.
    const r = wrap.getBoundingClientRect();
    const settleY = new DOMMatrixReadOnly(getComputedStyle(wrap).transform).m42;
    const h = { left: r.left, top: r.top - settleY, width: r.width };
    boxW = h.width;
    boxH = h.width / heroV.aspect;
    const s = stage.getBoundingClientRect();
    const stageTop = s.top + sy;
    yStart = Math.max(1, stageTop - (header?.offsetHeight ?? 0));
    // Stage frame: contain-fit of the stage variant in the sticky media box at progress 0.
    const mw = media.offsetWidth;
    const mh = media.offsetHeight;
    const fitW = Math.min(mw, mh * stageV.aspect);
    const imgLeft = s.left + (mw - fitW) / 2;
    const imgTop = stageTop + (mh - fitW / stageV.aspect) / 2;
    const rs = fitW / stageV.w; // stage px per source px
    const rh = boxW / heroV.w; // hero px per source px
    k = rs / rh;
    dx = imgLeft - h.left + (heroV.x0 - stageV.x0) * rs;
    dy = imgTop - (h.top + sy);
  };
  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(hero);
  if (stage) ro.observe(stage);

  // ---- pointer tilt (desktop, fine pointer only)
  let tx = 0;
  let ty = 0;
  let rx = 0;
  let ry = 0;
  const onPointer = (e: PointerEvent) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2 * TILT_DEG; // rotateY
    ty = -(e.clientY / window.innerHeight - 0.5) * 2 * TILT_DEG; // rotateX
  };
  if (tilt) window.addEventListener("pointermove", onPointer, { passive: true });

  // ---- clip A: closed (K1) → opens once by time after the intro → open (K2)
  const html = document.documentElement;
  let state: "closed" | "playing" | "open" = still ? "open" : "closed";
  let blobs: Blob[] | null = null;
  let k2: HTMLImageElement | null = null; // fallback if the visitor scrolls before the frames arrive
  let playback: Playback | null = null;
  const ac = new AbortController();
  const maybePlay = () => {
    if (state !== "closed" || html.dataset.intro !== "done") return;
    const moving = progress() > 0; // the handoff has started: no time to play, show K2 now
    if (blobs) {
      if (document.hidden) return; // sync() calls again when the tab is visible
      state = "playing";
      playback = playFrames(blobs, paint, gsap.ticker, {
        duration: OPEN_DURATION,
        onEnd: () => {
          state = "open";
          playback = null;
          setOpen(true);
        },
      });
      if (moving) playback.finish();
    } else if (moving && k2) {
      paint(k2);
      state = "open";
      setOpen(true);
    }
  };
  if (!still) {
    decodeImage(poster("k2", stageV)).then((img) => (k2 = img));
    const count = manifest.clips.a[stageV.dev].count;
    loadClipA(stageV.dev, count, ac.signal)
      .then((b) => {
        blobs = b;
        maybePlay();
      })
      .catch(() => {}); // stays on K1 until the visitor scrolls (then K2 from the poster)
  }
  // Intro replay closes the laptop again (only at rest); "done" plays clip A.
  const onIntro = () => {
    if (html.dataset.intro === "playing" && state !== "closed" && !still && progress() === 0) {
      playback?.cancel();
      playback = null;
      paint(first);
      state = "closed";
      setOpen(false);
    }
    maybePlay();
  };
  const mo = new MutationObserver(onIntro);
  mo.observe(html, { attributes: true, attributeFilter: ["data-intro"] });

  // ---- the loop
  let handed: boolean | null = null;
  let fade = -1;
  const t0 = performance.now();
  const render = (e: number) => {
    const done = e >= 1;
    if (e > 0 && state === "closed") maybePlay();
    if (done && state === "playing") playback?.finish(); // the stage shows K2 from here on
    if (done !== handed) {
      handed = done;
      move.style.opacity = done ? "0" : "";
      if (done) move.style.removeProperty("transform"); // hidden: no scaled box left behind
      if (stage) stage.dataset.handoff = done ? "stage" : "hero";
    }
    // Teaser dots + link fade out as soon as the handoff starts.
    const f = Math.max(0, 1 - e * 4);
    if (Math.abs(f - fade) > 0.01 || (f === 0 && fade !== 0)) {
      wrap.style.setProperty("--teaser", String((fade = f)));
    }
    if (done) return;
    const free = 1 - e;
    const time = (performance.now() - t0) / 1000;
    const floatY = Math.sin((time / FLOAT_PERIOD) * Math.PI * 2) * FLOAT_PX * free;
    rx += (ty * free - rx) * 0.08;
    ry += (tx * free - ry) * 0.08;
    const s = 1 + (k - 1) * e;
    let t = `translate3d(${(dx * e).toFixed(2)}px,${(dy * e + floatY).toFixed(2)}px,0) scale(${s.toFixed(4)})`;
    if (tilt) {
      const cx = boxW / 2;
      const cy = boxH / 2;
      t += ` translate(${cx}px,${cy}px) perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate(${-cx}px,${-cy}px)`;
    }
    move.style.transform = t;
  };
  const progress = () => {
    const t = Math.min(1, Math.max(0, window.scrollY / yStart));
    return t * t * (3 - 2 * t); // smoothstep: leaves gently, lands gently
  };
  const tick = () => render(progress());

  // Run only while the hero is on screen and the tab is visible.
  let onScreen = false;
  let running = false;
  const sync = () => {
    maybePlay();
    const want = onScreen && !document.hidden;
    if (want && !running) gsap.ticker.add(tick);
    if (!want && running) gsap.ticker.remove(tick);
    running = want;
    wrap.toggleAttribute("data-paused", !want);
    if (!want) render(progress()); // e.g. a fast fling past the hero: land in the final state
  };
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(hero);
  document.addEventListener("visibilitychange", sync);
  // Lenis (desktop) scrolls inside the gsap ticker: run after it, not a frame behind.
  const requeue = () => {
    if (!running) return;
    gsap.ticker.remove(tick);
    gsap.ticker.add(tick);
  };
  document.addEventListener("stage:ready", requeue);

  return {
    destroy() {
      ac.abort();
      mo.disconnect();
      playback?.cancel();
      io.disconnect();
      ro.disconnect();
      if (running) gsap.ticker.remove(tick);
      document.removeEventListener("visibilitychange", sync);
      document.removeEventListener("stage:ready", requeue);
      window.removeEventListener("pointermove", onPointer);
      move.style.removeProperty("transform");
      move.style.removeProperty("opacity");
      wrap.style.removeProperty("--teaser");
      if (stage) delete stage.dataset.handoff;
    },
  };
}

async function decodeImage(src: string): Promise<HTMLImageElement | null> {
  const img = new Image();
  img.src = src;
  try {
    await img.decode();
    return img;
  } catch {
    return null;
  }
}
