# STATUS — handover

> Read this first in every new session, then `docs/PLAN.md`, then `CLAUDE.md`.
> Update it at the end of every session: phase, what was done, what's next, credits.

**Last updated:** 2026-11-07
**Current phase:** P1–P8 committed, P7 TBT follow-up done (DevTools TBT 140–160 ms). **Left: real-device test, P9, P10.**
**Branch:** `feat/portfolio`. Commit only when Ahmed asks.

---

## Done
- [x] P1 plan written and reviewed by two subagents:
  - architecture, performance and security (Opus, high)
  - spec and fact check (Sonnet, medium)
- [x] Reviewer findings folded in → `docs/PLAN.md`.
- [x] Facts checked against `public/Ahmed_Nasser_Frontend_Developer_CV.pdf`. The wording fixes are in PLAN §8.
- [x] Plan approved: Ahmed said "start build" (2026-11-07).
- [x] **P2 built, reviewed and approved by Ahmed, committed** (2026-11-07). Static RSC page:
  - sticky header. Phones: slim (name · title, thin stack line, "CV" button labelled "Download CV" ≥ 400px). md+: top nav
  - **phone bottom tab bar** (`features/header/TabBar.tsx`, < md): Home/Skills/Experience/Work/Contact, icon + label, 64px + `env(safe-area-inset-bottom)`, solid bg + top border, plain anchors (works with JS off), IntersectionObserver sets `aria-current="page"`
  - hero with an SVG K1 placeholder
  - stage with an SVG K3 placeholder, the 6 layer panels as a list, and the reassemble line
  - full stack, experience, selected work (text cards), open source, contact
  - `content/*.ts` (PLAN §8 wording); tokens in `@theme`
  - CSP without nonces + SRI (`integrity=` on every chunk) + security headers
  - metadata, JSON-LD Person+WebSite, sitemap, robots, `public/llms.txt`

## Decisions (do not re-ask)
| Topic | Decision |
|---|---|
| Intro reel | Plays on **every visit**; the page stays fully static |
| Selected work | **Text-only cards** for now. Screenshots arrive later in `assets-src/screens/` (≤ 120 KB each) |
| Low-end tier | **Static K1/K3/K5 crossfade**. No H.264 video, so no `-g 1` encode |
| Higgsfield access | **CLI** (`higgsfield` 1.2.2), not the MCP |
| Higgsfield credits | 110 now (Lite plan). Credits refresh **monthly** on the billing date, not daily, and don't roll over. Packs need an active subscription and expire after 90 days. **Spend the 110 on K1–K5 only.** Clips B → A → D → C come later (pack or next billing date) |
| Instagram | **One reel only** (Reel 1: screen recording + Remotion, 0 credits). Reel 2 (Marketing Studio) is dropped |
| CSP | "Without Nonces" CSP + `experimental.sri` + extra headers. Never call it "strict CSP" in the copy |
| Stage | **Sticky** stage (not a GSAP `pin`); progress lives in a ref |
| JS budget | Measure **initial JS as brotli** (budget 150 KB). Framework floor accepted: 148.0 KB brotli. **GSAP + Lenis load after first paint** (dynamic `import()` / `requestIdleCallback`), never in the initial bundle |
| TBT | OK to fix in P7, but **P7 must get real-throttling (DevTools) TBT < 200 ms** |
| LCP element | Make the `h1` "Ahmed Nasser — Frontend Developer" the LCP element in P5/P7 |
| Phone nav | Bottom tab bar < md (no menu button). Layout tokens in `globals.css`: `--tabbar-h` (0 from md), z-order header = tabbar 50 < **Inspect sheet 55** (P6: `bottom: var(--tabbar-h)`) < dialog 60. `body` has `padding-bottom: var(--tabbar-h)` |
| Clip model | **Kling 3.0 `pro`**, 5 s, start + end frame, sound off: **8.75 credits each** (~35 for A–D). Fits the current 110, so clips are no longer deferred. Each clip still needs a cost check + OK. Seedance 2.5 1080p (80/clip) rejected |
| CLS | Accept 0.001 under DevTools throttling (horizontal Inter Tight swap). Keep `display: swap` so first visits see the display font |
| P2 deviations | Approved: fonts (full variable axis, mono `optional`), `inlineCss`, the three section headings |
| CV file | Keep `public/Ahmed_Nasser_Frontend_Developer_CV.pdf`; link `/Ahmed_Nasser_Frontend_Developer_CV.pdf` |

## P2 results (prod build, `next start`, Lighthouse 12, after the tab bar)
| Run | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Mobile, simulated (Lighthouse default) | 97 | 100 | 100 | 100 | 2.6 s (Lantern estimate) | 70 ms | **0** |
| Mobile, DevTools throttling (4× CPU, slow 4G), 3 runs | 97 | 100 | 100 | 100 | 1.4 s | 190–200 ms | 0.001 |
| Desktop (before tab bar; tab bar hidden ≥ md) | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |

- Transfer: 276 KiB first view. **Initial JS: 148.0 KB brotli** (171 KB gzip): the Next 16.4.5 + React 19 floor + `TabBar`.
- Simulated LCP 2.6 s is a Lantern estimate that counts the framework JS; the observed LCP equals FCP.
- **CLS 0.001 (DevTools throttling only):** a 2–8 px *horizontal* shift when Inter Tight swaps in (text widths differ from the metric-adjusted fallback: chips, buttons, header CV). The vertical layout is stable: the tagline uses `max-w-[19em]`, not `ch`; the status line is `nowrap`; mono uses a real monospace fallback. Exact 0 needs Inter Tight `display: optional` (first slow visit might never show the display font). **Ahmed to decide.**
- TBT: React hydration ~199 ms task + style/layout. P7 must get it < 200 ms with DevTools throttling.
- `content-visibility:auto` was tried and reverted (it broke anchor jumps).
- Checks: no horizontal scroll at 360/390/412/430/767/768/1024/1440. Tab bar 5 × (69–83)×64 px targets at 360–430, hidden ≥ 768. Active tab follows the scroll (Skills covers #layers + #stack). Footer clears the bar by 48 px. A tab tap lands under the header. JS off: hero + tabs work. 0 console errors / CSP violations.

## P7 follow-up: TBT under 200 (2026-11-07) — committed
**Diagnosis** (Lighthouse traces + CDP CPU profile, 4× CPU):
- The ~160–210 ms "hydration" task is framework boot: react-dom evaluation runs the Turbopack entry (module factories) and the RSC decode. Next already hydrates inside `startTransition` (time-sliced). **Experiment:** below-fold sections + the six Inspect panels served as static HTML strings (`dangerouslySetInnerHTML`, React skips them): no change (eval 170 ms vs 170). All sections are already Server Components; client islands are only IntroToggle, StageBoot, TabSync (5.8 KB); demos already lazy. Reverted.
- The Inter Tight swap relayout (95–118 ms) ends at FCP (Chrome holds first paint for the preloaded font), so it mostly falls before the TBT window. Fonts already match the ask: `next/font`, latin subset, `adjustFontFallback` (default, metric-adjusted Arial), only Inter Tight preloaded, mono not preloaded. next/font/google takes no weight range for a variable font, so "only used weights" = the one variable file. Left as is.
- **The real waste was ours:** (1) the hero laptop tick read `window.scrollY` every frame, which forces style + layout while GSAP animates the intro (64 ms self time in the profile, 50–75 ms frame tasks); (2) the laptop loop ran under the intro overlay; (3) two intro build steps of 50–75 ms; (4) GSAP evaluation sometimes landing in the same window.

**Changes:**
- `laptop.ts`: scroll position from a passive `scroll` listener (no layout read in the tick); the loop is off while `html[data-intro=playing]`.
- `intro-timeline.ts`: build split into 11 steps (bars | S1 draw | S1 exit | markup | S2 | S3 frame | S3 chips | S3 exit | S4 bars | S4 shield/map | outro), each ≤ 18 ms at 4× CPU.

**Measured** (prod, Lighthouse 12.8, mobile, DevTools throttling 4× CPU + slow 4G, 3 runs each):

| | Perf | FCP/LCP | TBT | CLS |
|---|---|---|---|---|
| Before (after the hero-open commit) | 88–91 | 2.1–2.3 s | 250–330 ms ✗ | 0.001 |
| **After** | **95–96** | **2.0 s** | **140–160 ms ✓** | 0.001 |

Remaining long tasks after FCP: framework boot ~160 ms (only one over 50 ms). LCP = h1.

**Desktop scroll trace** (was skipped in P7; 1440×900, Lenis, 3 full passes down + up by wheel, after Skip intro):

| | CPU 4× | CPU 1× |
|---|---|---|
| Frames | 2425 | 2582 |
| Frame median / p95 / max | 16.7 / 33.4 / 100 ms | 16.7 / 16.8 / 33.4 ms |
| Long tasks (max) | 17 (90 ms) | 0 |
| Console errors | 0 | 0 |

Unthrottled desktop is smooth. Under 4× the desktop path (1600 px frames, Lenis) drops some frames; desktops aren't the 4× profile in §6, but it's noted. Heap: `performance.memory` is too coarse in headless to judge (9.5 → 9.5 MB).

## Hero laptop ends open (2026-11-07) — committed
Spec: CLAUDE.md §1 chapters 1–2, §6 rules 3, 5, 12 (updated first). CV link in CLAUDE.md fixed to `/Ahmed_Nasser_Frontend_Developer_CV.pdf`. "Available for work" and "RTL" confirmed as facts by Ahmed. 0 credits.
- **Clip A plays once in the hero** (`features/hero/open-clip.ts`): K1 canvas after load + idle, then the 76 clip A frames of the stage's frame set (m on the phone tier, d on desktop) are fetched as blobs at idle, low priority. When `html[data-intro=done]` (or on load if the intro was skipped), they play forward by time in 1.5 s (sine in-out), decoded just ahead with `createImageBitmap` and closed after drawing (≤ 8 alive). Rests on the last frame (K2). Not ready at intro end → stays on K1 and plays when loaded. Scroll starts before it played → jumps to K2 (frames, else the K2 poster). Intro Replay closes it (K1) and plays it again at the end.
- Float, sweep, dots, link and desktop tilt run on the open laptop. The lid sweep is now clipped to the open screen; the 6 dots moved onto the open laptop; sweep + dots start with `[data-open]`.
- **Stage:** clip A removed from the scroll. Teardown = clip B over 0–33 %. Stage frame 0 = clip A's last frame file (the exact pixels the hero rests on), then B. Base poster K1 → **K2** (`scripts/media.sh` makes `k2-d/m.avif` = A's last frame; PSNR 49 dB vs frame 076). Low tier crossfades K2/K3/K5.
- **768–1023 px:** the hero box is desktop-shaped but the stage (phone tier) draws the phone crop, which showed as an edge jump at the handoff. The hero canvas now draws the stage's frame set at its source position inside its box.
- **Edges:** a dark rectangle showed (box feather + floor glow cut). `--frame-fade` radial `mask-image` (ellipse 62 % × 72 % at 50 % 30 %) on the hero canvas, the stage canvas and the posters, sized to the frame rect on both (hero via `--fade-w/--fade-x`, stage via `cqw/cqh` contain-fit), so the handoff still matches. The K2 poster under the stage canvas hides once the canvas draws (two faded layers would not match).
- Reduced motion, low tier, JS off: K2 still (`<noscript>` K2), no clip A requests.
- **Checked** (prod, headless Chromium): opens 1.43 s after intro end at 390/820/1000/1440; handoff before/after screenshots match (shift-compensated PSNR 42/37/37/41 dB, the rest is a 1–2 px scroll offset); no horizontal scroll; 0 console errors; LCP = h1; clip A fetch starts after the load event. Playwright 49 passed, 7 skipped.
- Lighthouse mobile DevTools (3 runs): Perf 88–91, LCP 2.1–2.3 s, **TBT 250–330 ms**, CLS 0.001, total 927 KiB (clip A phone frames included). Fixed in P7 follow-up below.

## Intro + laptop upgrade (2026-11-07) — committed
Spec: CLAUDE.md §1 chapters 0–1 and §6 rule 12b (updated first, then built). 0 Higgsfield credits.
Docs followed: gsap.com Timeline + "Most common GSAP mistakes", web.dev "High-performance animations", MDN IntersectionObserver / Page Visibility.

**Built:**
- **Intro reel = one GSAP timeline** (`features/intro/intro-timeline.ts`, lazy chunk imported after hydration). Same 4 scenes and timings (S1 2.5, S2 1.8, S3 2.6, S4 2.4, outro 9.3–10 s).
  - S1: four 1px grid lines draw a frame (scaleX/Y), highlighter sweeps under DEVELOPER, SVG pin drops on Cairo.
  - S2: Engine gauge ring fills in 4 steps synced with the 1→4 odometer.
  - S3: each core-stack chip draws as a dashed wireframe (dash pattern + dashoffset trick), then fills into the solid chip.
  - S4: bars grow next to "dashboards", hexagon shield draws before "Security", EGYPT ↔ KSA line draws.
  - Match cuts: S1 frame → S2 background, S2 ring → S3 frame, S3 frame → S4 panel. Camera push-in 1 → 1.04 per scene.
  - Outro: shapes fly into the hero laptop, overlay bg fades, hero text settles (y 16 → 0, transform only).
  - First paint (no GSAP yet): bars, S1 text and fact line are SSR; S1 shapes hidden in CSS. **S2–S4 are not SSR**: the lazy chunk inserts them (`scenes-html.ts`, static constants) → smaller HTML/RSC, less hydration + font-swap layout.
  - The build runs in steps (S1 now, then markup / S2 / S3 / S4 / outro one task each, 16 ms apart): each step 2–25 ms at 4× CPU, so no long task. The timeline length is fixed up front (`tl.set({}, {}, OUT+1)`).
  - Failsafes: JS blocked → CSS hides the overlay at 6 s (`html:not([data-intro])`); GSAP chunk error or not started in 5 s → skip. Skip = `progress(1)` (hero settled) + `data-intro=done`; Replay = `revert()` + rebuild. Reduced motion → no intro, GSAP never loaded.
- **Hero laptop** (`features/hero/HeroLaptop.tsx` server markup, `laptop.ts` lazy after load + idle, started by StageBoot). Replaces `HeroStill`. Now also on phones, below the text.
  - Canvas (not an LCP candidate) drawn at the frame's native size, so it stays sharp while scaled up.
  - Float ±6 px / 4 s and desktop tilt (≤ 6°, lerped, `pointer: fine` + ≥ 1024 px) on the gsap.ticker; lid light sweep (gradient band, transform, `clip-path` lid polygon) + 6 pulsing dots in CSS; "6 layers inside ↓" link to #layers.
  - Loops pause off-screen (IntersectionObserver on #top) and in hidden tabs (`data-paused`, ticker removed).
  - **Handoff:** from scrollY 0 to the stage's ScrollTrigger start, `.lap-move` translates + scales (smoothstep) onto the stage's first frame, mapped through the shared 1928×1076 source (d = full frame, m = crop x 320–1600), so it also works when the hero shows d and the stage draws m (768–1023 px). Until then `.stage[data-handoff="hero"] .stage-media` is hidden; at the end the hero copy hides and the stage shows the identical frame. Engine dispatches `stage:ready` so the laptop tick re-queues after Lenis.
  - `#main { overflow-x: clip }`: the scaled laptop can pass the viewport edge at 768 (clip, not hidden, so sticky still works).
  - Class prefix `lap-*` (an earlier `hl-sweep` name collided with the Inspect PROOF highlighter).

**Measured** (prod build, `next start`, Lighthouse 12.8):

| Run | Perf | A11y | BP | SEO | FCP/LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Mobile, DevTools (5 runs) | 90–91 | 100 | 100 | 100 | 2.1–2.2 s | **220–250 ms ✗** (median 240) | 0.001 |
| P8 baseline, same machine/session (3 runs) | — | — | — | — | 2.3 s | 190–280 ms (median 210) | 0.001 |
| Mobile, simulated | 96 | 100 | 100 | 100 | 1.2 / 2.7 s | 50–60 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.3 / 0.6 s | 0 | 0 |

- LCP element = the h1 everywhere. Initial JS **149.5 KB brotli** (unchanged). HTML 14.0 KB br.
- Remaining long tasks are the framework hydration task (~205 ms) and the post-FCP font-swap layout (~120–130 ms); both also in the baseline. The first run before the fixes was 360–410 ms (GSAP eval + full timeline build in one 185 ms task).
- **TBT budget < 200 is not met today, and the P8 baseline isn't either on this machine now** (P7 measured 130–190). Next ideas: Inter Tight swap relayout (display `optional` was declined before), smaller hydration (fewer server-rendered nodes in the first viewport).
- CLS 0.001 under DevTools = the accepted horizontal Inter Tight swap (Decisions table), 0 simulated.
- Playwright: 49 passed, 7 skipped by design. No horizontal scroll at 360/390/430/768/1440 during and after the intro; 0 console errors. Reduced motion: no intro, no GSAP request, static laptop (no sweep/dots/float), PROOF highlights intact.

## P7 results (2026-11-07) — mobile performance pass
**Method:**
- Lighthouse 12 with `--throttling-method=devtools` (4× CPU, slow 4G) and `--save-assets`
- a trace analyzer that breaks each long main-thread task down by event type
- Playwright CDP with `Emulation.setCPUThrottlingRate(4)` for scroll and forced-relayout experiments
- The Chrome DevTools MCP is registered (`claude mcp add chrome-devtools …`) but only loads after a Claude Code restart.

**Diagnosis (before):**
- pre-FCP `Layout` 856 ms
- post-FCP `Layout` 250 ms (Inter Tight swap relayout)
- framework script + RSC decode/hydration 270 ms (one task)
- Key finding: with `experimental.inlineCss` the whole stylesheet was also carried **twice in the RSC payload** (2 × 35 KB rows of 154 K chars) and decoded during hydration.

**Changes:**
1. **`inlineCss` off** (reverses the approved P2 deviation): RSC payload 154 K → 75 K chars; the hydration task 270 → 160 ms; FCP 1.7 → 2.0 s (one small render-blocking CSS file). TBT budget wins (§6).
2. **`content-visibility: auto`** (`.cv-auto`, `contain-intrinsic-size: auto 1100px`) on #stack, #experience, #work, #contact. A forced relayout is −28 % and the font-swap relayout shrinks. Anchor jumps re-settle after scrolling: `TabSync` on `scrollend` (native) and Lenis `onComplete` (desktop).
3. **The tab bar is server-rendered**; the tiny `TabSync` island only moves `aria-current` and re-settles anchors, so the icons no longer ship as JS.
4. **Full-stack cards:** skills are one text line (key skills bold) instead of chip elements.
5. **Chips use short CSS classes** (`.chip/.chip-key/.chip-lg`): RSC payload 75 K → 70 K chars.
- Tried and reverted:
  - `<Suspense>` per section: React outlined the big boundaries as hidden HTML revealed by script (`<!--$?-->`), which breaks JS-off
  - `content-visibility` on the stage: it sits at the fold, so it is always rendered and saves nothing

**Measured (after):**

| Run | Perf | A11y | BP | SEO | FCP/LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Mobile, DevTools (4 runs) | 94–96 | 100 | 100 | 100 | 2.0–2.1 s | **130–190 ms ✓** (median 140) | 0 |
| Mobile, simulated | 96 | 100 | 100 | 100 | 1.2 / 2.7 s | 40 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.3 / 0.6 s | 0 | 0 |

- LCP element = the h1. Initial JS 149.5 KB brotli. First-view transfer 295 KiB.
- **Scrubbing** (phone profile 412×823 @1.75, 4× CPU, 5 full passes down and up the stage, 1,616 frames): median frame 17.6 ms, p95 18.2 ms, max 19 ms, **0 long tasks**, heap 4.5 → 4.0 MB (no leak).
- Anchors with content-visibility land under the header (72/76 px) on phone (tab bar + direct `/#work` load) and desktop (Lenis). #contact stops at the page bottom.
- Still open: a desktop scroll trace on the real-device profile (desktop TBT 0 and LH 100 already); real-device test in P8.

## P6 results (2026-11-07)
**Built:**
- **Inspect:** the six `LayerPanels` now live inside the sticky stage.
  - Scroll mode: the panels are stacked in one grid cell (cell = tallest panel → no CLS). The engine flips `data-state` = past / active / next across the hold (33–88 %, 6 equal slices).
  - CSS runs the choreography, transform/opacity only:
    - number rises
    - name mask reveal
    - title rises
    - chips pop with a stagger, max 6 staggered on phones
    - PROOF highlighter sweeps in (`.hl-sweep::after` scaleX)
    - demo button rises
    - exit: up + fade
  - Phone: bottom sheet (`z-index: var(--z-sheet)`); the stage sits above the tab bar, and the media moves up 17 % during Inspect.
  - Desktop: panel on the left; the media moves right 18 %.
  - Static mode: the same six cards as a plain grid.
- **Progress:** "LAYER 0N / 06" (`aria-live`) plus 6 dot buttons (`data-jump`, `aria-current`), visible only during Inspect.
- **Desktop hotspots** (`LayerHotspots`): 6 labelled 44px buttons on the stack, positioned in the frame's contain-fit box via container query units; hidden on phones (§6 rule 9).
  - A click jumps to that step (instantly, behind the modal) and opens the demo.
  - Positions were measured on k3-d.avif.
- **Demos** (CLAUDE.md §4), each a lazy chunk of 0.6–1.9 KB br. `StageBoot` has a delegated `[data-demo]` click listener → `import('features/demos/open')` → its own React root with a native modal `<dialog>` (focus trap, Escape, focus returns to the trigger). Lenis stops while a demo is open; native scroll is locked on phones.
  1. Interface: EN / عربي with `dir`/`lang` flip. The Arabic is a translation of existing copy only; system Arabic font.
  2. Components: Architecture Lab card (CV facts) plus the GitHub link.
  3. Data: Admin / Analyst / Viewer RBAC on one permission map; mock rows labelled as mock.
  4. Shield: XSS playground.
     - Only an inert `DOMParser` parse; nothing parsed enters the page; no innerHTML or srcdoc.
     - **Verified:** `onerror`/`<script>` never ran (`window.__p` stayed 0) and the probe image was never requested.
  5. Engine: Break it / Fix it, 2,000 rows, scripted typing "booking 01" at 30 ms/key.
     - Measured, unthrottled desktop: **broken 17,099 row renders, longest frame 36 ms; fixed 0 renders, 18 ms**.
     - Layout shift 0 (the run stays inside the 500 ms input window); page CLS 0.
  6. AI & Quality: renamed **"The auditors"** (was "Terminal replay…"). Shows what each auditor checks (CV) plus links. **No invented output**; the real replay comes after P8 runs the auditors.
- **Budget:** `HeroStill` became a server component and its drawing moved into `StageBoot` (one fewer client island). Tier detection moved to mount, so `?tier=static` / low apply before any scroll.
- **CLS fix:** each intro scene is now `position:absolute; inset:0`, so the Inter Tight swap can't move a scene box (it had caused 0.004).

**Measured:**
- **Initial JS 149.9 KB brotli (budget 150; 0.1 KB headroom).** The framework re-split react-dom/client into its own chunk (+0.7 KB) once `open.tsx` imported it. P7 must create headroom.
- LCP element = the h1 (phone and desktop). CLS: 0 (DevTools); simulated 0–0.001, the accepted hero-tagline horizontal font swap.
- No horizontal scroll at 360/390/430/768/1024/1440 over a full scroll; 0 console errors.

| Run | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Mobile, simulated (2 runs) | 94–95 | 100 | 100 | 100 | 2.8–2.9 s | 40–140 ms | 0–0.001 |
| Mobile, DevTools | 88 | 100 | 100 | 100 | 1.7 s | **450 ms ✗** | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 |

## P5 results (2026-11-07)
**Built:**
- **Intro reel** (`features/intro/IntroReel.tsx`, CSS in `globals.css`):
  - pure CSS keyframes, so it starts at first paint with zero JS
  - every animation is transform/opacity on its own element (compositor); `visibility` flips in a 0s animation
  - S1 0–2.5 s, S2 (odometer "4+") 2.5–4.3, S3 chips 4.3–6.9, S4 6.9–9.3, fade 9.3–9.6
  - persistent fact line (Cairo · 4+ years · core stack) from 0 s
  - hidden with `@media (scripting: none)`, with reduced motion, and on `html[data-intro=done]`
- **IntroToggle:** fixed "Skip intro", removed at the end, plus an inline "Replay intro" with reserved space, so there is no CLS. Skips on scroll, wheel, touchmove, scroll keys, or the end of the reel. Replay uses the Web Animations API (`cancel()` + `play()`).
- **Stage** (`features/stage/*`):
  - the 700svh wrapper + sticky stage live only under `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`
  - static mode is plain flow with the K3 still
  - `StageBoot` loads `engine.ts` with `import()` **on the first scroll intent** (or if the page loads already scrolled), never at load
  - the engine dynamically imports GSAP, ScrollTrigger and Lenis (desktop)
  - ScrollTrigger (no pin) → progress map A 0–15 %, B 15–33 %, hold 33–88 % (desktop mouse X → clip C, eased at the edges), D 88–100 %
  - canvas: `alpha:false`, DPR cap 1.5/2, contain-fit, draw only when the bitmap changes, one `gsap.ticker` callback paused off-screen
  - `BitmapWindow` ±6 phone / ±12 desktop with `close()`
  - HTTP-cache warming clip by clip as the visitor approaches
  - `data-chapter` drives the headline swaps (teardown / inspect / assemble)
- **Tiers** (`device-tier.ts`, `?tier=` override) verified:
  - desktop and phone → canvas
  - low → K1/K3/K5 crossfade by opacity, canvas hidden
  - static (reduced motion) → no intro, static K3
- **JS off:** no intro, hero visible, static stage.
- **Desktop hero laptop** = `HeroStill` canvas drawn after load + idle (a canvas is not an LCP candidate), with a `<noscript>` image. **Phones have no hero laptop:** the stage right below is the laptop, and the hero fills the first viewport.
- **Lenis anchors:** Lenis' `anchors` option and `scrollTo(element)` landed off (144 / −310 px). Now a click handler computes `rect.top + scrollY − header − 8` and calls `lenis.scrollTo(number)`. All header and CTA anchors land 72 px from the top; `#top` → 0.

**Measured:**
- **Initial JS 149.4 KB brotli** (budget 150). Lazy chunks: about 46.7 KB brotli in total (GSAP core 24.2, ScrollTrigger 15.5, plus 4.8 and 2.2 for the engine/Lenis), none in the initial bundle.
- **LCP element = the h1** (`span.block … Frontend Developer`) on phone and desktop. ✓
- **CLS 0** (simulated and DevTools). The Skip→Replay move had caused 0.025; fixed with the two-button approach.
- First-view transfer 305 KiB (frames load only after scroll intent). Heap stable after 5 full stage scrolls (5.0 → 5.1 MB).
- No horizontal scroll at 360/390/430/768/1024/1440, during and after the intro. 0 console errors.

| Run | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Mobile, simulated | 93 | 100 | 100 | 100 | 2.7 s | 190 ms | 0 |
| Mobile, DevTools (3 runs) | 87–88 | 100 | 100 | 100 | 1.8–1.9 s | **430–460 ms ✗** | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 |

**TBT diagnosis for P7 (DevTools 4× CPU):**
- The long tasks are only:
  - a pre-FCP document task of ~850 ms (P2: ~520), which also pushes FCP from 1.4 to 1.8 s
  - a post-FCP document task of ~250 ms (P2: ~130)
  - React hydration of ~275 ms (P2: ~165)
- Main thread: styleLayout ~1.2 s (P2: 0.63), "other" ~0.57 s (P2: 0.15).
- Growth comes from more DOM/CSS (intro overlay, stage) and a bigger RSC payload: HTML 221 KB raw / 19 KB br; inline RSC 140 KB raw / 14.5 KB br; ~570 elements.
- P7 ideas:
  - trim duplicate DOM: `LayerPanels` and `StackCards` both render all 6 layers' chips
  - check the Inter Tight swap relayout
  - `content-visibility` for below-fold sections, now that anchors use a computed target (desktop) — re-test native phone anchors
  - smaller inline CSS

## P4 results (2026-11-07)
- `scripts/media.sh` (Git Bash), ~2 min. Per clip: 15 fps → 76 frames. Desktop 1600×892 WebP q75; phone 720×606 WebP q70.
- Processing:
  - feathered edges: smoothstep over the outer 10% of the width / 8% of the height, to black
  - black lifted to #08090B (corner measured 8,10,11), so no visible rectangle on the page
  - phone crop `1280:1076:320:0` instead of 9:16: the K1 pedestal and the K3 stack are wider than a 9:16 crop
- Weights (budget: desktop ≤ 6 MB/clip, phone ≤ 2.5 MB/clip):

| Clip | Desktop | Phone |
|---|---|---|
| A lid | 1003 KB | 528 KB |
| B explode | 1565 KB | 904 KB |
| C orbit | 2439 KB | — (desktop only) |
| D fold | 1428 KB | 819 KB |
| **Total** | **6.4 MB** | **2.25 MB** |

- Posters (AVIF 4:4:4, crf 30) are **exact clip frames** (K1 = A first, K3 = B last, K5 = D last), so poster and canvas match. Sizes: K1 4.0/2.7 KB, K3 20.1/13.3 KB, K5 5.8/3.9 KB (desktop/phone).
- Clip C: frame-difference analysis shows the orbit is monotonic over all 121 frames, so no trim (the earlier "eases back" note was wrong).
- `features/stage/Poster.tsx`: `<picture>` with art direction (desktop source ≥ 48rem) and width/height on both, so CLS stays 0. The SVG placeholders are deleted. The h1 is now a single text block.
- Lighthouse after the posters:

| Run | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Mobile, simulated | 96 | 100 | 100 | 100 | 2.7 s | 50 ms | 0 |
| Mobile, DevTools (2 runs) | 91–93 | 100 | 100 | 100 | 1.5 s | 300–350 ms ✗ | 0.001 |
| Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 |

- **LCP element is now the K1 poster** at 360/390/430/768/1440, not the h1. The image is larger than the h1 block at every width.
  - P5 must fix this. Options: the hero first viewport is text-only on phones (laptop below the fold → not a candidate); the laptop is drawn on the stage canvas, which is not an LCP candidate, with a `<noscript>`/static-tier `<img>` fallback; or a smaller hero image on desktop.
  - This conflicts with CLAUDE.md §6 rule 5 ("poster K1 … priority first"). Ahmed's "h1 is the LCP element" rule wins.
- **TBT regression:** DevTools TBT 190–200 → 300–350 ms. Bigger document paint/raster tasks (+60–130 ms) and the hydration task (+50–100 ms), consistent with decoding/rasterising the hero AVIF at 4× CPU. P7 must get it < 200 ms.

## P2 deviations (budget wins, rule 0.7)
- **Fonts:** `next/font/google` takes no weight ranges, so both families load their full variable axis (one file each). Inter Tight is preloaded; mono is not.
- **Mono font `display: "optional"`** instead of swap: the late swap re-wrapped the hero stack line, giving CLS 0.146.
- **`experimental.inlineCss: true`** (7 KB Tailwind): removes the render-blocking CSS request.
- The LCP element is the hero mono stack line or the tagline, not the `h1` (the h1 is split into per-word blocks). Fine for LCP time; revisit in P5/P7.
- Section headings were added as the only new copy: "Six layers, *one* developer", "4+ years *in production*", "Shipped for *real clients*" (CV: "real clients in Saudi Arabia and Egypt", "shipping products to production").

## Open items / waiting on Ahmed
1. **Real-device test (P8):** needs Ahmed with a low-end Android and an iPhone (scroll the stage up/down 5×, watch the hero laptop open).
2. **P9 (not started):** OG image 1200×630 (K3 + name + "Frontend Developer"), custom favicon (current one is the Create Next App default), custom 404 (`app/not-found.tsx`), twitter card `summary_large_image`, env vars, deploy steps. No deploy without his OK.
3. **P10 (after deploy):** Reel 1 only (screen recording + Remotion).

## Higgsfield credit log
| Date | Call | Model | Credits | Balance | Result |
|---|---|---|---|---|---|
| 2026-11-07 | — (none spent before P3) | — | 0 | 110 | — |
| 2026-11-07 | K1 closed laptop, 16:9 2k | nano_banana_pro | 2 | 108 | accepted → `assets-src/keyframes/K1.png` |
| 2026-11-07 | K2 try 1 | nano_banana_pro | 2 | 106 | rejected (angle drift, fake text) |
| 2026-11-07 | K2 (edit of K1) | nano_banana_pro | 2 | 104 | accepted |
| 2026-11-07 | K3 exploded | nano_banana_pro | 2 | 102 | accepted |
| 2026-11-07 | K4 try 1 | nano_banana_pro | 2 | 100 | rejected (no orbit) |
| 2026-11-07 | K5 phone (edit of K3) | nano_banana_pro | 2 | 98 | accepted |
| 2026-11-07 | K4 orbit (retry) | 3d_jutsu_angles | 2.5 | 95.5 | accepted |
| 2026-11-07 | clip B K2→K3 | kling3_0 pro 5 s | 8.75 | 86.75 | accepted |
| 2026-11-07 | clip A K1→K2 | kling3_0 pro 5 s | 8.75 | 78 | accepted |
| 2026-11-07 | clip D K3→K5 | kling3_0 pro 5 s | 8.75 | 69.25 | accepted |
| 2026-11-07 | clip C K3→K4 | kling3_0 pro 5 s | 8.75 | 60.5 | accepted (orbit monotonic, full clip used) |

Asset progress (once P3 starts, it is also mirrored in `assets-src/PROGRESS.md`):
- [x] K1  - [x] K2  - [x] K3  - [x] K4  - [x] K5   (14.5 credits spent, 95.5 left)
- [x] clip B  - [x] clip A  - [x] clip D  - [x] clip C   (35 credits)

## Environment facts
- Next **16.4.5**, React **19.3.0**, Tailwind **4.3.5**.
  - `next.config.ts` has `cacheComponents: true`, `partialPrefetching: true`, `experimental.agentFeedback`.
  - **Next docs are local:** `node_modules/next/dist/docs/01-app/` (AGENTS.md says to use these over memory).
  - In Next 16, `next build` no longer prints JS bundle sizes; use `npx next analyze`.
  - `next/image` `priority` is deprecated → use `preload`/`fetchPriority`; `images.qualities` is required.
- Versions to install: `gsap@3.15.1`, `@gsap/react@2.1.2`, `lenis@1.3.27`.
- Connected MCPs: Playwright. Not installed: Chrome DevTools MCP, Higgsfield MCP.
- **ffmpeg 9.0.2 installed** (winget `Gyan.FFmpeg`, 2026-11-07). Bash sessions started before the install don't have it on PATH; full path: `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\`.
- Higgsfield lessons: Nano Banana Pro keeps the camera only with an "Edit this exact image… keep X the same" prompt; use `3d_jutsu_angles` for camera-angle changes; Kling 3.0 pro 5 s start+end = 8.75 credits.
- OS: Windows 11. Shell scripts (`scripts/media.sh`) run in Git Bash.

## Next session — start here
1. Read this file, then CLAUDE.md §1 (chapters 0–2) and §6 rules 5, 12, 12b.
2. Ask Ahmed for localhost feedback on the open-laptop hero and the handoff.
3. Then P9 (see Open items), real-device test, P10.
4. Keep budgets: initial JS ≤ 150 KB br, DevTools TBT < 200 ms. Name the docs followed in each summary; update this file.

## P8 progress (2026-11-07) — committed (`bb5b6d0`)
- P7 committed (`816893f`). Vercel skills installed at project level (`.claude/skills`, `skills-lock.json`).
- **web-design-guidelines fixes:** dialog animation honors reduced motion; `touch-action: manipulation` + tap highlight; body safe-area side padding; hover states on stage dots/hotspots; `role="group"` on hotspots; `text-balance` on panel/contact titles; `translate="no"` on chips + stack lines; `tabular-nums` on BreakIt results; input `name`/`autoComplete`; curly apostrophes (Monsha’at, Let’s).
- **vercel-react-best-practices:** demo chunks preload on hover/focus/press (`preloadDemo`); XSS demo lookups hoisted to Set/regex.
- **Security auditor (nextjs-react-security):** `npm audit --omit=dev` 0; full audit 8 moderate, all dev-only (minimatch GHSA-g3hv-75wg-m249 via eslint-config-next → not shipped). `security_intel.py` on next 16.4.5, react/react-dom 19.3.0, gsap 3.15.1, lenis 1.3.27: GHSA + OSV 0 advisories; Next repo advisories API 404, Snyk/Socket not configured (coverage incomplete, not "no vulns"). No Server Actions / Route Handlers / auth / DB. Hardening: JSON-LD now escapes `<`, `>`, `&`. Raw output in scratchpad `sec-*.json` (for layer 06 replay).
- **SEO/GEO auditor:** title/description/canonical/robots/OG/h1/h2 OK, sitemap absolute, llms.txt 200, 404 OK, security headers OK. Fixed: removed non-standard `Host:` from robots; JSON-LD Person + `description` + `worksFor`. Open: **no og:image** (P9), twitter card → `summary_large_image` with OG image (P9).
- Rebuilt and re-verified on `next start`: robots has no Host line; JSON-LD parses, has description + worksFor, no raw < > &.
- **Layer 06 terminal replay:** `features/demos/audit-run.ts` holds the real run lines (dated 2026-11-07); `AuditorsDemo` replays them line by line (all at once with reduced motion), with Replay + repo links. All lines are reserved up front (no CLS).
- **CV fact diff** (every site/llms.txt/JSON-LD claim vs the CV PDF): all match except two that come from CLAUDE.md §4, not the CV:
  1. "Available for work" (hero status line, llms.txt)
  2. "RTL" (layer 01 chip "i18next · RTL", the RTL demo, llms.txt). The CV says "i18next (internationalization)".
  - Confirmed in CV: Arabic (native) + English → JSON-LD `knowsLanguage` OK; Monsha’at, Takaful, Paymob, Elli ~6 months, 2,000-row fix, RBAC tiers, two juniors, Kenzy Tours/First Mas on Google.
- **Playwright** (`npm run test:e2e`, `playwright.config.ts`, `tests/e2e/`): 4 projects (360/390/768/1440), tests a–m + tab-bar visibility. **49 passed, 7 skipped by design, 0 failed** (re-run by the main session). Covers console errors, horizontal scroll, chapters, header, intro skip/replay, all 6 demos, EN/AR RTL, keyboard-only + focus rings, reduced motion, XSS inert (`window.__p` undefined, no `/x` request), JS off, `/_next/static` JS blocked, phone no blur/backdrop/preserve-3d, scroll-mode demo. Reduced-motion `#layers` height bound is < 5× viewport below 768px (six stacked cards), < 3× from 768px up.
- **Left in P8:** real-device test with Ahmed. Committed `bb5b6d0`.
