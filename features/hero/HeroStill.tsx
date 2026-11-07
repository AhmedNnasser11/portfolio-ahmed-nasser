/**
 * Desktop hero laptop (K1). A server-rendered <canvas>; StageBoot draws K1 on
 * it after load + idle (one client island instead of two, for the JS budget).
 * A canvas is not an LCP candidate, so the h1 stays the LCP element, and
 * decoding never competes with first paint. Phones skip it: the stage right
 * below the hero is the laptop there. <noscript> keeps a plain image.
 */
export const HERO_STILL_SRC = "/media/posters/k1-d.avif";

export function HeroStill() {
  return (
    <div className="relative hidden aspect-[1600/892] lg:block">
      <canvas
        id="hero-still"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 data-[ready]:opacity-100"
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_STILL_SRC}
          width={1600}
          height={892}
          alt="A closed aluminium laptop on a black pedestal in a dark studio"
          className="h-auto w-full"
        />
      </noscript>
    </div>
  );
}
