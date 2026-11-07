// Layer 06 · AI & Quality. Facts from the CV (Open source section).
// The terminal replay of a real audit run is added once the auditors have been
// run on this codebase (P8); until then, no output is shown or invented.
const AUDITORS = [
  {
    name: "Next.js & React Security Auditor",
    kind: "OpenCode skill",
    checks:
      "XSS and injection, authentication, Server Actions, Route Handlers, CSRF/SSRF, CSP, open redirects and dependency risks in Next.js App Router apps.",
    href: "https://github.com/AhmedNnasser11/nextjs-react-security",
  },
  {
    name: "Technical SEO & GEO Auditor",
    kind: "Claude Code skill",
    checks:
      "Technical SEO, structured data, accessibility and generative engine optimization (GEO) in sites and codebases.",
    href: "https://github.com/AhmedNnasser11/technical-seo-geo-claude-skill",
  },
];

export default function AuditorsDemo() {
  return (
    <div className="grid gap-3">
      {AUDITORS.map((a) => (
        <article key={a.href} className="rounded-xl border border-line bg-surface-2 p-4">
          <p className="mono-label mb-1">{a.kind}</p>
          <h3 className="text-[18px] font-bold tracking-[-0.02em]">{a.name}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-secondary">Audits {a.checks}</p>
          <a
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-[14px] font-semibold hover:border-accent"
          >
            View on GitHub <span aria-hidden="true">↗</span>
          </a>
        </article>
      ))}
    </div>
  );
}
