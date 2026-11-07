import { profile } from "@/content/profile";

// Scenes 2–4 of the intro reel. They only ever show while the GSAP timeline
// runs, so they are not server-rendered: keeping them out of the HTML and the
// RSC payload saves hydration and font-swap layout work on phones (TBT, P7).
// Static constants only (no user input), inserted once by intro-timeline.ts.

// Dashed wireframe that can also "draw": 14 dashes fill pathLength 100, then a
// 100-long gap. stroke-dashoffset 100 → 0 reveals the dashes from the path start.
const WIRE_DASH = `${"4.4 2.74 ".repeat(14)}0 100`;

const chips = profile.coreStack
  .map(
    (s) =>
      `<li class="ichip"><svg class="ichip-wire"><rect width="100%" height="100%" rx="22" pathLength="100" stroke-dasharray="${WIRE_DASH}"/></svg><span class="ichip-ghost">${s}</span><span class="ichip-fill">${s}</span></li>`,
  )
  .join("");

const ticks = [0, 90, 180, 270]
  .map((a) => `<line x1="100" y1="2" x2="100" y2="14" transform="rotate(${a} 100 100)"/>`)
  .join("");

const bars = [10, 16, 12, 22]
  .map((h, i) => `<rect x="${i * 7 + 1}" y="${24 - h}" width="5" height="${h}" rx="1"/>`)
  .join("");

export const SCENES_HTML = `
<div class="intro-scene s2"><div class="intro-cam">
  <div class="s2-gauge">
    <svg class="s2-ring" viewBox="0 0 200 200"><circle class="ring-track" cx="100" cy="100" r="92"/><circle class="ring-fill" cx="100" cy="100" r="92" pathLength="1" transform="rotate(-90 100 100)"/>${ticks}</svg>
    <p class="intro-years">4+</p>
  </div>
  <p class="intro-lines"><span class="ml"><span>years shipping</span></span><span class="ml"><span>production frontends</span></span></p>
</div></div>
<div class="intro-scene s3"><div class="intro-cam">
  <div class="s3-box">
    <div class="s3-frame"></div>
    <p class="mono-label s3-label">Core stack</p>
    <ul class="intro-chips">${chips}</ul>
  </div>
</div></div>
<div class="intro-scene s4"><div class="intro-cam">
  <div class="s4-box">
    <div class="s4-panel"></div>
    <p class="intro-lines">
      <span class="ml"><span>Enterprise SaaS <span class="nw"><span class="grad">dashboards</span><svg class="s4-bars" viewBox="0 0 28 24">${bars}</svg></span></span></span>
      <span class="ml"><span>Performance · <svg class="s4-shield" viewBox="0 0 24 26"><path class="hex" d="M12 1.5 22 7.25v11.5L12 24.5 2 18.75V7.25Z" pathLength="1"/><path class="tick" d="m7.5 13 3 3 6-6.5" pathLength="1"/></svg>Security</span></span>
      <span class="ml"><span class="intro-small">for clients in Saudi Arabia &amp; Egypt</span></span>
    </p>
    <svg class="s4-map" viewBox="0 0 240 46"><path class="map-line" d="M24 30Q120 -6 216 30" pathLength="1"/><circle class="map-dot" cx="24" cy="30" r="4.5"/><circle class="map-dot" cx="216" cy="30" r="4.5"/><text x="24" y="45" text-anchor="middle">EGYPT</text><text x="216" y="45" text-anchor="middle">KSA</text></svg>
  </div>
</div></div>`;
