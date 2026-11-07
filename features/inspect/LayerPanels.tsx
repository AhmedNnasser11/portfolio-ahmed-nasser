import { layers } from "@/content/layers";
import { Chip } from "@/shared/ui/Chip";
import { Marked } from "@/shared/ui/Marked";

/**
 * Chapter 3 (Inspect) as a plain server-rendered list. In P6 these same
 * articles become the scroll-driven panels; without JS or with reduced motion
 * they stay this list (progressive enhancement, CLAUDE.md rule 0.4).
 */
export function LayerPanels() {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:gap-6">
      {layers.map((layer) => (
        <li key={layer.id}>
          <article
            id={`layer-${layer.id}`}
            aria-labelledby={`layer-${layer.id}-title`}
            className="h-full rounded-(--radius-card) border border-line bg-surface p-5 md:p-7"
          >
            <div className="mb-4 flex items-baseline gap-4">
              <span
                aria-hidden="true"
                className="text-[56px] leading-none font-extrabold tracking-[-0.05em] text-subtle lg:text-[72px] lg:text-transparent lg:[-webkit-text-stroke:1.5px_var(--color-subtle)]"
              >
                {layer.number}
              </span>
              <p className="mono-label">
                <span className="sr-only">Layer {layer.number}: </span>
                {layer.name}
              </p>
            </div>

            <h3
              id={`layer-${layer.id}-title`}
              className="text-[clamp(26px,6.5vw,36px)] leading-[1.02] font-extrabold tracking-[-0.04em]"
            >
              <Marked text={layer.title} variant="grad" />
            </h3>

            <ul aria-label={`${layer.name} skills`} className="mt-5 flex flex-wrap gap-2">
              {layer.skills.map((s) => (
                <Chip key={s.name} filled={s.key}>
                  {s.name}
                </Chip>
              ))}
            </ul>

            <p className="mt-6 border-t border-line pt-4 text-[16px] leading-relaxed text-secondary">
              <span className="mono-label mr-2 text-accent">Proof</span>
              <Marked text={layer.proof} />
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}
