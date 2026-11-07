import { experience } from "@/content/experience";
import { Marked } from "@/shared/ui/Marked";
import { SectionHeading } from "@/shared/ui/SectionHeading";

/** Chapter 6 — Experience. */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <SectionHeading id="experience-title" eyebrow="Experience" title="4+ years *in production*" />
      <ol className="border-t border-line">
        {experience.map((role) => (
          <li
            key={role.company}
            className="grid gap-3 border-b border-line py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10 md:py-10"
          >
            <div>
              <h3 className="text-[clamp(24px,5.5vw,32px)] leading-tight font-extrabold tracking-[-0.04em]">
                {role.company}
              </h3>
              <p className="mt-1 font-mono text-[12px] tracking-[0.08em] text-muted">
                {role.period} · {role.mode}
              </p>
            </div>
            <ul className="flex flex-col gap-3 text-[16px] leading-relaxed text-secondary md:text-[17px]">
              {role.points.map((p) => (
                <li key={p} className="relative pl-5">
                  <span aria-hidden="true" className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-accent" />
                  <Marked text={p} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
