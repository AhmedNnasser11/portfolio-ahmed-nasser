import { Marked } from "./Marked";

type Props = { id: string; eyebrow: string; title: string };

/** Mono eyebrow + display h2 with one gradient keyword (`*word*`). */
export function SectionHeading({ id, eyebrow, title }: Props) {
  return (
    <header className="mb-8 md:mb-12">
      <p className="mono-label mb-3">{eyebrow}</p>
      <h2
        id={id}
        className="text-[clamp(32px,8vw,64px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance"
      >
        <Marked text={title} variant="grad" />
      </h2>
    </header>
  );
}
