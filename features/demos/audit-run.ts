// Real output of Ahmed's two auditors, run on this codebase on 2026-11-07 (P8).
// Commands and results are copied from that run (docs/STATUS.md "P8 progress");
// nothing here is invented. Kinds: cmd = what was run, out = result line,
// ok / warn / fix = status lines.
export type Line = { kind: "cmd" | "out" | "ok" | "warn" | "fix"; text: string };

export const RUN_DATE = "2026-11-07";

export const SECURITY_RUN: Line[] = [
  { kind: "cmd", text: "npm audit --omit=dev" },
  { kind: "ok", text: "found 0 vulnerabilities" },
  { kind: "cmd", text: "npm audit" },
  { kind: "warn", text: "8 moderate: minimatch GHSA-g3hv-75wg-m249, dev-only lint tooling, not shipped" },
  { kind: "cmd", text: "python src/security_intel.py --package next --version 16.4.5" },
  { kind: "out", text: "github-advisory-database: 0 · osv: 0" },
  { kind: "warn", text: "nextjs-security-advisories: HTTP 404, coverage gap, not “no vulns”" },
  { kind: "out", text: "react 19.3.0 · react-dom 19.3.0 · gsap 3.15.1 · lenis 1.3.27: 0 advisories" },
  { kind: "out", text: "attack surface: static page, no Server Actions, Route Handlers, auth or DB" },
  { kind: "fix", text: "HARDENING: JSON-LD escaped only <, now escapes < > &" },
];

export const SEO_RUN: Line[] = [
  { kind: "cmd", text: "audit / (title, description, canonical, robots, OG, headings)" },
  { kind: "ok", text: "1 h1 “Ahmed Nasser — Frontend Developer”, canonical + index,follow" },
  { kind: "cmd", text: "audit /robots.txt /sitemap.xml /llms.txt" },
  { kind: "fix", text: "robots.txt: removed non-standard Host: line" },
  { kind: "ok", text: "sitemap absolute URLs · llms.txt 200 text/plain" },
  { kind: "cmd", text: "audit JSON-LD (Person + WebSite)" },
  { kind: "fix", text: "Person: added description + worksFor (matches visible content)" },
  { kind: "warn", text: "no og:image yet (planned with the deploy step)" },
];
