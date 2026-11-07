import { layers } from "@/content/layers";
import { Marked } from "@/shared/ui/Marked";
import { SectionHeading } from "@/shared/ui/SectionHeading";

/**
 * Chapter 5 — The full stack: one card per layer. Skills are one line of text
 * (key skills bold) instead of chip elements: the chips already appear in the
 * Inspect panels, and fewer nodes means less layout and hydration (P7).
 */
export function StackCards() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="cv-auto mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
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
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {layer.skills.map((s, i) => (
                <span key={s.name}>
                  {s.key ? <strong className="font-semibold text-text">{s.name}</strong> : s.name}
                  {i < layer.skills.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
