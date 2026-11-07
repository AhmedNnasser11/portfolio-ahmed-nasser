import { layers } from "@/content/layers";
import { Chip } from "@/shared/ui/Chip";
import { Marked } from "@/shared/ui/Marked";
import { SectionHeading } from "@/shared/ui/SectionHeading";

/** Chapter 5 — The full stack: one card per layer. */
export function StackCards() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <SectionHeading id="stack-title" eyebrow="The full stack" title="Six layers, *one* developer" />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {layers.map((layer) => (
          <li
            key={layer.id}
            className="rounded-(--radius-card) border border-line bg-surface-2 p-5 md:p-6"
          >
            <p className="mono-label mb-2">
              {layer.number} · {layer.name}
            </p>
            <h3 className="text-[22px] leading-tight font-bold tracking-[-0.03em]">
              <Marked text={layer.title} />
            </h3>
            <ul aria-label={`${layer.name} skills`} className="mt-4 flex flex-wrap gap-2">
              {layer.skills.map((s) => (
                <Chip key={s.name} filled={s.key}>
                  {s.name}
                </Chip>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
