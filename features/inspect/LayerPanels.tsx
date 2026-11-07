import { layers } from "@/content/layers";
import { Chip } from "@/shared/ui/Chip";
import { Marked } from "@/shared/ui/Marked";

/**
 * Chapter 3 (Inspect). One server-rendered list, two presentations (globals.css):
 * - static mode (no JS, reduced motion): a plain grid of six cards;
 * - scroll mode: the cards are stacked in one grid cell inside the sticky stage
 *   (no CLS: the cell is as tall as the tallest card); the engine sets
 *   data-state="past|active|next" and CSS runs the enter/exit choreography.
 * Desktop: panel on the left. Phone: bottom sheet above the tab bar.
 */
export function LayerPanels() {
  return (
    <ol className="stage-panels grid gap-4 md:grid-cols-2 lg:gap-6" aria-label="The six layers">
      {layers.map((layer, i) => (
        <li key={layer.id} className="stage-panel" data-step={i}>
          <article
            id={`layer-${layer.id}`}
            aria-labelledby={`layer-${layer.id}-title`}
            className="panel-card h-full rounded-(--radius-card) border border-line bg-surface p-5 md:p-7"
          >
            <div className="mb-3 flex items-baseline gap-4 md:mb-4">
              <span
                aria-hidden="true"
                className="panel-num text-[48px] leading-none font-extrabold tracking-[-0.05em] text-subtle md:text-[56px] lg:text-[72px] lg:text-transparent lg:[-webkit-text-stroke:1.5px_var(--color-subtle)]"
              >
                {layer.number}
              </span>
              <p className="mono-label panel-name">
                <span className="ml">
                  <span>
                    <span className="sr-only">Layer {layer.number}: </span>
                    {layer.name}
                  </span>
                </span>
              </p>
            </div>

            <h3
              id={`layer-${layer.id}-title`}
              className="panel-title text-[clamp(24px,6.2vw,36px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance"
            >
              <Marked text={layer.title} variant="grad" />
            </h3>

            <ul aria-label={`${layer.name} skills`} className="panel-chips mt-4 flex flex-wrap gap-2 md:mt-5">
              {layer.skills.map((s, k) => (
                <Chip key={s.name} filled={s.key} index={k}>
                  {s.name}
                </Chip>
              ))}
            </ul>

            <p className="panel-proof mt-4 border-t border-line pt-3 text-[15px] leading-relaxed text-secondary md:mt-6 md:pt-4 md:text-[16px]">
              <span className="mono-label mr-2 text-accent">Proof</span>
              <Marked text={layer.proof} variant="sweep" />
            </p>

            <button
              type="button"
              data-demo={layer.id}
              className="demo-open mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 font-mono text-[12px] tracking-[0.1em] text-secondary uppercase hover:border-accent"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
              Live demo: {layer.demo}
            </button>
          </article>
        </li>
      ))}
    </ol>
  );
}
