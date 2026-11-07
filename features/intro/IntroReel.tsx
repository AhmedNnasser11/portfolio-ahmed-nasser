import { profile } from "@/content/profile";

/**
 * Chapter 0 — intro reel (~14 s), a trailer for the six layers (CLAUDE.md §1).
 * One GSAP timeline (intro-timeline.ts, loaded after first paint) drives it.
 * Server-rendered: the story bars, S1 and the fact line, readable at first
 * paint before GSAP arrives (rule 0.1); S1's shapes start hidden in CSS.
 * S2–S4 only exist while the timeline runs, so the lazy chunk inserts them
 * (scenes-html.ts): less HTML, RSC payload and hydration work (TBT).
 * Shapes: 1px grid lines and bordered frames (transform only) plus small
 * inline SVGs (pin, ring, chip wireframes, bars, shield, map line).
 * aria-hidden: the hero underneath holds the same facts as real content.
 */
export function IntroReel() {
  return (
    <div id="intro" className="intro" aria-hidden="true">
      <div className="intro-bg" />
      <div className="intro-bars">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="intro-bar">
            <span />
          </span>
        ))}
      </div>

      {/* S1 — FRONTEND / DEVELOPER, grid frame, highlighter, pin on Cairo */}
      <div className="intro-scene s1">
        <div className="intro-cam">
          <div className="s1-box">
            <div className="s1-frame">
              <span className="gl gl-h gl-t" />
              <span className="gl gl-h gl-b" />
              <span className="gl gl-v gl-l" />
              <span className="gl gl-v gl-r" />
            </div>
            <p className="intro-title" data-t>
              Frontend
              <br />
              <span className="intro-sweep">Developer</span>
            </p>
          </div>
          <p className="intro-sub" data-t>
            <svg className="s1-pin" viewBox="0 0 16 22" width="16" height="22">
              <path d="M8 21s7-7.2 7-12.5A7 7 0 0 0 1 8.5C1 13.8 8 21 8 21Z" fill="#6E9BFF" />
              <circle cx="8" cy="8.5" r="2.6" fill="#08090B" />
            </svg>
            {profile.location}
          </p>
        </div>
      </div>

      {/* S2–S4 are inserted by the lazy timeline chunk (scenes-html.ts). */}

      <p className="intro-facts">
        {profile.location} · {profile.years} years · {profile.coreStack.join(" · ")}
      </p>
    </div>
  );
}
