// Hero laptop motion (chapter 1). Loaded with import() after load + idle by
// StageBoot, so none of it is in the initial bundle or the load window.
// - draws K1 on the hero <canvas> (not an LCP candidate)
// - idle float (translateY ±6 px, 4 s) and desktop parallax tilt (≤ 6°, lerped)
// - scroll handoff: from scrollY 0 to the moment the stage engages, .lap-move
//   moves and scales onto the stage's first frame (same source frame), then the
//   stage takes over, so clip A starts from the exact hero frame (no jump)
// One loop on the gsap.ticker (§6 rule 6), paused off-screen and in hidden tabs.
// Docs: web.dev animations guide (transform/opacity only), MDN
// IntersectionObserver + Page Visibility, gsap.com ticker.
import type { Tier } from "@/features/stage/device-tier";

type Variant = { src: string; x0: number; w: number; h: number; aspect: number };

// Both frame sets come from the same 1928×1076 source (scripts/media.sh):
// desktop = full frame; phone = crop x 320–1600, full height.
const D: Variant = { src: "/media/posters/k1-d.avif", x0: 0, w: 1928, h: 1076, aspect: 1600 / 892 };
const M: Variant = { src: "/media/posters/k1-m.avif", x0: 320, w: 1280, h: 1076, aspect: 720 / 606 };

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
  const wide = matchMedia("(min-width: 48rem)").matches;
  const heroV = wide ? D : M;
  const stageV = tier === "desktop" ? D : tier === "phone" ? M : wide ? D : M;

  const img = new Image();
  img.src = heroV.src;
  try {
    await img.decode();
  } catch {
    return;
  }
  // Native resolution: stays sharp while the handoff scales it up (up to the stage size).
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  canvas.getContext("2d", { alpha: false })?.drawImage(img, 0, 0);
  canvas.dataset.ready = "1";

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

  // ---- the loop
  let handed: boolean | null = null;
  let fade = -1;
  const t0 = performance.now();
  const render = (e: number) => {
    const done = e >= 1;
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
