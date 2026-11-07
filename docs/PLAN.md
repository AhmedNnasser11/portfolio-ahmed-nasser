# Ahmed Nasser Portfolio — Implementation Plan (P1, revised after review)

## Context
The repo is a fresh `create-next-app`: Next **16.4.5**, React **19.3.0**, Tailwind **4.3.5**, with `cacheComponents: true` and `partialPrefetching: true`. CLAUDE.md defines the "Exploded View" portfolio. This plan orders the build P2→P10, cites the doc behind each decision, and records your decisions.

Two subagent reviews have been folded in:
- architecture, performance and security (Opus, high effort)
- spec compliance and fact check (Sonnet, medium effort)

Their key claims were verified against the local Next source.

**Doc sources**
- **[ND]** = `node_modules/next/dist/docs/01-app/`. AGENTS.md says to use these over memory. Used: CSP guide, cacheComponents, font, image, lazy-loading, json-ld, metadata, package-bundling, CLI.
- **gsap.com (v3.15):** ScrollTrigger, ScrollTrigger.config, matchMedia, React/useGSAP, SplitText, mistakes.
- Lenis README (1.3.27).
- Tailwind v4.3 responsive design.
- **web.dev:** Vitals, Optimize LCP, Optimize INP, Optimize CLS.
- **MDN:** ImageBitmap.close, deviceMemory, requestIdleCallback.

**Environment**
- Latest versions: `gsap` 3.15.1, `@gsap/react` 2.1.2, `lenis` 1.3.27.
- Not installed: ffmpeg, Chrome DevTools MCP, the GSAP / Vercel / Remotion skills, the Higgsfield MCP.
- Installed: Higgsfield **CLI 1.2.2** (Lite plan, 110 credits) and the Playwright MCP.

## Decisions already made
- The intro plays on **every visit**, so the page stays fully static.
- Selected work uses **text-only cards** for now. You drop real screenshots into `assets-src/screens/` later.
- The **low tier** uses static K1/K3/K5 stills, crossfaded. No H.264 video, so the `-g 1` encode is dropped from P4.
- **Higgsfield:** via the CLI.
  - Credits refresh **monthly** on the billing date, not daily, and don't roll over. Credit packs need an active subscription and expire after 90 days.
  - **Now:** the 110 credits go on K1–K5 only. **Later** (credit pack or next billing date): clips B → A → D → C.
  - Progress is logged in `assets-src/PROGRESS.md`.
  - The site ships first with the stills.
- **Only one Instagram reel:** Reel 1, a screen recording plus Remotion cards, costing 0 credits. Reel 2 (Marketing Studio) is dropped.

---

## 1. Folder structure (feature-based)

```
app/      layout.tsx · page.tsx (RSC, static) · globals.css (@theme tokens) · sitemap.ts · robots.ts
          opengraph-image.png (static) · icon.png · not-found.tsx
content/  profile.ts layers.ts experience.ts projects.ts open-source.ts   ← only §4 + CV facts
features/
  header/      SiteHeader.tsx (RSC) · MobileMenu.tsx (client)
  hero/        Hero.tsx (RSC, LCP text + K1 laptop poster)
  intro/       IntroReel.tsx (RSC markup) · IntroController.tsx (client) · IntroToggle.tsx (Skip/Replay, outside overlay)
  stage/       Stage.tsx (RSC: sticky stage + <picture> posters + <canvas>)
               StageEngine.tsx (client, loaded via import() after load) · device-tier.ts
               frame-sequence.ts · bitmap-window.ts · poster-crossfade.ts · media-manifest.ts
  inspect/     LayerPanels.tsx (RSC) · LayerHotspots.tsx (RSC buttons over K3) · InspectController.tsx (client)
  demos/       DemoDialog.tsx (client, <dialog>) + rtl-switch/ arch-lab-link/ rbac-switch/ xss-lab/ break-it/ terminal-replay/
  stack/ experience/ work/ contact/
shared/   ui/ (Chip, GradientText, Highlight, Button, SectionHeading) · lib/ (gsap.ts, lenis.ts)
scripts/media.sh · assets-src/ (raw, git-ignored large files) · public/media/… · public/llms.txt
tests/e2e/*.spec.ts
```

RSC shells hold all the real HTML, and client controllers only attach behaviour. Server Components are code-split automatically ([ND] lazy-loading).

## 2. Chapters → components

| Ch | Server HTML | Client |
|---|---|---|
| Header | Name · Frontend Developer · `React · Next.js · TS · JS`. **On phones too:** a thin mono stack line under the title (rule 0.1 beats §1's "name + title only"). Desktop adds links + Download CV. z-index sits **above** the intro overlay. | `MobileMenu` |
| 0 Intro | `IntroReel` (`aria-hidden`). S1 is visible at first paint and adds a persistent fact line: "Cairo, Egypt · 4+ years · React.js · Next.js · TypeScript · JavaScript" (so all HR facts show at 0 s without JS) | `IntroController` (GSAP timeline) + `IntroToggle` (focusable, outside the aria-hidden block) |
| 1 Hero | `h1` "Ahmed Nasser — Frontend Developer" (visually a huge Frontend Developer, one block per word so a font swap can't change the wrapping), status line, "4+ years building production React.js & Next.js apps", 4 filled chips, secondary line, **See experience** / **Download CV**. K1 laptop on the right (≥lg) or below (phone) — this is the stage's starting frame | — |
| 2–4 Stage | Sticky stage. Headlines "Every interface is a **stack.**" and "Assembled. Shipped. Keep scrolling ↓" | `StageEngine` |
| 3 Inspect | `LayerPanels` (6 `<article>`s) + `LayerHotspots` (6 buttons positioned over K3; glow uses opacity/transform only). Without JS or with reduced motion, it is an **unpinned plain list** | `InspectController` |
| 5–8 | StackCards, Experience, ProjectCards, OpenSource, Contact | `ScrollTrigger.batch` highlighter (class toggle) |

## 3. Media pipeline and device tiers

- **P4 `scripts/media.sh`** produces:
  - desktop WebP 1600w at **12–15 fps** (the reviewer showed 24 fps is excessive for scrubbing)
  - phone WebP 720w 9:16 at 12–15 fps, q70
  - AVIF posters K1/K3/K5 (desktop 16:9 1600w, phone 9:16 720w)
  - `manifest.json` per clip
  - a weight report
- **Budgets:** ≤ 6 MB per clip on desktop and ≤ 2.5 MB per clip on phone, tuned with fps, width and quality.
- **Posters:** served through `<picture>` with art direction (desktop 16:9, phone 9:16) and explicit width/height. They don't go through `next/image`, which would re-encode the AVIF.

**Tiers** are decided once in `device-tier.ts`, with precedence **static > low > desktop > phone**. A `?tier=` query override exists for testing.

| Tier | Condition | Media |
|---|---|---|
| static | `prefers-reduced-motion: reduce` | posters, no scrub |
| low | **phone-sized** and (`saveData` or `hardwareConcurrency ≤ 2` or `deviceMemory` defined and `< 4`) | poster crossfade K1→K3→K5 by progress (opacity) |
| desktop | `(min-width:1024px) and (pointer:fine)` | canvas, clips A B C D |
| phone | otherwise | canvas, clips A B D (no C) |

The reviewer showed that `deviceMemory = 4` is reported by 6 GB Androids and that iOS may report ≤ 4 cores, so the original thresholds would have put most phones in `low`. The tier must be checked on a real iPhone.

**Until the clips exist,** every tier runs the poster crossfade, and the canvas path is built and tested with a short ffmpeg test clip made from the stills.

## 4. GSAP architecture

**Setup:** `shared/lib/gsap.ts` registers `useGSAP`, `ScrollTrigger` and `SplitText` (gsap.com React) and calls `ScrollTrigger.config({ ignoreMobileResize:true })` (ScrollTrigger.config).
- No `normalizeScroll`.
- `useGSAP({scope})`, with `contextSafe` for handlers.
- **JS budget:** only the intro controller is in the first-load JS. ScrollTrigger, Lenis and the stage engine load via `import()` after `load` (H2).

**Lenis** is created only in the matchMedia condition `(min-width:1024px) and (pointer:fine) and (prefers-reduced-motion: no-preference)`:
- `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t=>lenis.raf(t*1000))`, `lagSmoothing(0)`
- import `lenis/dist/lenis.css`
- the cleanup returns `lenis.destroy()` and removes the ticker callback (Lenis README; gsap matchMedia cleanup)

**Intro (ch 0):**
- S1 is SSR'd and visible (no "from" reveal on S1).
- Timeline: one paused timeline, built once, `restart()` on Replay (gsap mistakes #7). Scene durations 2.5 / 1.8 / 2.6 / 2.4 s; enter 0.25 s, exit 0.2 s; story bars animate `scaleX`.
- SplitText settings: `mask:"lines"`, `aria:"hidden"`, `autoSplit` + `onSplit`. Phones animate lines, not chars (SplitText perf).
- "4+": `tabular-nums` with `textContent`.
- Skip: Skip button, wheel / touchmove / keydown, or the end of the timeline. The overlay fades out and is removed, `.hero-ready` is added, and the button becomes Replay.
- **Failsafes:**
  - `@media (scripting:none)` hides the overlay.
  - **A CSS animation `intro-out .3s 11s forwards` auto-hides the overlay if JS fails.** JS cancels it when it takes over (B1).
  - Reduced motion hides it in CSS.
- **LCP:** the hero stays at **opacity 1 underneath** the overlay (LCP ignores occlusion), so the hero `h1` is the LCP at first paint. Later intro scenes are smaller than it, and `.hero-ready` only animates pseudo-elements and transforms (H4). This is verified in the P7 trace.

**Stage (ch 2–4):**
- **Sticky, not `pin`** (H5): an SSR'd wrapper `height:700svh` under `@media (scripting:enabled)` holds a stage with `position:sticky; top:var(--header-h); height:calc(100svh - var(--header-h))`.
- One ScrollTrigger with no pin and `scrub:true` writes `self.progress` into a ref (no React state).
- This avoids pin-spacer CLS and iOS pin jumps, and it respects the sticky header.
- Progress map:
  - 0–.15 → A
  - .15–.33 → B
  - .33–.88 → hold B's last frame; desktop mouse X maps to C
  - .88–1 → D

**Frame engine:**
- One `gsap.ticker` callback lerps `current` toward `target` and draws only when the rounded index changes.
- It stops when an IntersectionObserver reports the stage off screen, or on `visibilitychange`.
- Canvas: `getContext('2d',{alpha:false})`, DPR capped at 1.5 on phone and 2 on desktop, cover-fit `drawImage`.
- `bitmap-window.ts`:
  - window of **±6 on phone** and ±12 on desktop (iOS memory: ±12 at 720×1280 ≈ 92 MB)
  - `.close()` on bitmaps that leave the window, including bitmaps that finish decoding after they have left
  - on a cache miss, the last frame stays on screen
  - `img.decode()` fallback if `createImageBitmap` is slow on iOS
- **Loading:**
  - posters in HTML, with `fetchPriority="high"` on the hero poster (never lazy-loaded)
  - phone clip A on first scroll or when the stage is near; desktop clip A at idle (`requestIdleCallback` with a `setTimeout` fallback)
  - B, C and D when the stage is within about 1 viewport
  - no loader UI

**Inspect (ch 3):**
- `step = clamp(floor((p-.33)/(.55/6)), 0, 5)`.
- Each panel has a prebuilt paused enter/exit timeline:
  - number + name mask reveal
  - gradient keyword
  - chips stagger 0.04 s (≤ 6 staggered on phone)
  - PROOF highlighter as `scaleX` on a pseudo band
  - exit: `y:-24, opacity:0`
- On fast scrolls, the running timeline is killed and skipped steps are reset with `progress(0)`. A reload mid-stage sets the step instantly.
- All 6 panels are absolutely stacked inside a container sized to the tallest one, so there is no CLS.
- The outlined number uses `-webkit-text-stroke` **on desktop only**; phones get a solid muted number.
- Desktop: left panel, labels on the stack, orbit. Phone: bottom sheet `position:absolute` inside the stage, no labels, no orbit.
- **Keyboard:** hotspots and panel buttons are focusable. Enter/Space scrolls to the **middle** of that step and opens the demo.

**Demos (`next/dynamic` inside the client `DemoDialog`, [ND] lazy-loading):**
- The dialog shell opens immediately. The demo chunk is preloaded on pointerdown or when its step becomes active.
- While the dialog is open: `lenis.stop()`, `overflow:hidden` on `html`, `data-lenis-prevent`.
- **RTL:** toggles `dir`/`lang` on a card. The Arabic copy is a translation of existing text only, using a system Arabic font stack (no third font family).
- **RBAC:** client-only role switch over neutral mock rows.
- **XSS lab:**
  - parses input only with an inert `DOMParser`
  - **never** uses `innerHTML` on any node (detached nodes still fire `onerror`), never imports parsed nodes into the page, never uses `srcdoc`
  - shows the dangerous nodes and attributes next to React's escaped output
  - a Playwright test checks that `onerror="window.__p=1"` never sets `__p` and that no image request is made
- **Break it / Fix it:** 2,000 rows. The broken mode drives **scripted input** (it does not react to user keystrokes, to protect field INP). The fixed mode splits components and moves filters to `useRef`. FPS, frame time, render-counter ref and `PerformanceObserver('layout-shift')` values are all measured.
- **Terminal replay:** real output captured from running your auditors in P8. If they can't run, the demo is replaced by links to the repos.

### Section 6 rules → implementation

| Rule | How | Doc |
|---|---|---|
| 1 LCP text | Hero `h1` SSR'd at opacity 1 under the overlay | web.dev LCP; [ND] cacheComponents |
| 2 Fonts | `next/font/google`: Inter Tight `weight:'600 800'` variable, preloaded (one file) + JetBrains Mono `preload:false`; latin; swap. **Deviation:** "preload only 800" is impossible for one variable file, since preload is per family | [ND] font.md |
| 3 Media/tier | §3 table | gsap matchMedia; MDN deviceMemory |
| 4 Memory | ±6 / ±12 window + `close()` | MDN ImageBitmap.close |
| 5 Loading | posters → A (scroll or idle) → B/C/D near viewport, no loader | MDN rIC; web.dev LCP |
| 6 Canvas | DPR cap, draw on change, single ticker, pause | MDN canvas |
| 7 transform/opacity | Phones: no blur, backdrop-filter, box-shadow animation, text-stroke or preserve-3d. **Automated:** a Playwright computed-style check at 390px | web.dev animations |
| 8 Scroll | Lenis desktop only; `ignoreMobileResize`; svh; `scrub:true`; sticky stage instead of pin | gsap; MDN length |
| 9 Fewer parts | ≤ 6 staggered chips, no C, no labels, bottom sheet | — |
| 10 Splitting | demos via `next/dynamic`; stage engine via `import()` | [ND] lazy-loading |
| 11 Images | `next/image` (`formats` avif/webp, `qualities:[70,75]` — required in 16, `preload`/`fetchPriority` instead of the deprecated `priority`) for screenshots; `<picture>` for posters | [ND] image.md |
| 12 a11y | reduced motion → static; focus visible; AA; Skip/Replay outside the aria-hidden block | MDN reduced-motion |
| 13 Security | **Decided now (H1):** the guide's "Without Nonces" CSP (`script-src 'self' 'unsafe-inline'`, `style-src 'self' 'unsafe-inline'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`) + `experimental.sri` for chunk integrity (verify `integrity=` appears in the HTML), + `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, mic, geo off). The Shield copy never calls it "strict CSP" | [ND] CSP guide (SRI "cannot handle dynamically generated scripts"; inline `self.__next_f.push` confirmed in `use-flight-response.js`) |
| 14 SEO | `metadata` + `metadataBase`, static OG png, JSON-LD Person+WebSite with `<` escaped as `<`, sitemap, robots, llms.txt. Use constants instead of `new Date()` (cacheComponents prerender) | [ND] json-ld, metadata, migrating-to-cache-components |

Tailwind: unprefixed classes target the 390px base, then `md:` and `lg:`; `max-lg:` for phone-only removals.

## 5. Higgsfield (CLI; price check + your OK before every call)

Step 0 is `hf workspace set 3eb5ac4a-…`. Before each call, `higgsfield generate cost …` gives the exact credits. **Per-call prices are unknown until then.**

| # | Asset | Model | Input | AR / res | When |
|---|---|---|---|---|---|
| 1 | K1 closed laptop | `nano_banana_pro` | prompt + style suffix (background graded to `#08090B`) | 16:9 2K | now |
| 2 | K2 lid open | `nano_banana_pro` edit | `--image K1` | 16:9 2K | now |
| 3 | K3 exploded | `nano_banana_pro` edit | `--image K2` (+ K1 as reference) | 16:9 2K | now |
| 4 | K4 orbit 35° | `nano_banana_pro` edit (Angles 2.0 if on the plan) | `--image K3` | 16:9 2K | now |
| 5 | K5 phone | `nano_banana_pro` edit | `--image K4` (+ K3 as reference); the spec says each keyframe comes from the previous one | 16:9 2K | now |
| 6–9 | Clips B, A, D, C | `seedance_2_5 --mode omni_reference --start-image --end-image` (fallback `kling3_0`) | start + end frames | 16:9 1080p, 5–6 s | later |

- Phone 9:16 versions come from a free center crop. Only if the crop cuts the subject: the `reframe` workflow or Image expansion.
- Soul ID / Multi Reference, the VFX preset for clip B, and Topaz upscale of K1/K3/K5 are used only if the Lite plan has them (to be checked in the web app).
- Each step that would exceed the balance stops and is logged in `PROGRESS.md`.

## 6. Order of work

0. **Prereqs (your OK):**
   - `winget install ffmpeg`, the Chrome DevTools MCP, the GSAP / Vercel / Remotion skills (review each SKILL.md)
   - work on branch `feat/portfolio`; commits only when you ask
   - each phase summary names the docs followed (rule 0.7)
1. **P2:** tokens, fonts, `content/*`, all RSC chapters (stage = K1 poster), headers, SEO files.
   - **Baseline JS:** measure an empty page with `npx next analyze` + DevTools, because `next build` no longer prints bundle sizes in 16 (H2).
   - Run Lighthouse mobile and report the scores.
2. **P3:** K1–K5 (now) → clips later.
3. **P4:** `media.sh`, posters, weight report, budgets.
4. **P5:** tiers, sticky stage, poster crossfade, canvas engine, Lenis, intro + failsafe.
5. **P6:** Inspect, hotspots, DemoDialog, 6 demos.
6. **P7:** perf trace at 390×844, 4× CPU, Slow 4G. Report LCP (and its element), INP, CLS, TBT, transfer, heap, longest task while scrubbing. Then desktop.
7. **P8:** Vercel skills, your auditors (capture real output), Playwright suite (below), CV fact diff.
   - **Plus a manual real-device test with you:** low-end Android + iPhone Safari, scrolling up and down 5× with no crash.
8. **P9:** OG image, favicon, 404, commits, deploy steps. No deploy without your OK.
9. **P10:** Reel 1 only (`/reel/raw.mp4` + Remotion 1 s title card and 2 s end card, 1080×1920). 0 credits.

## 7. Verification (every phase)

- **Build:** `npm run build` shows `/` as static. Measure on `npm start`, never on dev.
- **Lighthouse mobile:** ≥ 90 / 95 / 95 / 100.
- **Trace:** LCP ≤ 2.5 s with the hero `h1` as the LCP element, INP ≤ 200 ms, CLS ≤ 0.05, TBT ≤ 200 ms, no long task > 50 ms while scrubbing, first view ≤ 1 MB, initial JS ≤ 150 KB gzip (`next analyze` + network).
- **CSP:** zero violations in the console.
- **Playwright** at 360, 390, 430, 768, 1280, 1440:
  - no horizontal scroll; header + stack visible at every scroll position
  - intro skip/replay
  - JS disabled → hero visible
  - **`/_next/static/**` blocked → hero visible by 11.5 s** (failsafe)
  - reduced motion → static
  - keyboard reaches every hotspot and demo
  - XSS test
  - phone computed-style check (no blur or 3D)
- **Memory:** scroll the stage 5× on the phone profile while watching the heap and the open bitmap count.

## 8. Facts — wording changes to match the CV (default; tell me if you disagree)

The fact-check found claims worded more strongly than the CV. The site will use the CV-accurate wording:
- **E2E / TravWare:** "TravWare ERP interfaces *used in production* by travel clients, plus a flights & hotels booking engine." The CV says the booking engine was "delivered… now tailoring it" and that TravWare is a team project.
- **Selected work, TravWare:** "SaaS ERP interfaces (team project) and a flights & hotels booking engine with per-client branding."
- **Selected work, Ajzaa:** "Vendor & admin dashboard for a multi-tenant Saudi auto-parts marketplace: live chat, delivery tracking." He built the dashboard, not the marketplace.
- **Per-project stack column:** Olimi and Elli show "Next.js · TypeScript" (the CV lists this as the INCode environment). Cyber-Guardian shows "Next.js · RBAC" (the CV says "full Next.js frontend" and RBAC). "RBAC" moves out of the stack column and into the description.
- **Layer 06 title:** "Built with *AI agents*, tested" instead of "Engineered with". The CV says "Uses AI coding agents daily".
- **Layer 04 proof:** "Built an *open-source security auditor* skill for Next.js App Router apps." The CV calls it an OpenCode skill.
- **Layer 01 chip "i18next · RTL":** kept, since RTL is shown live in the demo. **Layer 01 proof:** kept (the CV supports both halves).
- **"Available for work":** kept, because CLAUDE.md §4 is a stated source of truth.
- **The CV phone number is never published** (not in JSON-LD, not in llms.txt).
- **CV file:** CLAUDE.md now links `/Ahmed_Nasser_Frontend_Developer_CV` with **no `.pdf`**, but the real file is `public/Ahmed_Nasser_Frontend_Developer_CV.pdf`. **Keep the file as is** (no rename) and link `/Ahmed_Nasser_Frontend_Developer_CV.pdf`. CLAUDE.md lines 15, 87, 269 and 324 need the `.pdf` added; I'll suggest that edit, not make it silently.

## 9. Remaining risks

- **Higgsfield:** clip timing depends on credits. The stage looks good with stills alone.
- **Clip weights:** unknown until P4.
- **Real-device tier tuning:** may need a threshold change after the iPhone/Android test.
- **SRI:** experimental. If it breaks the build, drop `experimental.sri` and keep the rest of the CSP.

---

## Amendments after P2 review (Ahmed, 2026-11-07)
- **JS budget is measured as brotli** (150 KB). Framework floor accepted (148.0 KB brotli). **GSAP and Lenis load after first paint** via dynamic `import()` / `requestIdleCallback`, never in the initial bundle. This replaces §4's "only the intro controller is in the first-load JS": the intro controller is a tiny island that imports GSAP after first paint; S1 is already visible in the SSR HTML.
- **TBT:** P7 must bring DevTools-throttled (4× CPU, slow 4G) TBT under 200 ms.
- **LCP element:** the `h1` "Ahmed Nasser — Frontend Developer" must be the LCP element (P5/P7).
- **Phone navigation:** fixed bottom tab bar below md (Home, Skills, Experience, Work, Contact; icon + label; 64px + `env(safe-area-inset-bottom)`; solid bg + top border; plain anchors; IntersectionObserver → `aria-current="page"`). The phone header stays slim: name + title + core stack line + Download CV. Top nav from md up.
- **P6 Inspect bottom sheet** sits above the tab bar: `bottom: var(--tabbar-h)`, `z-index: var(--z-sheet)` (55 > tab bar 50).
- Approved deviations: full variable font axis, mono `display: optional` + monospace fallback, `experimental.inlineCss`, the three section headings.

## Amendments after P3/P4 (2026-11-07)
- **Clips:** Kling 3.0 pro (8.75 credits each), not Seedance; all four made in P3 (49.5 credits total, 60.5 left).
- **Phone media is 720×606, not 9:16:** centre crop `1280:1076:320:0` keeps the whole pedestal/stack. The black is graded to #08090B with feathered edges, so it blends into the page. No 9:16 regenerations were needed (0 credits).
- **Posters are exact clip frames**, not the keyframe PNGs, so the poster → canvas handoff is pixel-identical.
- **15 fps** for all clips; all budgets met (desktop 6.4 MB total, phone 2.25 MB total).

## Amendments after P5 (2026-11-07)
- **Intro = CSS keyframes, not a GSAP timeline/SplitText.** It must start at 0 s (rule 0.1), and GSAP may only load after first paint (Ahmed's P2 review). Line masks, highlighter sweep, odometer and chip pops are all transform/opacity, one animation per element (compositor).
- **Engine boots on the first scroll intent**, not at load + idle. On phones the stage starts at the fold, so an IntersectionObserver trigger would fire at load.
- **No hero laptop on phones.** The stage below the hero is the laptop. Desktop hero laptop = canvas drawn after load (not an LCP candidate).
- **Lenis anchors:** custom click handler → `lenis.scrollTo(number)` (the built-in `anchors` / element targets landed wrong in testing).

## Amendments after P6 (2026-11-07)
- **Inspect choreography = CSS keyed on `data-state`** (set by the lazy engine), not GSAP timelines. Fast scrolls are safe: CSS restarts per state, with no timeline bookkeeping.
- **Demos = `import()` + their own React root + native `<dialog>`**, opened by one delegated listener in `StageBoot`. This replaces `next/dynamic`: no new client component in the initial bundle (the budget had 0.6 KB left).
- **Layer 06 demo** is "The auditors" (facts + links) until P8 captures a real audit run; no invented terminal output.
- **Hotspot click** = instant jump behind the modal + open the demo; the dots scroll smoothly.

## Amendments after P7 (2026-11-07)
- **`experimental.inlineCss` is OFF.** It duplicated the stylesheet in the RSC payload; turning it off took DevTools TBT from ~370 to 130–190 ms (+0.3 s FCP).
- **`content-visibility: auto` on the sections below the stage**, with anchor re-settling (TabSync on `scrollend`, Lenis `onComplete`).
- **Tab bar is server-rendered**; TabSync is the only tab-bar JS.
- **Never wrap the big sections in `<Suspense>`:** React outlines large boundaries into script-revealed hidden HTML, which breaks JS-off.
