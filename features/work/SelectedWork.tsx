import { openSource, projects } from "@/content/projects";
import { SectionHeading } from "@/shared/ui/SectionHeading";

/**
 * Chapter 7 — Selected work (text-only cards until real screenshots exist)
 * + open source.
 */
export function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="cv-auto mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <SectionHeading id="work-title" eyebrow="Selected work" title="Shipped for *real clients*" />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li
            key={p.name}
            className="flex flex-col rounded-(--radius-card) border border-line bg-surface p-5 md:p-6"
          >
            <h3 className="text-[24px] leading-tight font-extrabold tracking-[-0.035em]">{p.name}</h3>
            <p className="mt-3 flex-1 text-[16px] leading-relaxed text-secondary">{p.description}</p>
            <p translate="no" className="mt-5 font-mono text-[12px] tracking-[0.06em] text-muted">
              <span className="sr-only">Stack: </span>
              {p.stack.join(" · ")}
            </p>
          </li>
        ))}
      </ul>

      <h3 id="oss-title" className="mono-label mt-16 mb-5">
        Open source
      </h3>
      <ul aria-labelledby="oss-title" className="grid gap-3 md:grid-cols-2">
        {openSource.map((o) => (
          <li key={o.href}>
            <a
              href={o.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-11 flex-col gap-1 rounded-(--radius-card) border border-line p-5 transition-colors hover:border-accent"
            >
              <span className="text-[18px] font-bold tracking-[-0.02em]">
                {o.name} <span aria-hidden="true" className="text-accent">↗</span>
              </span>
              <span className="font-mono text-[12px] break-all text-muted">{o.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
