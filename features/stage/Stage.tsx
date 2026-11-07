import { LayerPanels } from "@/features/inspect/LayerPanels";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Poster } from "./Poster";

/**
 * Chapters 2–4 (Teardown → Inspect → Reassemble), P2 static version.
 * P5 turns this into the sticky 100svh scroll stage; the HTML here stays the
 * no-JS / reduced-motion fallback.
 */
export function Stage() {
  return (
    <section
      id="layers"
      aria-labelledby="layers-title"
      className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <SectionHeading
        id="layers-title"
        eyebrow="Teardown · 6 layers"
        title="Every interface is a *stack.*"
      />

      {/* No frame around the still: its black is graded to the page bg so there is no visible edge (§5). */}
      <div className="mb-10 md:mb-14">
        <div className="mx-auto max-w-4xl">
          <Poster
            name="k3"
            alt="The website taken apart into six floating layers above the laptop: interface, components, data, shield, engine, and a circuit board for AI and quality"
          />
        </div>
      </div>

      <LayerPanels />

      <p className="mt-14 text-center text-[clamp(24px,6vw,44px)] leading-tight font-extrabold tracking-[-0.04em]">
        Assembled. <span className="grad">Shipped.</span>
        <span className="mt-2 block font-mono text-[13px] font-medium tracking-[0.16em] text-subtle uppercase">
          Keep scrolling ↓
        </span>
      </p>
    </section>
  );
}
