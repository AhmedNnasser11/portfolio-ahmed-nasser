// Scroll stage engine (chapters 2–4). Loaded with import() after load + idle,
// so GSAP, ScrollTrigger and Lenis never reach the initial bundle.
// Docs: gsap.com ScrollTrigger + ScrollTrigger.config (ignoreMobileResize),
// Lenis README (GSAP ScrollTrigger sync), MDN canvas optimisation,
// CLAUDE.md §6 rules 3–9.
import manifest from "@/public/media/manifest.json";
import { BitmapWindow } from "./bitmap-window";
import type { Tier } from "./device-tier";

export type StageHandle = { destroy: () => void };
type ActiveTier = Exclude<Tier, "static">;
type Clip = "a" | "b" | "c" | "d";

// Scroll progress map (CLAUDE.md §1): B 0–33 % (Teardown), hold 33–88 % (Inspect), D 88–100 %.
// Clip A is not on the scroll: it plays once in the hero (features/hero/open-clip.ts),
// and B starts from its last frame (K2).
const B_END = 0.33;
const WARM_REST = 0.15; // past this, warm C and D
const HOLD_END = 0.88;
const STEP = (HOLD_END - B_END) / 6;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const px = (el: Element | null) => (el instanceof HTMLElement ? el.offsetHeight : 0);

export async function startStage(root: HTMLElement, tier: ActiveTier): Promise<StageHandle> {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const cleanups: Array<() => void> = [];
  const header = document.querySelector("header.sticky");
  const tabbar = document.querySelector('nav[aria-label="Sections"]');

  // Lenis: desktop only (§6 rule 8), synced to ScrollTrigger per the Lenis README.
  let lenis: import("lenis").default | undefined;
  let wheelGate: ((dy: number, e: Event) => boolean) | undefined;
  if (tier === "desktop") {
    const { default: Lenis } = await import("lenis");
    // The wheel gate (below, once the trigger exists) can take a wheel event
    // away from Lenis: returning false here skips Lenis' own smoothing.
    lenis = new Lenis({ virtualScroll: (d) => !wheelGate?.(d.deltaY, d.event) });
    const l = lenis;
    l.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // In-page anchors: one smooth scroll that stops under the sticky header.
    // (Lenis' own `anchors` option stacked with the native jump in testing.)
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#"]');
      const id = a?.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      // Absolute target from the live layout (not Lenis' element lookup, which was off in testing).
      const target = () => el.getBoundingClientRect().top + window.scrollY - px(header) - 8;
      // content-visibility placeholders can change size on the way: re-settle at the end.
      l.scrollTo(Math.max(0, target()), {
        onComplete: () => {
          const y = target();
          if (Math.abs(y - window.scrollY) > 4) l.scrollTo(Math.max(0, y), { immediate: true });
        },
      });
      history.pushState(null, "", `#${id}`);
    };
    document.addEventListener("click", onAnchor);
    // Demos are modal: pause smooth scroll while one is open.
    const stop = () => l.stop();
    const start = () => l.start();
    document.addEventListener("demo:open", stop);
    document.addEventListener("demo:close", start);
    cleanups.push(() => {
      document.removeEventListener("click", onAnchor);
      document.removeEventListener("demo:open", stop);
      document.removeEventListener("demo:close", start);
      gsap.ticker.remove(raf);
      l.destroy();
    });
  }

  let chapter = "";
  const setChapter = (p: number) => {
    const c = p < B_END ? "teardown" : p < HOLD_END ? "inspect" : "assemble";
    if (c !== chapter) root.dataset.chapter = chapter = c;
  };

  // Inspect (chapter 3): six steps across the hold. The engine only flips
  // data-state; CSS runs the enter/exit choreography (globals.css "Inspect").
  const panels = Array.from(root.querySelectorAll<HTMLElement>(".stage-panel"));
  const dots = Array.from(root.querySelectorAll<HTMLElement>(".stage-dot"));
  const spots = Array.from(root.querySelectorAll<HTMLElement>(".stage-hotspot"));
  const count = root.querySelector(".stage-count");
  let step = -2;
  const setStep = (p: number) => {
    const s = p < B_END ? -1 : p >= HOLD_END ? 6 : Math.min(5, Math.floor((p - B_END) / STEP));
    if (s === step) return;
    step = s;
    panels.forEach((el, i) => (el.dataset.state = i < s ? "past" : i === s ? "active" : "next"));
    const shown = Math.min(5, Math.max(0, s));
    dots.forEach((el, i) => el.toggleAttribute("aria-current", i === shown));
    spots.forEach((el, i) => el.toggleAttribute("data-active", i === shown));
    if (count) count.textContent = `Layer ${String(shown + 1).padStart(2, "0")} / 06`;
  };
  cleanups.push(() => panels.forEach((el) => delete el.dataset.state));

  const scene = tier === "low" ? posterScene(root) : canvasScene(root, tier, gsap);
  cleanups.push(scene.destroy);

  // The sticky stage is engaged between "wrapper top at header bottom" and
  // "wrapper bottom at tab bar top"; progress lives in a plain variable (no React state).
  const st = ScrollTrigger.create({
    trigger: root,
    start: () => `top ${px(header)}px`,
    end: () => `bottom ${window.innerHeight - px(tabbar)}px`,
    onUpdate: (self) => {
      setChapter(self.progress);
      setStep(self.progress);
      scene.onProgress(self.progress);
    },
  });
  setChapter(st.progress);
  setStep(st.progress);
  scene.onProgress(st.progress);
  cleanups.push(() => st.kill());
  // The hero laptop's ticker callback re-queues after Lenis (features/hero/laptop.ts).
  document.dispatchEvent(new Event("stage:ready"));

  // Inspect steps one layer per wheel gesture (desktop): free scrolling plus
  // Lenis momentum skipped layers (a flick landed on 02, a normal scroll on 04).
  // Entering the hold lands on the first / last layer; leaving it hands the
  // wheel back to Lenis. Keys, scrollbar and anchor links stay untouched.
  if (lenis) {
    const l = lenis;
    const yFor = (p: number) => st.start + p * (st.end - st.start);
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let lockUntil = 0;
    let lastT = 0;
    let lastAbs = 0;
    const glide = (y: number) => {
      lockUntil = performance.now() + 650;
      l.scrollTo(y, { duration: 0.6, easing: ease });
    };
    const goStep = (i: number) => glide(yFor(B_END + (i + 0.5) * STEP));
    wheelGate = (dy, e) => {
      if (e.type !== "wheel" || !dy || (e as WheelEvent).ctrlKey || l.isStopped) return false;
      if ((e.target as Element | null)?.closest?.("[data-lenis-prevent]")) return false;
      const now = performance.now();
      const abs = Math.abs(dy);
      // A new gesture: a pause before it, or a delta that is not decaying (trackpad inertia decays).
      const fresh = now - lastT > 120 || (abs >= lastAbs && abs >= 40);
      lastT = now;
      lastAbs = abs;
      const take = () => {
        if (e.cancelable) e.preventDefault();
        return true;
      };
      if (now < lockUntil) return take();
      const p = st.progress;
      const next = l.targetScroll + dy;
      if (p < B_END) {
        if (dy < 0 || next < yFor(B_END)) return false;
        goStep(0);
        return take();
      }
      if (p >= HOLD_END) {
        if (dy > 0 || next >= yFor(HOLD_END)) return false;
        goStep(5);
        return take();
      }
      if (!fresh) return take();
      const i = Math.min(5, Math.floor((p - B_END) / STEP)) + (dy > 0 ? 1 : -1);
      if (i < 0) glide(yFor(B_END) - 2);
      else if (i > 5) glide(yFor(HOLD_END) + 2);
      else goStep(i);
      return take();
    };
    cleanups.push(() => (wheelGate = undefined));
  }

  // Jump to a step (hotspots, progress dots): scroll to the middle of its slice.
  const onJump = (e: MouseEvent) => {
    const btn = (e.target as Element).closest?.<HTMLElement>("[data-jump]");
    if (!btn || !root.contains(btn)) return;
    const i = Number(btn.dataset.jump);
    const p = B_END + (i + 0.5) * STEP;
    const y = st.start + p * (st.end - st.start);
    // Hotspots also open a demo (modal, pauses Lenis): jump instantly behind it.
    const instant = btn.hasAttribute("data-demo");
    if (lenis) lenis.scrollTo(y, { immediate: instant });
    else window.scrollTo({ top: y, behavior: instant ? "instant" : "smooth" });
  };
  root.addEventListener("click", onJump);
  cleanups.push(() => root.removeEventListener("click", onJump));

  return {
    destroy: () => {
      for (const fn of cleanups.reverse()) fn();
      delete root.dataset.chapter;
    },
  };
}

type Scene = { onProgress: (p: number) => void; destroy: () => void };

/** Low tier: crossfade the K2 / K3 / K5 stills by progress (opacity only). */
function posterScene(root: HTMLElement): Scene {
  const k3 = root.querySelector<HTMLElement>('[data-poster="k3"] img');
  const k5 = root.querySelector<HTMLElement>('[data-poster="k5"] img');
  let o3 = -1;
  let o5 = -1;
  return {
    onProgress(p) {
      const n3 = p < B_END ? p / B_END : 1;
      const n5 = p < HOLD_END ? 0 : (p - HOLD_END) / (1 - HOLD_END);
      if (k3 && Math.abs(n3 - o3) > 0.004) k3.style.opacity = String((o3 = n3));
      if (k5 && Math.abs(n5 - o5) > 0.004) k5.style.opacity = String((o5 = n5));
    },
    destroy() {
      k3?.style.removeProperty("opacity");
      k5?.style.removeProperty("opacity");
    },
  };
}

/** Desktop / phone: canvas frame scrubbing with a sliding ImageBitmap window. */
function canvasScene(
  root: HTMLElement,
  tier: "desktop" | "phone",
  gsap: typeof import("gsap").gsap,
): Scene {
  const dev = tier === "desktop" ? "d" : "m";
  const order: Clip[] = tier === "desktop" ? ["b", "c", "d"] : ["b", "d"]; // no orbit on phones (§6 rule 9)
  const clips = manifest.clips as Record<string, Record<string, { count: number }>>;
  const frame = (c: Clip, i: number) => `/media/clips/${c}/${dev}/${String(i).padStart(3, "0")}.webp`;
  // Frame 0 is clip A's last frame: the exact file the hero laptop rests on (K2),
  // so the handoff lands on identical pixels; B's own first frame follows.
  const urls: string[] = [frame("a", clips.a[dev].count)];
  const seg = {} as Record<Clip, { start: number; n: number }>;
  for (const c of order) {
    const info = clips[c][dev];
    const start = c === "b" ? 0 : urls.length; // B's segment includes frame 0 (A's last)
    seg[c] = { start, n: urls.length - start + info.count };
    for (let i = 1; i <= info.count; i++) {
      urls.push(frame(c, i));
    }
  }

  const canvas = root.querySelector("canvas")!;
  const ctx = canvas.getContext("2d", { alpha: false })!;
  const win = new BitmapWindow(urls, tier === "desktop" ? 12 : 6); // ±12 desktop, ±6 phone (iOS memory)
  const dprCap = tier === "desktop" ? 2 : 1.5; // §6 rule 6

  let targetP = 0;
  let currentP = 0;
  let mouseTarget = 0;
  let mouse = 0;
  let center = -1;
  let drawn: ImageBitmap | null = null;

  const indexFor = (p: number) => {
    if (p < B_END) return seg.b.start + (p / B_END) * (seg.b.n - 1);
    if (p < HOLD_END) {
      if (!seg.c) return seg.b.start + seg.b.n - 1;
      // Mouse X orbits the stack (clip C); eased in/out at the hold edges so B → C → D never jumps.
      const w = clamp01(Math.min((p - B_END) / 0.04, (HOLD_END - p) / 0.04));
      return seg.c.start + mouse * w * (seg.c.n - 1);
    }
    return seg.d.start + ((p - HOLD_END) / (1 - HOLD_END)) * (seg.d.n - 1);
  };

  const draw = (bmp: ImageBitmap) => {
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.fillStyle = "#08090b";
    ctx.fillRect(0, 0, cw, ch);
    const s = Math.min(cw / bmp.width, ch / bmp.height); // contain: same geometry as the poster's object-fit
    const w = bmp.width * s;
    const h = bmp.height * s;
    ctx.drawImage(bmp, (cw - w) / 2, (ch - h) / 2, w, h);
    drawn = bmp;
    if (!canvas.dataset.ready) canvas.dataset.ready = "1";
  };

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    drawn = null; // force a redraw at the new size
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // One loop: the gsap ticker (§6 rule 6). Draw only when the frame changes.
  const tick = () => {
    currentP += (targetP - currentP) * 0.18;
    if (Math.abs(targetP - currentP) < 0.0004) currentP = targetP;
    mouse += (mouseTarget - mouse) * 0.1;
    const idx = Math.round(indexFor(currentP));
    if (idx !== center) win.setCenter((center = idx));
    const bmp = win.get(idx) ?? win.nearest(idx);
    if (bmp && bmp !== drawn) draw(bmp);
  };

  let running = false;
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      gsap.ticker.add(tick);
      running = true;
    } else if (!entry.isIntersecting && running) {
      gsap.ticker.remove(tick);
      running = false;
    }
  });
  io.observe(root);

  const onPointer = (e: PointerEvent) => {
    mouseTarget = clamp01(e.clientX / window.innerWidth);
  };
  if (seg.c) window.addEventListener("pointermove", onPointer, { passive: true });

  // Warm the HTTP cache one clip at a time, only as the visitor approaches it (§6 rule 5).
  const ac = new AbortController();
  const warmed = new Set<Clip>();
  const warm = async (c: Clip) => {
    if (!seg[c] || warmed.has(c)) return;
    warmed.add(c);
    for (let i = 0; i < seg[c].n && !ac.signal.aborted; i++) {
      try {
        await fetch(urls[seg[c].start + i], { signal: ac.signal, priority: "low" } as RequestInit);
      } catch {
        return;
      }
    }
  };
  warm("b");

  return {
    onProgress(p) {
      targetP = p;
      if (p > WARM_REST) {
        warm("c");
        warm("d");
      }
    },
    destroy() {
      ac.abort();
      io.disconnect();
      ro.disconnect();
      if (running) gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointer);
      win.destroy();
      delete canvas.dataset.ready;
    },
  };
}
