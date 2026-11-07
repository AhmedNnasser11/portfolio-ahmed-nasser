// Chapter 0 — the intro reel as ONE GSAP timeline (CLAUDE.md §1, §6 rule 12b).
// Loaded with import() after first paint, so GSAP never reaches the initial bundle.
// transform/opacity only; stroke-dashoffset only on small SVG strokes.
// Docs: gsap.com Timeline (position parameter, revert, progress), "Most common
// GSAP mistakes" (fromTo for replayable states, set SVG transforms with GSAP),
// web.dev "High-performance animations".
import { gsap } from "gsap";
import { SCENES_HTML } from "./scenes-html";

export type IntroCtrl = {
  /** Jump to the end state (hero settled), without firing onComplete. */
  finish: () => void;
  /** Revert every inline style and play again from 0. */
  replay: () => void;
};

// Scene starts and durations (s), same as P5: S1 2.5, S2 1.8, S3 2.6, S4 2.4.
const START = [0, 2.5, 4.3, 6.9] as const;
const DUR = [2.5, 1.8, 2.6, 2.4] as const;
const OUT = 9.3;
const EXIT = { opacity: 0, y: -14, duration: 0.2, ease: "power2.in" } as const;

export function playIntro(onDone: () => void): IntroCtrl {
  let { tl, steps } = build(onDone);
  // S1 starts now; the S2–S4 markup, each scene and the outro are added one task each (no long task,
  // TBT), long before the playhead reaches them.
  let timer = 0;
  steps.shift()!();
  const next = () => {
    const step = steps.shift();
    if (!step) return;
    step();
    timer = window.setTimeout(next, 16);
  };
  timer = window.setTimeout(next, 16);
  const buildAll = () => {
    window.clearTimeout(timer);
    while (steps.length) steps.shift()!();
  };
  return {
    finish() {
      buildAll();
      tl.progress(1, true).pause();
    },
    replay() {
      buildAll();
      tl.revert();
      ({ tl, steps } = build(onDone));
      buildAll();
    },
  };
}

function build(onDone: () => void): { tl: gsap.core.Timeline; steps: Array<() => void> } {
  const root = document.getElementById("intro")!;
  const $ = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));

  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: onDone });
  // Fix the length up front: later scenes are added while it already plays.
  tl.set({}, {}, OUT + 1);
  const steps: Array<() => void> = [];
  const scene = (i: number) => root.querySelectorAll<HTMLElement>(".intro-scene")[i];
  // Scene i: shown at its cut (S2–S4 start visibility:hidden in CSS), and a
  // slow camera push-in while on screen (scale 1 → 1.04).
  const enter = (i: number) => {
    const el = scene(i);
    if (i > 0) tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, START[i] - 0.08);
    tl.fromTo(el.firstElementChild, { scale: 1 }, { scale: 1.04, duration: DUR[i] + 0.3, ease: "sine.inOut" }, START[i]);
  };

  steps.push(() => {
    // Story bars.
    $$(".intro-bar > span").forEach((bar, i) =>
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: DUR[i], ease: "none" }, START[i]),
    );

    // ---------- S1: grid lines draw a frame, sweep under DEVELOPER, pin drops on Cairo
    const s1 = scene(0);
    enter(0);
    tl.fromTo($$(".gl-h"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, stagger: 0.12, ease: "power2.inOut" }, 0.1);
    tl.fromTo($$(".gl-v"), { scaleY: 0 }, { scaleY: 1, duration: 0.55, stagger: 0.12, ease: "power2.inOut" }, 0.3);
    tl.fromTo($(".intro-sweep"), { "--sweep": 0 }, { "--sweep": 1, duration: 0.6, ease: "power2.out" }, 0.65);
    tl.fromTo($(".s1-pin"), { y: -36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, 0.95);
    // Match cut: text leaves, the frame scales up and stays as S2's background grid.
    tl.to(s1.querySelectorAll("[data-t]"), EXIT, START[1] - 0.2);
    tl.to($(".s1-frame"), { scale: 1.9, opacity: 0.22, duration: 0.6, ease: "power2.inOut" }, START[1] - 0.25);
    tl.to($(".s1-frame"), { opacity: 0, duration: 0.3, ease: "power1.in" }, START[2] - 0.25);
    tl.set(s1, { autoAlpha: 0 }, START[2]);
  });

  // S2–S4 are not server-rendered (scenes-html.ts): insert them once, in their own task.
  steps.push(() => {
    if (!root.querySelector(".s2")) $(".intro-facts").insertAdjacentHTML("beforebegin", SCENES_HTML);
  });

  steps.push(() => {
    // ---------- S2: the Engine gauge fills in four steps with the 1 → 4 counter
    const s2 = START[1];
    enter(1);
    const ring = $<SVGCircleElement>(".ring-fill");
    tl.fromTo($(".s2-gauge"), { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.3 }, s2 - 0.05);
    tl.fromTo(ring, { strokeDashoffset: 1 }, { strokeDashoffset: 0.75, duration: 0.25, ease: "power2.out" }, s2 + 0.1);
    for (let i = 1; i <= 3; i++) {
      const at = s2 + 0.3 + (i - 1) * 0.26;
      tl.to($(".odo > span"), { yPercent: -25 * i, duration: 0.2, ease: "power2.out" }, at);
      tl.to(ring, { strokeDashoffset: 1 - (i + 1) / 4, duration: 0.24, ease: "power2.out" }, at);
    }
    tl.fromTo($$(".s2 .ml > span"), { yPercent: 105 }, { yPercent: 0, duration: 0.5, stagger: 0.09 }, s2 + 0.2);
    // Match cut: number + lines leave; the ring blows up into S3's frame.
    tl.to([$(".intro-years"), $(".s2 .intro-lines")], EXIT, START[2] - 0.2);
    tl.to($(".s2-ring"), { scale: 1.7, opacity: 0, duration: 0.45, ease: "power2.in" }, START[2] - 0.25);
    tl.set(scene(1), { autoAlpha: 0 }, START[2] + 0.25);
  });

  steps.push(() => {
    // ---------- S3: each chip draws as a dashed wireframe, then fills, one after another
    const s3 = START[2];
    enter(2);
    tl.fromTo($(".s3-frame"), { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, s3 - 0.1);
    tl.fromTo($(".s3-label"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25 }, s3 + 0.05);
    $$(".ichip").forEach((chip, i) => {
      const at = s3 + 0.25 + i * 0.42;
      const wire = chip.querySelector("svg")!;
      tl.fromTo(wire, { opacity: 0 }, { opacity: 1, duration: 0.08 }, at);
      tl.fromTo(wire.firstElementChild, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.3, ease: "power1.inOut" }, at);
      tl.fromTo(chip.querySelector(".ichip-ghost"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, at + 0.05);
      tl.fromTo(
        chip.querySelector(".ichip-fill"),
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 0.24, ease: "back.out(2.2)" },
        at + 0.3,
      );
      tl.to([wire, chip.querySelector(".ichip-ghost")], { opacity: 0, duration: 0.15 }, at + 0.42);
    });
    // Match cut: chips leave; the frame grows into S4's dashboard panel.
    tl.to([$(".s3-label"), $(".intro-chips")], EXIT, START[3] - 0.2);
    tl.to($(".s3-frame"), { scale: 1.3, opacity: 0, duration: 0.4, ease: "power2.in" }, START[3] - 0.25);
    tl.set(scene(2), { autoAlpha: 0 }, START[3] + 0.2);
  });

  steps.push(() => {
    // ---------- S4: bars grow, shield draws, a line joins Egypt and KSA
    const s4 = START[3];
    enter(3);
    tl.fromTo($(".s4-panel"), { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, s4 - 0.1);
    tl.fromTo($$(".s4 .ml > span"), { yPercent: 105 }, { yPercent: 0, duration: 0.5, stagger: 0.12 }, s4 + 0.05);
    tl.fromTo(
      $$(".s4-bars rect"),
      { scaleY: 0, transformOrigin: "50% 100%" },
      { scaleY: 1, duration: 0.45, stagger: 0.07, ease: "back.out(1.6)" },
      s4 + 0.3,
    );
    tl.fromTo($(".s4-shield"), { scale: 0.5, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, s4 + 0.45);
    tl.fromTo($(".s4-shield .hex"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" }, s4 + 0.45);
    tl.fromTo($(".s4-shield .tick"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.25 }, s4 + 0.85);
    tl.fromTo($(".s4-map"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, s4 + 0.75);
    tl.fromTo(
      $$(".map-dot"),
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1, duration: 0.3, stagger: 0.12, ease: "back.out(2.5)" },
      s4 + 0.8,
    );
    tl.fromTo($(".map-line"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, s4 + 0.95);
  });

  steps.push(() => {
    // ---------- Outro: shapes collapse into the hero laptop, the hero settles
    tl.to([$(".s4 .intro-lines"), $(".intro-facts"), $(".intro-bars")], EXIT, OUT);
    tl.set($$(".s4 .ml"), { overflow: "visible" }, OUT); // the bars and shield fly out of their lines
    const laptop = document.getElementById("hero-laptop");
    const shapes = [$(".s4-panel"), $(".s4-bars"), $(".s4-shield"), $(".s4-map")];
    // Function values are read when the outro starts, so they use the live layout.
    const toLaptop = (axis: "x" | "y") => (_: number, el: Element) => {
      if (!laptop) return 0;
      const a = el.getBoundingClientRect();
      const b = laptop.getBoundingClientRect();
      if (axis === "x") return b.left + b.width / 2 - (a.left + a.width / 2);
      const ty = Math.min(b.top + b.height / 2, window.innerHeight - 40);
      return ty - (a.top + a.height / 2);
    };
    tl.to(
      shapes,
      { x: toLaptop("x"), y: toLaptop("y"), scale: 0.2, opacity: 0, duration: 0.6, stagger: 0.04, ease: "power3.in" },
      OUT + 0.05,
    );
    tl.to($(".intro-bg"), { opacity: 0, duration: 0.5, ease: "power1.inOut" }, OUT + 0.2);
    const settle = document.querySelectorAll("#top > div:first-child > *, #hero-laptop");
    tl.fromTo(
      settle,
      { y: 16 },
      { y: 0, duration: 0.55, stagger: 0.035, ease: "power3.out", immediateRender: false, clearProps: "transform" },
      OUT + 0.3,
    );
  });
  return { tl, steps };
}
