// Six teaser dots around the laptop, in % of the desktop frame (k1-d, 1600×892,
// the full 1928×1076 source). The phone frame (k1-m) is the source crop
// x 320–1600 at full height (scripts/media.sh), so y is the same and x maps.
const DOTS = [
  { x: 40, y: 31 },
  { x: 74, y: 40 },
  { x: 78, y: 57 },
  { x: 58, y: 64 },
  { x: 21, y: 53 },
  { x: 23, y: 39 },
];
const toPhoneX = (x: number) => ((x * 19.28 - 320) / 12.8).toFixed(1);

/**
 * Hero laptop (chapter 1), server-rendered so its box is reserved (CLS 0).
 * The K1 frame is drawn on a <canvas> after load + idle by laptop.ts: a canvas
 * is not an LCP candidate, so the h1 stays the LCP element. laptop.ts also runs
 * the idle float, the desktop tilt and the scroll handoff onto the stage's
 * first frame (.lap-move); CSS runs the lid light sweep and the dot pulse.
 * Desktop: right column. Phones: below the text. <noscript> keeps a plain image.
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
              <source media="(min-width: 48rem)" srcSet="/media/posters/k1-d.avif" type="image/avif" width={1600} height={892} />
              <img
                src="/media/posters/k1-m.avif"
                width={720}
                height={606}
                alt="A closed aluminium laptop on a black pedestal in a dark studio"
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
