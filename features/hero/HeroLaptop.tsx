// Six teaser dots on the open laptop, in % of the desktop frame (K2 = last
// frame of clip A, 1600×892, the full 1928×1076 source): screen nav, screen
// panel, screen card, palm rest, base front, pedestal. The phone frame is the
// source crop x 320–1600 at full height (scripts/media.sh), so y is the same and x maps.
const DOTS = [
  { x: 47, y: 10 },
  { x: 72, y: 20 },
  { x: 51, y: 33 },
  { x: 37, y: 46 },
  { x: 66, y: 50 },
  { x: 57, y: 62 },
];
const toPhoneX = (x: number) => ((x * 19.28 - 320) / 12.8).toFixed(1);

/**
 * Hero laptop (chapter 1), server-rendered so its box is reserved (CLS 0).
 * laptop.ts draws K1 (closed) on a <canvas> after load + idle (a canvas is not
 * an LCP candidate, so the h1 stays the LCP element), plays clip A once after
 * the intro so it rests open on K2, and runs the float, the desktop tilt and the
 * scroll handoff onto the stage's first frame (.lap-move). CSS runs the screen
 * light sweep and the dot pulse once the laptop is open ([data-open]).
 * Desktop: right column. Phones: below the text. <noscript>: the K2 still.
 */
export function HeroLaptop() {
  return (
    <div id="hero-laptop" className="hero-laptop">
      <div className="lap-move">
        <div className="lap-box">
          <canvas aria-hidden="true" />
          <div className="lap-sweep" aria-hidden="true">
            <span />
          </div>
          <div className="lap-dots" aria-hidden="true">
            {DOTS.map((d, i) => (
              <span
                key={i}
                className="lap-dot"
                style={{ "--x": `${d.x}%`, "--xm": `${toPhoneX(d.x)}%`, "--y": `${d.y}%`, "--i": i } as React.CSSProperties}
              />
            ))}
          </div>
          <noscript>
            <picture>
              <source media="(min-width: 48rem)" srcSet="/media/posters/k2-d.avif" type="image/avif" width={1600} height={892} />
              <img
                src="/media/posters/k2-m.avif"
                width={720}
                height={606}
                alt="An open aluminium laptop on a black pedestal, its screen showing a dark website"
                className="h-auto w-full"
              />
            </picture>
          </noscript>
        </div>
      </div>
      <a href="#layers" className="lap-link">
        6 layers inside <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
