# STATUS — handover

> Read this first in every new session, then `docs/PLAN.md`, then `CLAUDE.md`.
> Update it at the end of every session: phase, what was done, what's next, credits.

**Last updated:** 2026-11-07
**Current phase:** **P3 done** (K1–K5 + clips A–D, 49.5 credits, balance 60.5). Next is **P4** (media pipeline). P3 is not committed (assets are binaries kept out of git).
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
| 2026-11-07 | clip C K3→K4 | kling3_0 pro 5 s | 8.75 | 60.5 | accepted; use frames 0–~30 only (orbit eases back mid-clip) |

Asset progress (once P3 starts, it is also mirrored in `assets-src/PROGRESS.md`):
- [x] K1  - [x] K2  - [x] K3  - [x] K4  - [x] K5   (14.5 credits spent, 95.5 left)
- [x] clip B  - [x] clip A  - [x] clip D  - [x] clip C (trim to frames 0–~30)   (35 credits)

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
1. Read this file, then `docs/PLAN.md` §3 + §6 and `assets-src/PROGRESS.md`.
2. **P4 media pipeline** (`scripts/media.sh`, Git Bash, ffmpeg path above):
   - source: `assets-src/clips/{A,B,C,D}.mp4` (1928×1076, 24 fps, 121 frames) and `assets-src/keyframes/K1–K5.png`
   - desktop WebP 1600w at 12–15 fps; phone 720w at 12–15 fps, q70
   - clip C: frames 0–~30 only (find the turnaround frame first)
   - grade the background to #08090B; remove banding with a little noise or dither if needed
   - posters K1/K3/K5 as AVIF: desktop 16:9 1600w and phone 9:16 720w. The K1–K3 subject is wider than the centre third, so decide between a 9:16 regenerate (~2 credits each, needs OK) and a looser crop. K5 crops cleanly.
   - weight report against the budget: ≤ 6 MB per clip on desktop, ≤ 2.5 MB per clip on phone
3. Then swap the SVG placeholders for `<picture>` posters; P5 adds GSAP/Lenis after first paint, and the h1 must be the LCP element.
4. In each summary, name the docs followed (rule 0.7) and update this file.
