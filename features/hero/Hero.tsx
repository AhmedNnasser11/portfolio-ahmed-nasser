import { CV_HREF, profile } from "@/content/profile";
import { Chip } from "@/shared/ui/Chip";
import { LinkButton } from "@/shared/ui/LinkButton";
import { LaptopPoster } from "./LaptopPoster";

/**
 * Final hero (chapter 1). Server-rendered at opacity 1 from the first byte so
 * the h1 is the LCP element (web.dev Optimize LCP; CLAUDE.md §6 rule 1).
 * Rule 0.1: Frontend Developer, Cairo, 4+ years and the core stack all sit in
 * the first viewport on a 390px phone.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-7xl gap-6 px-4 pt-6 pb-12 md:px-8 md:pt-12 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 lg:pb-16"
    >
      <div>
        <p className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] whitespace-nowrap text-secondary uppercase min-[400px]:text-[12px]">
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-ok" />
          {profile.status} · {profile.location}
        </p>

        <h1 id="hero-title" className="font-extrabold">
          <span className="mb-2 block text-[clamp(20px,5vw,28px)] font-bold tracking-[-0.03em] text-secondary">
            {profile.name}
            <span className="sr-only"> — </span>
          </span>
          <span className="block text-[clamp(50px,11vw,100px)] leading-[0.95] tracking-[-0.05em]">
            <span className="block">
              <span className="hl hl-strong">Frontend</span>
            </span>{" "}
            <span className="block">
              <span className="hl hl-strong">Developer</span>
            </span>
          </span>
        </h1>

        <p className="mt-5 max-w-[19em] text-[clamp(17px,4.4vw,21px)] leading-snug font-semibold text-secondary">
          <span className="text-text">{profile.years} years</span> building
          production React.js &amp; Next.js apps
        </p>

        <ul aria-label="Core stack" className="mt-5 flex flex-wrap gap-2">
          {profile.coreStack.map((s) => (
            <Chip key={s} filled size="lg">
              {s}
            </Chip>
          ))}
        </ul>

        <p className="mt-4 font-mono text-[12px] leading-relaxed tracking-[0.04em] text-muted">
          <span className="sr-only">Also: </span>
          {profile.secondaryStack.map((s, i) => (
            <span key={s}>
              <span className="whitespace-nowrap">{s}</span>
              {i < profile.secondaryStack.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <LinkButton href="#experience">See experience</LinkButton>
          <LinkButton href={CV_HREF} variant="ghost" download>
            Download CV
          </LinkButton>
        </div>
      </div>

      <div className="relative">
        <LaptopPoster className="h-auto w-full" idPrefix="hero" />
      </div>
    </section>
  );
}
