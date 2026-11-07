import { profile } from "@/content/profile";

/**
 * Chapter 0 — intro reel (~9.3 s), CSS keyframes only (globals.css "intro"):
 * it starts at first paint with zero JS and animates transform/opacity only.
 * aria-hidden: the hero underneath holds the same facts as real content.
 * Hidden with JS off (@media scripting: none), with reduced motion, and once
 * html[data-intro="done"] (IntroToggle). The S1 fact line puts every HR fact
 * on screen at 0 s (CLAUDE.md rule 0.1).
 */
export function IntroReel() {
  return (
    <div id="intro" className="intro" aria-hidden="true">
      <div className="intro-bars">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="intro-bar">
            <span style={{ "--i": i } as React.CSSProperties} />
          </span>
        ))}
      </div>

      {/* S1 — visible at first paint (no enter animation) */}
      <div className="intro-scene s1">
        <p className="intro-title">
          <span className="intro-sweep">Frontend</span>
          <br />
          <span className="intro-sweep">Developer</span>
        </p>
        <p className="intro-sub">
          <span className="size-2 rounded-full bg-ok" /> {profile.location}
        </p>
      </div>

      {/* S2 — "4+" counting up (odometer: translateY steps, compositor-only) */}
      <div className="intro-scene s2">
        <div className="intro-in">
        <p className="intro-years">
          <span className="odo">
            <span>
              0<br />1<br />2<br />3<br />4
            </span>
          </span>
          +
        </p>
        <p className="intro-lines">
          <span className="ml"><span style={{ "--i": 0 } as React.CSSProperties}>years shipping</span></span>
          <span className="ml"><span style={{ "--i": 1 } as React.CSSProperties}>production frontends</span></span>
        </p>
        </div>
      </div>

      {/* S3 — core stack */}
      <div className="intro-scene s3">
        <div className="intro-in">
        <p className="mono-label mb-5">Core stack</p>
        <ul className="intro-chips">
          {profile.coreStack.map((s, i) => (
            <li key={s} style={{ "--i": i } as React.CSSProperties}>
              {s}
            </li>
          ))}
        </ul>
        </div>
      </div>

      {/* S4 — what and for whom */}
      <div className="intro-scene s4">
        <div className="intro-in">
        <p className="intro-lines">
          <span className="ml"><span style={{ "--i": 0 } as React.CSSProperties}>Enterprise SaaS <span className="grad">dashboards</span></span></span>
          <span className="ml"><span style={{ "--i": 1 } as React.CSSProperties}>Performance · Security</span></span>
          <span className="ml"><span className="intro-small" style={{ "--i": 2 } as React.CSSProperties}>for clients in Saudi Arabia &amp; Egypt</span></span>
        </p>
        </div>
      </div>

      <p className="intro-facts">
        {profile.location} · {profile.years} years · {profile.coreStack.join(" · ")}
      </p>
    </div>
  );
}
