import { CV_HREF, links, profile } from "@/content/profile";
import { LinkButton } from "@/shared/ui/LinkButton";

const contactLinks = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "npm", href: links.npm },
];

/** Chapter 8 — Contact. */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="cv-auto mx-auto max-w-7xl px-4 pt-16 pb-12 md:px-8 md:pt-24"
    >
      <div className="rounded-(--radius-card) border border-line bg-surface p-6 md:p-12">
        <p className="mono-label mb-4">Contact</p>
        <h2
          id="contact-title"
          className="text-[clamp(44px,12vw,112px)] leading-[0.92] font-extrabold tracking-[-0.05em] text-balance"
        >
          Let’s build <span className="grad">yours.</span>
        </h2>
        <a
          href={`mailto:${links.email}`}
          className="mt-8 flex min-h-11 items-center text-[clamp(17px,4.6vw,28px)] font-semibold break-all underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent"
        >
          {links.email}
        </a>
        <a
          href={links.phoneHref}
          className="mt-2 flex min-h-11 items-center text-[clamp(17px,4.6vw,28px)] font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent"
        >
          {links.phone}
        </a>
        <ul className="mt-6 flex flex-wrap gap-3">
          {contactLinks.map((l) => (
            <li key={l.label}>
              <LinkButton href={l.href} variant="ghost" external>
                {l.label} <span aria-hidden="true">↗</span>
              </LinkButton>
            </li>
          ))}
          <li>
            <LinkButton href={CV_HREF} download>
              Download CV
            </LinkButton>
          </li>
        </ul>
      </div>
      <footer className="mt-10 font-mono text-[12px] tracking-[0.06em] text-subtle">
        {profile.name} · {profile.title} · {profile.location}
      </footer>
    </section>
  );
}
