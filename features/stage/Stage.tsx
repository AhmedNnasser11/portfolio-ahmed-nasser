import { LayerPanels } from "@/features/inspect/LayerPanels";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Poster } from "./Poster";
import { StageBoot } from "./StageBoot";

/**
 * Chapters 2–4 (Teardown → Inspect → Reassemble).
 * Scroll mode (JS on, motion OK): a 700svh wrapper with a sticky stage; the
 * engine scrubs canvas frames (desktop/phone) or crossfades K1/K3/K5 (low).
 * Static mode (no JS, reduced motion, ?tier=static): plain flow with the K3
 * still — same HTML, different CSS (globals.css "stage" block).
 */
export function Stage() {
  return (
    <>
      <section id="layers" aria-labelledby="layers-title" className="stage">
        <div className="stage-sticky">
          <div className="stage-media">
            <Poster name="k1" alt="" />
            <Poster
              name="k3"
              alt="The website taken apart into six floating layers above the laptop: interface, components, data, shield, engine, and a circuit board for AI and quality"
            />
            <Poster name="k5" alt="" />
            <canvas aria-hidden="true" />
          </div>
          <div className="stage-head mx-auto w-full max-w-7xl px-4 pt-10 md:px-8 md:pt-14">
            <SectionHeading
              id="layers-title"
              eyebrow="Teardown · 6 layers"
              title="Every interface is a *stack.*"
            />
          </div>
          <p className="stage-assembled px-4 pb-8 text-center text-[clamp(24px,6vw,44px)] leading-tight font-extrabold tracking-[-0.04em]">
            Assembled. <span className="grad">Shipped.</span>
            <span className="mt-2 block font-mono text-[13px] font-medium tracking-[0.16em] text-subtle uppercase">
              Keep scrolling ↓
            </span>
          </p>
        </div>
        <StageBoot targetId="layers" />
      </section>

      <section
        aria-label="The six layers"
        className="mx-auto max-w-7xl px-4 pt-6 pb-16 md:px-8 md:pb-24"
      >
        <LayerPanels />
      </section>
    </>
  );
}
