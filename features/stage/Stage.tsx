import { LayerPanels } from "@/features/inspect/LayerPanels";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { StackPoster } from "./StackPoster";

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

      <div className="mb-10 overflow-hidden rounded-(--radius-card) border border-line bg-bg md:mb-14">
        <StackPoster className="mx-auto h-auto w-full max-w-3xl" />
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
