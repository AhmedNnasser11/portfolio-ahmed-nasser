# STATUS — handover

> Read this first in every new session, then `docs/PLAN.md`, then `CLAUDE.md`.
> Update it at the end of every session: phase, what was done, what's next, credits.

**Last updated:** 2026-11-07
**Current phase:** **P5 done, not committed** (intro reel, scroll stage engine, device tiers, Lenis). Next is **P6** (Inspect + demos). P4 is committed (`cfec028`).
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
2. **CLAUDE.md CV path has no `.pdf`** (lines 15, 87, 269, 324: `/Ahmed_Nasser_Frontend_Developer_CV`). Suggest adding `.pdf`; don't change it without his OK.
3. **Install prereqs (needs his OK):**
   - `winget install ffmpeg`
   - Chrome DevTools MCP: `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest`
   - GSAP skills, Vercel `agent-skills`, Remotion skills (review each SKILL.md first)
4. **Higgsfield workspace not selected yet.** First step of P3: `hf workspace set 3eb5ac4a-bd25-4bc4-86bd-2334b36ebd5c`, then `higgsfield generate cost …` before every call, and his OK per call.
5. **Fact wording changes in PLAN §8:** default is the CV-accurate wording; he can object.
6. **Real-device test (P8):** needs him with a low-end Android and an iPhone.

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
1. Read this file, then `docs/PLAN.md` §2/§4 (Inspect) + Amendments.
2. If not done: commit P5.
3. **P6** (CLAUDE.md §8 P6 + PLAN §4 Inspect):
   - move `LayerPanels` into the sticky stage for the hold segment (33–88 %): 6 steps, each with a prebuilt paused enter/exit timeline
   - desktop: left panel + hotspots/labels; phone: bottom sheet at `bottom: var(--tabbar-h)`, `z-index: var(--z-sheet)`
   - static mode keeps the plain list
   - the engine already sets `data-chapter=inspect`; add the step index
   - `DemoDialog` + 6 demos via `next/dynamic`, loaded on open
   - the XSS lab never uses `innerHTML`
4. Keep the JS budget: anything new client-side must be lazy (`import()` / `next/dynamic`) and measured as brotli.
5. In each summary, name the docs followed (rule 0.7) and update this file.
