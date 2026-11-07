import { layers } from "@/content/layers";
import { LayerHotspots } from "@/features/inspect/LayerHotspots";
import { LayerPanels } from "@/features/inspect/LayerPanels";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Poster } from "./Poster";
import { StageBoot } from "./StageBoot";

/**
 * Chapters 2–4 (Teardown → Inspect → Reassemble).
 * Scroll mode (JS on, motion OK): a 700svh wrapper with a sticky stage; the
 * engine scrubs canvas frames (desktop/phone) or crossfades K1/K3/K5 (low),
 * and steps through the six Inspect panels during the hold (33–88 %).
 * Static mode (no JS, reduced motion, ?tier=static): plain flow with the K3
 * still and the six panels as a list — same HTML, different CSS.
 */
export function Stage() {
  return (
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
          <LayerHotspots />
        </div>

        <div className="stage-head mx-auto w-full max-w-7xl px-4 pt-10 md:px-8 md:pt-14">
          <SectionHeading
            id="layers-title"
            eyebrow="Teardown · 6 layers"
            title="Every interface is a *stack.*"
          />
        </div>

        <nav className="stage-progress" aria-label="Layer steps">
          <p className="stage-count mono-label" aria-live="polite">
            Layer 01 / 06
          </p>
          <ol className="stage-dots">
            {layers.map((layer, i) => (
              <li key={layer.id}>
                <button
                  type="button"
                  className="stage-dot"
                  data-jump={i}
                  aria-label={`Layer ${layer.number}: ${layer.name}`}
                >
                  <span aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="stage-panels-wrap mx-auto w-full max-w-7xl px-4 pt-6 pb-16 md:px-8 md:pb-24">
          <LayerPanels />
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
  );
}
