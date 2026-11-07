"use client";

import { useEffect, useState } from "react";
import { RUN_DATE, SECURITY_RUN, SEO_RUN, type Line } from "./audit-run";

// Layer 06 · AI & Quality. Terminal replay of a real run of both auditors on
// this site (features/demos/audit-run.ts), then links to the repos (CV facts).
const AUDITORS = [
  {
    name: "Next.js & React Security Auditor",
    kind: "OpenCode skill",
    run: SECURITY_RUN,
    href: "https://github.com/AhmedNnasser11/nextjs-react-security",
  },
  {
    name: "Technical SEO & GEO Auditor",
    kind: "Claude Code skill",
    run: SEO_RUN,
    href: "https://github.com/AhmedNnasser11/technical-seo-geo-claude-skill",
  },
];

const PREFIX: Record<Line["kind"], string> = { cmd: "$", out: " ", ok: "✓", warn: "!", fix: "+" };
const TONE: Record<Line["kind"], string> = {
  cmd: "text-text",
  out: "text-secondary",
  ok: "text-ok",
  warn: "text-[#fbbf24]",
  fix: "text-accent",
};
const STEP_MS = 260;

function Terminal({ lines }: { lines: Line[] }) {
  // Reduced motion: print everything at once. Otherwise one line per step.
  const [reduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [shown, setShown] = useState(() => (reduced ? lines.length : 0));
  const [run, setRun] = useState(0);
  const replay = () => {
    setShown(reduced ? lines.length : 0);
    setRun((r) => r + 1);
  };

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setShown((n) => {
        if (n + 1 >= lines.length) clearInterval(id);
        return Math.min(n + 1, lines.length);
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, [lines, run, reduced]);

  return (
    <div className="rounded-xl border border-line bg-bg">
      {/* Fixed height = all lines reserved up front, so the replay never shifts layout. */}
      <ol
        aria-label="Audit output"
        className="grid gap-1 overflow-x-auto p-4 font-mono text-[12px] leading-relaxed"
        translate="no"
      >
        {lines.map((l, i) => (
          <li
            key={i}
            className={`flex gap-2 whitespace-pre-wrap transition-opacity duration-200 ${TONE[l.kind]} ${i < shown ? "opacity-100" : "opacity-0"}`}
          >
            <span aria-hidden="true" className="w-3 shrink-0 text-subtle">
              {PREFIX[l.kind]}
            </span>
            <span className="min-w-0 break-words">{l.text}</span>
          </li>
        ))}
      </ol>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-1">
        <p className="font-mono text-[11px] text-subtle">real run on this site · {RUN_DATE}</p>
        <button
          type="button"
          onClick={replay}
          className="min-h-11 font-mono text-[11px] tracking-[0.12em] text-secondary uppercase hover:text-text"
        >
          <span aria-hidden="true">↺</span> Replay
        </button>
      </div>
    </div>
  );
}

export default function AuditorsDemo() {
  return (
    <div className="grid gap-5">
      {AUDITORS.map((a) => (
        <article key={a.href}>
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="text-[18px] font-bold tracking-[-0.02em]">{a.name}</h3>
            <p className="mono-label">{a.kind}</p>
          </div>
          <Terminal lines={a.run} />
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
