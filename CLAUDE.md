# CLAUDE.md — Ahmed Nasser Portfolio (FINAL PLAN)

> Put this file in the root of the portfolio repo as `CLAUDE.md`. Claude Code reads it automatically in every session.
> It replaces PORTFOLIO_BRIEF.md, PROMPTS.md, CINEMATIC_SCROLL_PROMPTS.md and EXPLODED_VIEW_PROMPTS.md.
> Reference mockup: Design canvas "Ahmed Nasser Portfolio Concept" → artboards "C · Exploded View" and "C · Mobile".

---

## 0. Non-negotiable rules

1. **HR first.** Within the first 3 seconds the visitor must read: **Frontend Developer**, **Cairo, Egypt**, **4+ years**, and **React.js · Next.js · TypeScript · JavaScript**. The intro and the final hero show all of them, and the sticky header keeps **Frontend Developer** and the core stack visible on every scroll position.
2. **Mobile first.** Write every style for a 390px phone first, then enhance at `md` (768px) and `lg` (1024px). Test at 360, 390, 430, 768, 1280 and 1440.
3. **Fast and never laggy on phones.** Section 6 is a hard budget. If an effect breaks the budget on mobile, it is removed on mobile, not "optimized later".
4. **Progressive enhancement.** All content is real server-rendered HTML that works with JavaScript off. Video and animation sit on top of it.
5. **Facts only.** Use only facts written in section 4 or in `public/Ahmed_Nasser_Frontend_Developer_CV.pdf`. Never invent metrics, clients, tools, testimonials or scores. Any number shown live (FPS, Web Vitals) must be measured, not hardcoded.
6. **Ask before spending Higgsfield credits.** Every `generate_image` or `generate_video` call needs my OK.
7. **Official docs over memory.** Before building any feature, open the matching links in section 11 (WebFetch) and follow the current official best practice. APIs change, so never rely on memory for versions or APIs. If a doc conflicts with the budget in section 6, the budget wins. In each summary, say which doc you followed.

---

## 1. Concept — "Exploded View"

The portfolio presents the website itself as a product being taken apart, the way iPhone teardown ads do. Every layer is a skill, and clicking a layer opens a live demo that runs real code.

### Chapters

| # | Chapter | Driven by | What happens |
|---|---|---|---|
| 0 | **Intro reel** | time (one GSAP timeline, ~10 s, skippable) | A trailer for the site: it should feel like a video, not text fading in. The text stays the hero (big, high contrast, readable); the shapes only support it, and they come from the 6 layers. 4 story bars at the top, then 4 scenes: **S1** "FRONTEND / DEVELOPER" (2.5 s): thin grid lines draw in and frame the words, the blue highlighter sweeps under DEVELOPER, an SVG pin drops onto "Cairo, Egypt". **S2** giant "4+" (1.8 s): a circular gauge ring (Engine layer) fills in sync with the 1→4 counter, "years shipping production frontends". **S3** "CORE STACK" (2.6 s): each chip (React.js, Next.js, TypeScript, JavaScript) first draws as a dashed wireframe box (Components layer), then fills into the solid chip, one after another. **S4** (2.4 s): small dashboard bars grow next to "Enterprise SaaS dashboards", a hexagon shield appears with "Security", a thin line connects two dots labeled KSA and Egypt. Enter ≈ 0.25 s, exit ≈ 0.2 s. **Match cuts, not fades:** the main shape at the end of each scene scales up and becomes the frame or background of the next (S1 grid → S2 background, S2 ring → S3 frame, S3 frame → S4 dashboard panel). **Camera:** each scene pushes in slowly (scale 1 → 1.04). **Outro:** the shapes collapse and fly into the hero laptop, the overlay fades, and the hero text settles into place (transform only). S1 text and the fact line are server-rendered and readable at first paint, before GSAP arrives. |
| 1 | **Final hero** | stays | "● Available for work · Cairo, Egypt", name, huge **Frontend Developer** with a highlighter sweep, "4+ years building production React.js & Next.js apps", four big core-stack chips, a secondary stack line, buttons **See experience** and **Download CV**. Laptop on the right (desktop) or below the text (phone). A "Skip intro" button turns into "Replay intro". Any scroll skips the intro. **Live laptop:** idle float (translateY ~6 px, ~4 s loop) and a soft light sweep across the lid every few seconds (a gradient band moved with transform inside a clipped wrapper); desktop only (`pointer: fine`): parallax tilt following the mouse, lerped in rAF, max ~6°; 6 small pulsing hotspot dots around it and a "6 layers inside ↓" link to #layers. **Ends open:** the laptop starts closed (K1); when the intro ends, clip A plays forward once by time (~1.5 s, the device's A frames, loaded at idle after first paint, never before the h1 LCP), so the hero rests on the open laptop with a glowing screen (K2 = last frame of A). If the frames are not ready when the intro ends, it stays on K1 and plays A as soon as they load. Float, sweep, dots, link and tilt run on the open laptop. Reduced motion, low-end phones and JS off: K2 as a still image. The frame edges blend into `#08090B` (radial `mask-image` fade if a rectangle shows). **Handoff:** while scrolling from the hero to the stage, the laptop moves and scales onto the stage's first frame, which is the same K2 frame, so clip B starts from the exact hero frame with no jump. Phones: float, sweep and dots, no tilt. |
| 2 | **Teardown** | scroll 0–33% | Clip B (screen explodes into 6 floating layers), starting from the open laptop (K2) the hero ended on. Clip A is not on the scroll; it plays once in the hero. Headline "Every interface is a **stack.**" |
| 3 | **Inspect** | scroll 33–88% | Holds the exploded frame. Six scroll steps, one per layer. On each step the active layer glows, and a panel shows: big outlined number, layer name (mask reveal), title with a gradient keyword, skill chips that stagger in (key skills filled and bold), and a PROOF line where the highlighter sweeps over the key facts. Exit: content moves up and fades. Progress "LAYER 03 / 06" plus dots. Desktop: the panel is on the left and the mouse orbits the stack (clip C). Phone: the panel is a bottom sheet, with no orbit. |
| 4 | **Reassemble** | scroll 88–100% | Clip D: the layers fold into a phone. "Assembled. Shipped. Keep scrolling ↓" |
| 5 | **The full stack** | normal scroll | 6 skill cards (one per layer), with the highlighter sweeping when they come into view. |
| 6 | **Experience** | normal scroll | E2E County, INCode, Mazeed, Freelance — key facts highlighted. |
| 7 | **Selected work + open source** | normal scroll | 6 project cards (real screenshots only) + 4 open-source links. |
| 8 | **Contact** | normal scroll | "Let's build yours." with email, GitHub, LinkedIn, npm. |

The sticky header shows: `Ahmed Nasser · Frontend Developer · React · Next.js · TS · JS`. On desktop it adds section links (Layers, Stack, Experience, Work, Contact) and Download CV. On phones it shows only the name, the title and a menu button.

---

## 2. Design tokens

| Token | Value |
|---|---|
| bg | `#08090B` |
| surface | `#0E1015` / `#11141B` |
| line | `rgba(255,255,255,.09)` |
| text | `#F2F3F5` · secondary `#DADDE3` · muted `#B7BCC6` · subtle `#8A909C` |
| accent | `#6E9BFF` (fills, highlighter `rgba(110,155,255,.42–.85)`) |
| gradient keyword | `linear-gradient(90deg, #8FB3FF, #C7A6FF)` as text fill |
| status green | `#4ADE80` |
| Display font | Inter Tight 600/700/800, tight tracking (−0.04em to −0.05em) |
| Mono font | JetBrains Mono 400/500, labels in uppercase with letter-spacing .12–.2em |
| Radius | 18px cards · 999px chips and buttons |
| Fluid type | `clamp()` everywhere, e.g. hero title `clamp(50px, 11vw, 100px)` |
| Touch targets | ≥ 44px |

Highlight vocabulary (use consistently):
- **Gradient text** on one keyword per headline.
- **Highlighter band** (a background sweep at 32–42% height, bottom-aligned) behind key facts and the hero title.
- **Filled chip** for key skills; outline chip for the rest.

---

## 3. Tech stack

- Next.js (App Router, RSC) + TypeScript + Tailwind CSS. Deployed on Vercel (current domain: portfolio-ahmed-nasser.vercel.app).
- **GSAP** (core, ScrollTrigger, SplitText, `gsap.matchMedia()`, `useGSAP`). It is the only animation library. No anime.js and no Framer Motion in the bundle.
- **Lenis** on desktop only. Phones use native scroll.
- `<canvas>` frame scrubbing (desktop), or `<video>` seeking (low-end and phone fallback). See section 6.
- **ffmpeg** for slicing and re-encoding.
- **Higgsfield** via MCP: Nano Banana Pro for stills, Seedance 2.0 or Kling with start + end frames for clips.
- No Three.js in v1.

---

## 4. Content (source of truth)

**Identity:** Ahmed Nasser — Frontend Developer — Cairo, Egypt — available for work — 4+ years.
**Links:**
- email: ahmednnasser111@gmail.com
- GitHub: https://github.com/AhmedNnasser11
- LinkedIn: https://www.linkedin.com/in/ahmed-nasser-931490212
- npm: https://www.npmjs.com/~ahmednnasser111
- CV: `/Ahmed_Nasser_Frontend_Developer_CV.pdf`

**Core stack:** React.js, Next.js, TypeScript, JavaScript.
**Secondary:** Tailwind CSS, TanStack Query, Redux Toolkit, Zustand, REST, WebSockets, Vitest, Playwright.

In the lists below, `*stars*` mark the words that get the highlighter or the gradient.

| # | Layer | Title | Skills (**bold** = key chip) | Proof |
|---|---|---|---|---|
| 01 | Interface | Pixels people *touch* | **Figma to code**, Responsive design, **Accessibility (WCAG)**, Tailwind CSS, Shadcn/UI, MUI, Framer Motion, i18next · RTL | Figma designs turned into *production UI* for clients in *Saudi Arabia and Egypt*. |
| 02 | Components | Architecture that *scales* | React.js, **Next.js App Router**, **Server Components**, Server Actions, SSR · SSG · ISR, **TypeScript**, Design systems, Clean architecture | Built *Elli*, an enterprise school management platform, *single-handedly in about 6 months*. |
| 03 | Data | State, APIs, *real-time* | **TanStack Query**, Redux Toolkit, Zustand, REST APIs, **WebSockets**, Pusher, React Hook Form + Zod, **RBAC** | *RBAC* with Admin, Analyst and Viewer tiers for a *threat-intelligence SaaS* dashboard. |
| 04 | Shield | Security *by default* | **XSS prevention**, CSRF prevention, **Content Security Policy**, Input validation, Dependency audits, Auth & sessions | Published an *open-source security auditor* for Next.js App Router apps. |
| 05 | Engine | Fast *under load* | **Core Web Vitals**, Code splitting, Lazy loading, **Re-render optimization**, Technical SEO, GEO · AIO | Fixed an ERP page that *froze at 2,000 rows* by splitting the component and moving filters from state to *useRef*. |
| 06 | AI & Quality | Engineered with *AI agents*, tested | **Claude Code**, OpenCode, AI coding agents, Vitest, **Playwright**, GitLab CI/CD | Uses *AI coding agents daily* and publishes auditing skills for *security and SEO / GEO*. |

**Experience**

- **E2E County** · Jan 2026 – Present · On-site, Cairo
  - *Sole frontend developer* on Cyber-Guardian, a *threat-intelligence SaaS*: RBAC, advanced data tables, breach-trend analytics.
  - TravWare SaaS ERP and a flights & hotels booking engine *used in production* by travel clients.
- **INCode** · Feb 2024 – Dec 2025 · Hybrid, Cairo
  - *Sole frontend developer* owning production releases, change requests and hotfixes.
  - Dashboards for *Olimi.ai* (Voice AI, first client *Paymob*) and Beesly AI; built Elli in *about 6 months*; *led two junior developers*.
- **Mazeed** · Apr 2022 – Feb 2024 · Remote
  - Migrated legacy HTML, Bootstrap and jQuery products *to React* for Saudi clients including *Monsha'at* and *Takaful*.
  - Optimized *Core Web Vitals* across all platforms and mentored a junior developer.
- **Freelance** · Part-time, by referral
  - Ajzaa marketplace dashboard, *Baian AI* invoice extraction, Rayan Hajj water distribution platform.
  - Tourism platforms with Next.js SSR; Kenzy Tours and First Mas *rank on Google* for Hajj, Umrah and tourism searches.

**Selected work**

| Project | Description | Stack |
|---|---|---|
| Cyber-Guardian | Threat-intelligence SaaS: dark web surveillance, brand protection, incident management | Next.js · TypeScript · RBAC |
| TravWare | SaaS ERP and a flights & hotels booking engine with per-client branding | Next.js · TypeScript · REST |
| Olimi.ai | Voice AI dashboard: real-time analytics, call summaries, sentiment analysis | Next.js · TypeScript |
| Elli | Enterprise school platform: courses, quiz engines, scheduling, role-based permissions | Next.js · TypeScript |
| Ajzaa | Multi-tenant auto-parts marketplace: vendor & admin dashboards, live chat, delivery tracking | React.js · Redux · Pusher |
| Baian AI | AI invoice extraction with Zoho Books + Odoo / WhatsApp workflows | Next.js · Zoho Books · Odoo |

**Open source**
- Next.js & React Security Auditor — github.com/AhmedNnasser11/nextjs-react-security
- Next.js Architecture Lab — github.com/AhmedNnasser11/nextjs-architecture-lab
- Technical SEO & GEO Auditor — github.com/AhmedNnasser11/technical-seo-geo-claude-skill
- 6 NPM packages — npmjs.com/~ahmednnasser111

**Live demos opened from the layers:**
- Interface → EN / عربي switch with RTL
- Components → Architecture Lab link
- Data → Admin / Analyst / Viewer RBAC switch
- Shield → XSS playground
- Engine → "Break it / Fix it" (2,000-row table, real FPS / frame time / re-renders / layout shifts)
- AI & Quality → terminal replay of my auditors

---

## 5. Higgsfield assets

**Rule:** compose every frame with the subject inside the **center third**, so a 16:9 clip can be center-cropped to 9:16 for phones. If the crop cuts the subject, make 9:16 keyframes with **Image expansion** (see below) and generate phone clips from them.

**Style suffix (add to every prompt):**
```text
premium product commercial, pitch-black studio, soft top key light, subtle cool blue (#6E9BFF) rim light, glossy reflections on a dark floor, subject centered in the middle third of the frame, ultra sharp, photoreal 3D render, no text, no logos, no people, 16:9
```

**Layers phrase:**
```text
six thin floating panels evenly spaced in depth: a clear glass panel showing a dark website UI in front, then a panel of dashed blue wireframe boxes, then a dark panel with flowing data lines, then a transparent hexagon-patterned shield panel, then a panel with three glowing circular gauges, and at the back a dark circuit board with one glowing chip in the center
```

**Keyframes** (each made from the previous one so they match):
- **K1:** `A closed slim aluminium laptop resting on a low black pedestal, three-quarter front view, + style suffix`
- **K2:** `The same laptop from the same camera angle, lid open, the screen glowing with a dark modern website, + style suffix`
- **K3:** `The laptop screen has lifted off the base and exploded into + layers phrase, floating above the open laptop base, three-quarter view from the left, + style suffix`
- **K4:** `The exact same exploded stack, camera orbited 35 degrees to the right, same lighting, + style suffix`
- **K5:** `A single modern smartphone floating upright above the pedestal, screen glowing with a dark website, soft light rays, + style suffix`

**Clips** (start + end frame, 1080p, 5–6 s). Add to each:
```text
One continuous take, constant smooth speed, locked steady camera except the stated move, no cuts, no shake, no warping, no text. Must look good paused and played in reverse.
```
- **A (K1→K2):** `The laptop lid slowly opens and the screen lights up; the camera stays still.`
- **B (K2→K3):** `The screen lifts off and separates into six thin panels that spread evenly in depth; the camera slowly moves slightly left.`
- **C (K3→K4):** `The camera slowly orbits 35 degrees around the floating stack; the panels stay perfectly still.` *(desktop only)*
- **D (K3→K5):** `The six panels slide back together and fold into a single smartphone that rises and floats upright; the laptop base fades into darkness.`

**Budget:** about 300–400 credits including retries. Approve all 5 keyframes before generating any clip.

### Higgsfield features to use (beyond plain prompts)
Some of these live only in the Higgsfield web app, not in the MCP. When a tool is not exposed through the MCP, I make that asset in the web app and drop it into `/assets-src`. Feature access depends on the plan.

| Feature | Use it for |
|---|---|
| **Cinema Studio** (AI Director + per-shot camera controls: dolly, truck, pan, tilt) | Plan clips A–D as one coherent sequence with exact camera moves, instead of describing the camera in text |
| **Angles 2.0** (change the camera angle of a subject) | Make **K4** (orbit view) from K3, so the stack looks identical from the new angle and costs less than a new generation |
| **Image expansion** (outpaint) | Turn the 16:9 keyframes into **9:16 phone versions** without regenerating, then use them as start/end frames for phone clips, which is better than center-cropping |
| **Visual Effects library** (transformations, explosions, stylized transitions) | Try a preset for clip B (the explode) and for a section transition |
| **Topaz upscaling** | Generate keyframes and clips at 1080p (cheaper), then upscale K1/K3/K5 posters for sharp desktop/retina |
| **Video background removal** | Optional: put the stack on a clean background. Simpler default: keep the video's pure black and set the page background to the exact same black so there is no visible edge |
| **Soul ID + Multi Reference** | Keep the laptop and the six layers identical across every frame; and, if I add a photo of myself, keep my face consistent |
| **AI Headshot Generator** | Optional professional headshot for the Contact section / OG image, made from my real photos |
| **Marketing Studio → URL-to-video** ("hyper motion" / "TV spot" presets) | After deploy: turn the live portfolio URL into a promo reel for Instagram, alongside the real screen recording |
| **Editorial Motion Graphics skill** | Short faceless reels about single skills (e.g. "how I fixed a 2,000-row freeze") to drive traffic to the portfolio |
| **History & assets** (reuse past generations as references) | Feed approved keyframes back in as references so later shots match |

Limits: images up to 4K, videos up to 15 s per clip, video jobs are asynchronous (poll for the result), and the model field is a hint, since Higgsfield may route the job to another model.

---

## 6. Mobile-first performance budget (hard limits)

### Targets (measured on a mid-range Android profile: 4× CPU slowdown + Slow 4G)
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100
- LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.05, TBT ≤ 200 ms
- First-view transfer ≤ 1 MB (HTML + CSS + fonts + JS + poster). Initial JS ≤ 150 KB gzip.
- Scrolling stays at ~60 fps with no long tasks over 50 ms while scrubbing.

### Rules
1. **LCP is text.** The final hero HTML is server-rendered and present in the DOM from the first byte. The intro reel only overlays it. If JS fails, the final hero is still readable.
2. **Fonts:** `next/font`, two families only, Latin subset, `display: swap`. Preload only the 800 display weight.
3. **Media by device** (decide once at start with `gsap.matchMedia()` + `navigator.deviceMemory` / `hardwareConcurrency` / `Save-Data`):

   | Device | Media |
   |---|---|
   | Desktop | WebP frame sequences, 1600px, ~24 fps of source |
   | Phone | 9:16 center-crop, 720px wide, ~15 fps of source (60–90 frames per clip), WebP quality ~70 |
   | Low-end phone (≤ 4 GB RAM, ≤ 4 cores, or Save-Data) | H.264 `<video>` with a keyframe on every frame, seeked by scroll, or static K2/K3/K5 images |

4. **Memory:** never keep all frames decoded. Keep a sliding window of decoded `ImageBitmap`s (current ±12 frames) and call `.close()` on the rest. iOS Safari crashes when canvas memory gets too high.
5. **Loading:** the h1 paints first; the hero laptop canvas draws K1 after load + idle, then clip A frames (phone or desktop set) load at idle and play once in the hero after the intro. Clip B frames load when the stage engine starts (first scroll intent); C and D stream only when the user gets near them. Never show a full-page loader.
6. **Canvas:** backing size = CSS size × `min(devicePixelRatio, 1.5)` on phones (2 on desktop). Draw only when the frame index changes. Use one rAF loop (the `gsap.ticker`), paused when the tab is hidden or the stage is off screen.
7. **Animate only `transform` and `opacity`.** On phones: no `filter: blur`, no `backdrop-filter`, no animated `box-shadow`, no `-webkit-text-stroke` on large text, and no CSS 3D `preserve-3d` stacks. The mockup uses blur and CSS 3D for presentation only; real site = video frames + 2D overlays.
8. **Scroll:** Lenis on desktop only. Use `ScrollTrigger.config({ ignoreMobileResize: true })`. Pinned stage height uses `100svh` (not `100vh`) to avoid address-bar jumps. Use `scrub: true` with light smoothing; no heavy `normalizeScroll`.
9. **Fewer moving parts on phones:** chip stagger ≤ 6 items, no mouse orbit (skip clip C), no labels on the stack, bottom-sheet panel.
10. **Code splitting:** every live demo (`Break it`, XSS lab, RBAC, terminal) is `next/dynamic` and loads on open. No third-party scripts except Vercel Analytics (optional).
11. **Images:** `next/image`, AVIF/WebP, correct `sizes`, real screenshots compressed to ≤ 120 KB each.
12. **Accessibility:** `prefers-reduced-motion` → no intro animation (show the final hero), no scrubbing (static K2/K3/K5), hero laptop = K2 still (no clip A, float, sweep, tilt or handoff), all content the same. Keyboard focus visible. Text contrast AA.
12b. **Intro shapes and hero laptop motion:** shapes are inline SVG (straight grid lines may be 1px elements scaled with `transform`). Animate only `transform` and `opacity`; `stroke-dashoffset` only on small SVG strokes (chip wireframes, ring, shield, map line). No blur, filters, `backdrop-filter` or video for the shapes. The whole intro is **one GSAP timeline**; GSAP still loads after first paint (never in the initial bundle), so S1 is static HTML until it arrives, and the intro skips itself if GSAP fails to load. The `h1` stays the LCP element (the hero laptop is a `<canvas>`, drawn after load + idle), CLS stays 0. The laptop loops (float, sweep, tilt, dot pulse) run on the `gsap.ticker`/CSS and pause off-screen (IntersectionObserver) and when the tab is hidden.
13. **Security headers without killing performance:** keep the page **statically generated** (CDN-cached, fastest LCP). Do **not** use nonce-based CSP: per the Next.js CSP guide, nonces force dynamic rendering on every request (no static generation, no CDN cache, slower loads). Instead, set the CSP in `next.config` `headers()` and use Next.js's hash-based **Subresource Integrity** (`experimental.sri`). If SRI is not stable enough in the installed version, fall back to the documented "without nonces" CSP. Also set `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `frame-ancestors 'none'`.
14. **SEO:** metadata, OG image, JSON-LD `Person` + `WebSite`, `sitemap.xml`, `robots.txt`, `llms.txt`. The `h1` is "Ahmed Nasser — Frontend Developer".

---

## 7. Tools to install (once)

Review each third-party skill's `SKILL.md` before installing; skills are instructions the agent will follow.

```bash
# Higgsfield: MCP + official skills (generate, soul, product-photoshoot)
claude mcp add --transport http --scope user higgsfield https://mcp.higgsfield.ai/mcp
npx skills add higgsfield-ai/skills

# GSAP official skills (core, timeline, scrolltrigger, plugins, react, performance…)
npx skills add https://github.com/greensock/gsap-skills
#   (or inside Claude Code: /plugin marketplace add greensock/gsap-skills, then /plugin to install them)

# Vercel: React/Next.js performance rules + UI/accessibility audit
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines

# Anthropic: frontend design planning (inside Claude Code)
/plugin marketplace add anthropics/claude-code
/plugin install frontend-design@claude-code-plugins

# Chrome DevTools MCP: real performance traces, CPU/network throttling (mobile testing)
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest

# Playwright MCP: browser testing at phone sizes
claude mcp add playwright -- npx -y @playwright/mcp@latest

# Remotion skills: build the Instagram reel from screen recordings + motion titles
npx skills add remotion-dev/skills

# My own auditors
#   github.com/AhmedNnasser11/nextjs-react-security
#   github.com/AhmedNnasser11/technical-seo-geo-claude-skill

# ffmpeg
sudo apt install ffmpeg   # macOS: brew install ffmpeg · Windows: winget install ffmpeg

# My CV inside the project (source of truth for facts + the Download CV button)
cp Ahmed_Nasser_Frontend_Developer_CV.pdf public/Ahmed_Nasser_Frontend_Developer_CV.pdf
```
After installing, restart Claude Code and check with `/mcp` and `/plugin` that everything is loaded.

Reference only (do not copy its defaults): `github.com/zubair-trabzada/scroll-cinematic-claude`. Its scrub engine is a good starting point, but its default of ~180 JPGs per clip at 1600px / q88 is far too heavy for phones. Section 6 overrides it.

---

## 8. Build prompts (send one at a time; review in the browser after each)

**P1 — Plan (Plan Mode)**
```text
Read CLAUDE.md fully, then read the official docs linked in section 11 for Next.js, GSAP (ScrollTrigger, matchMedia, React), Tailwind responsive design, and web.dev Core Web Vitals. Make an implementation plan only, citing which doc each decision comes from: folder structure (feature-based), components per chapter, the media pipeline, the device-tier logic from section 6, and the order of work. List every Higgsfield call with model, aspect ratio, duration and estimated credits. No code yet.
```

**P2 — Content first, no animation**
```text
Build the whole site as static, server-rendered, mobile-first HTML with the tokens from section 2 and the content from section 4: sticky header, final hero (no intro yet), a placeholder stage with the K1 poster, the 6 layer panels as a plain list, The full stack, Experience, Selected work, Open source, Contact. Fluid type with clamp(), 44px targets, no horizontal scroll at 360px. Add metadata, JSON-LD, sitemap, robots, llms.txt and the security headers exactly as section 6 rule 13 says (static page, no nonces). Run Lighthouse mobile and show me the scores.
```

**P3 — Higgsfield assets**
```text
Using the Higgsfield MCP, create K1–K5 from section 5 (show me each prompt and its credit cost and wait for my OK). After I approve all five, create clips A–D with start and end frames. Save everything in /assets-src.
```

**P4 — Media pipeline**
```text
Write scripts/media.sh that, for each clip, produces:
- desktop frames:  ffmpeg -i in.mp4 -vf "fps=24,scale=1600:-2" -c:v libwebp -quality 75 -an out/d/%03d.webp
- phone frames:    ffmpeg -i in.mp4 -vf "fps=15,crop=ih*9/16:ih,scale=720:-2" -c:v libwebp -quality 70 -an out/m/%03d.webp
- low-end video:   ffmpeg -i in.mp4 -vf "crop=ih*9/16:ih,scale=720:-2" -c:v libx264 -preset veryfast -crf 26 -g 1 -pix_fmt yuv420p -movflags +faststart -an out/m.mp4
- posters K1/K3/K5 as AVIF (desktop 1600px, phone 720px 9:16).
Report the total weight per clip and per device.
```

**P5 — Scroll engine + intro reel**
```text
Implement chapter 0 (intro reel) and chapters 2–4 from section 1 with GSAP: a timeline for the intro (skip on scroll, Skip/Replay button, reduced-motion = final hero immediately), and a pinned 100svh stage whose scroll progress drives the frame index (lerp, both directions). Follow every rule in section 6: device tiers, sliding-window ImageBitmap cache with close(), DPR cap, draw only on index change, one gsap.ticker loop, Lenis on desktop only, no blur or 3D on phones.
```

**P6 — Inspect + demos**
```text
Implement chapter 3 (Inspect): 6 scroll steps with the enter/exit choreography from section 1 (number + name mask reveal, gradient keyword, staggered chips with key chips filled, highlighter sweep on PROOF, exit up + fade). Desktop: panel on the left, labels on the stack, mouse X scrubs clip C. Phone: bottom sheet, no labels, no orbit. Tapping a layer jumps to its step and opens its live demo (next/dynamic) from section 4.
```

**P7 — Mobile performance pass**
```text
Using the Chrome DevTools MCP: emulate a mid-range phone (390×844, 4× CPU, Slow 4G), trace the homepage load and a full scroll through all chapters. Fix everything until section 6 targets pass. Show before/after LCP, INP, CLS, TBT, transfer size, peak JS heap, and the longest task during scrubbing. Then do the same at desktop size.
```

**P8 — Quality + audits**
```text
1) Run vercel-react-best-practices and web-design-guidelines on the codebase and fix the findings.
2) Run my security auditor and my SEO/GEO auditor and fix the findings.
3) Playwright tests at 360, 390, 768 and 1440: intro skip/replay, every chapter renders, layer taps open demos, EN/AR RTL works, keyboard-only navigation, reduced-motion mode, no console errors, no horizontal scroll.
4) Check every fact on the site against public/Ahmed_Nasser_Frontend_Developer_CV.pdf and list anything that is not in it.
```

**P9 — Deploy**
```text
Prepare for Vercel: OG image (1200×630, from K3 + my name + "Frontend Developer"), favicon, 404 page, environment variables. Commit with clear messages and give me the steps to deploy to portfolio-ahmed-nasser.vercel.app. Do not deploy without my OK.
```

---

## 9. Final QA checklist
- [ ] In the first 3 s on a phone I can read: Frontend Developer · Cairo, Egypt · 4+ years · React.js · Next.js · TypeScript · JavaScript
- [ ] Skip intro works, and any scroll skips it
- [ ] The header shows name + title on every scroll position
- [ ] Lighthouse mobile ≥ 90 / 95 / 95 / 100 on the production build
- [ ] No jank while scrubbing on a real low-end Android and on iPhone Safari; no crash after scrolling up and down 5 times
- [ ] Reduced-motion and Save-Data show the static version with all content
- [ ] Every fact matches the CV; every screenshot is real

---

## 10. The Instagram reel
Make this only **after** the site is deployed. You end up with two reels.

**Reel 1 — real screen recording (main post)**
Screen-record the **real** site on a phone (60 fps): the intro reel → the laptop opening → the explode → swipe through 2–3 layers → tap "Engine" → "Break it / Fix it". Then use the Remotion skills to add a 1-second intro title and an end card with the URL.

**Reel 2 — Higgsfield Marketing Studio (promo)**
In Higgsfield → Marketing Studio → **URL-to-video**, paste the live portfolio URL (portfolio-ahmed-nasser.vercel.app). Try the **"Hyper motion"** and **"TV spot"** presets, in **9:16**. Use the K1–K5 keyframes as references so the style matches the site. Review it before posting: all text must match the site and the CV (Frontend Developer · Cairo, Egypt · 4+ years · React.js · Next.js · TypeScript · JavaScript), with no invented claims or numbers. Post it 3–5 days after Reel 1, with the same link in bio.

Both reels end on the same end card: name, "Frontend Developer", and the URL. Always show the real site; never a generated fake of a site that doesn't exist.

**P10 — Reels (after deploy)**
```text
The site is live. 1) Using the Remotion skills, take my screen recording in /reel/raw.mp4 (9:16) and add a 1 s title card "Ahmed Nasser — Frontend Developer" and a 2 s end card with the URL, in the site's tokens; render 1080×1920 MP4. 2) Using the Higgsfield MCP (ask before spending credits), if Marketing Studio / URL-to-video is available through the MCP, make a 9:16 promo from the live URL with the "Hyper motion" preset and K1–K5 as references; if it is not available through the MCP, tell me and I will make it in the Higgsfield web app. Check every word on screen against the CV.
```

---

## 11. Best-practice sources (read before implementing)

**Claude Code itself**
- Overview: https://code.claude.com/docs/en/overview
- CLAUDE.md / memory: https://code.claude.com/docs/en/memory
- MCP servers: https://code.claude.com/docs/en/mcp
- Skills: https://code.claude.com/docs/en/skills

**Next.js**
- Docs home: https://nextjs.org/docs
- Production checklist: https://nextjs.org/docs/app/guides/production-checklist
- Image component: https://nextjs.org/docs/app/api-reference/components/image
- Font optimization: https://nextjs.org/docs/app/api-reference/components/font
- Lazy loading / `next/dynamic`: https://nextjs.org/docs/app/guides/lazy-loading
- Metadata & OG images: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Content Security Policy: https://nextjs.org/docs/app/guides/content-security-policy

**React & TypeScript**
- React docs: https://react.dev/learn
- You might not need an effect: https://react.dev/learn/you-might-not-need-an-effect
- `useRef`: https://react.dev/reference/react/useRef
- TypeScript handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- `strict` mode: https://www.typescriptlang.org/tsconfig/#strict
- Vercel React/Next.js best practices (skill repo): https://github.com/vercel-labs/agent-skills

**Tailwind CSS (mobile first)**
- Responsive design (mobile-first breakpoints): https://tailwindcss.com/docs/responsive-design
- Docs home: https://tailwindcss.com/docs

**GSAP & smooth scroll**
- GSAP docs: https://gsap.com/docs/v3/
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- `gsap.matchMedia()` (different animations per device): https://gsap.com/docs/v3/GSAP/gsap.matchMedia()
- GSAP + React (`useGSAP`): https://gsap.com/resources/React/
- SplitText: https://gsap.com/docs/v3/Plugins/SplitText/
- Most common GSAP mistakes: https://gsap.com/resources/mistakes/
- GSAP official agent skills: https://github.com/greensock/gsap-skills
- Lenis: https://github.com/darkroomengineering/lenis

**Performance (Core Web Vitals, animation, canvas)**
- Web Vitals: https://web.dev/articles/vitals
- Optimize LCP: https://web.dev/articles/optimize-lcp
- Optimize INP: https://web.dev/articles/optimize-inp
- Optimize CLS: https://web.dev/articles/optimize-cls
- High-performance animations: https://web.dev/articles/animations-guide
- Compositor-only properties & layer count: https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count
- Rendering performance: https://web.dev/articles/rendering-performance
- Optimizing canvas (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
- `ImageBitmap.close()`: https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap/close
- `requestIdleCallback`: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
- `navigator.deviceMemory`: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory
- Viewport units (`svh` / `dvh`): https://developer.mozilla.org/en-US/docs/Web/CSS/length
- Chrome DevTools Performance panel: https://developer.chrome.com/docs/devtools/performance
- Lighthouse: https://developer.chrome.com/docs/lighthouse/overview
- Chrome DevTools MCP: https://github.com/ChromeDevTools/chrome-devtools-mcp

**Video & media**
- FFmpeg documentation: https://ffmpeg.org/ffmpeg.html
- H.264 encoding guide: https://trac.ffmpeg.org/wiki/Encode/H.264
- Higgsfield CLI & skills: https://higgsfield.ai/creator-hub/help-center/integrations/how-do-i-access-higgsfield-via-cli
- Higgsfield skills hub: https://higgsfield.ai/skills
- Higgsfield video models: https://higgsfield.ai/ai-video
- Higgsfield MCP: https://higgsfield.ai/mcp
- Remotion docs (reel): https://www.remotion.dev/docs

**Accessibility**
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- Vercel Web Interface Guidelines: https://vercel.com/design/guidelines

**Security**
- OWASP XSS Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
- OWASP CSP Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
- MDN CSP: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

**SEO / GEO**
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- schema.org Person: https://schema.org/Person
- llms.txt: https://llmstxt.org/

**Testing & deploy**
- Playwright best practices: https://playwright.dev/docs/best-practices
- Vitest guide: https://vitest.dev/guide/
- Vercel docs: https://vercel.com/docs
