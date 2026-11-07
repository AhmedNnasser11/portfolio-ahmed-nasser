"use client";

import { useMemo, useState } from "react";

// Layer 04 · Shield. XSS playground.
// Safety: the input is ONLY parsed with DOMParser into an inert document
// (no browsing context: scripts never run, images never load, handlers never
// fire). Nothing parsed is ever imported into the page, innerHTML/srcdoc are
// never used, and React renders the input as text.
// OWASP XSS Prevention Cheat Sheet: output encoding + avoid dangerous sinks.

const SAMPLES = [
  `<img src="x" onerror="alert('xss')">`,
  `<a href="javascript:alert(1)">click me</a>`,
  `<svg onload="fetch('//evil.example')"></svg>`,
  `<b>bold</b> is just text here`,
];

type Finding = { tag: string; attr: string; value: string };
const URL_ATTRS = new Set(["href", "src", "action", "formaction", "xlink:href"]);
const JS_URL = /^javascript:/i;

function analyse(input: string): { tags: string[]; findings: Finding[] } {
  const doc = new DOMParser().parseFromString(input, "text/html");
  const tags: string[] = [];
  const findings: Finding[] = [];
  for (const el of Array.from(doc.body.querySelectorAll("*"))) {
    tags.push(el.tagName.toLowerCase());
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim();
      const isHandler = name.startsWith("on");
      const isJsUrl = URL_ATTRS.has(name) && JS_URL.test(value);
      if (isHandler || isJsUrl) findings.push({ tag: el.tagName.toLowerCase(), attr: name, value });
    }
    if (el.tagName === "SCRIPT") findings.push({ tag: "script", attr: "(element)", value: el.textContent ?? "" });
  }
  return { tags, findings };
}

export default function XssDemo() {
  const [input, setInput] = useState(SAMPLES[0]);
  const { tags, findings } = useMemo(() => analyse(input), [input]);

  return (
    <div>
      <label htmlFor="xss-input" className="mono-label mb-2 block">
        Untrusted input
      </label>
      <textarea
        id="xss-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="untrusted-html"
        autoComplete="off"
        rows={3}
        spellCheck={false}
        className="w-full rounded-xl border border-line bg-surface-2 p-3 font-mono text-[14px] text-text"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {SAMPLES.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setInput(s)}
            className="min-h-11 rounded-full border border-line px-4 font-mono text-[12px] text-secondary hover:border-accent"
          >
            Sample {i + 1}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <section className="rounded-xl border border-line bg-surface-2 p-4">
          <p className="mono-label mb-2 text-ok">Rendered by React (escaped)</p>
          <p className="font-mono text-[13px] break-all text-secondary">{input}</p>
          <p className="mt-2 text-[13px] text-muted">Shown as text: nothing runs.</p>
        </section>
        <section className="rounded-xl border border-line bg-surface-2 p-4">
          <p className="mono-label mb-2 text-accent">If it went into innerHTML</p>
          {findings.length ? (
            <ul className="grid gap-1 font-mono text-[13px]">
              {findings.map((f, i) => (
                <li key={i} className="break-all">
                  <span className="text-text">&lt;{f.tag}&gt;</span> {f.attr}=
                  <span className="text-secondary">&quot;{f.value}&quot;</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-secondary">
              No script, event handler or javascript: URL found{tags.length ? ` (tags: ${tags.join(", ")})` : ""}.
            </p>
          )}
          <p className="mt-2 text-[13px] text-muted">
            {findings.length
              ? `${findings.length} dangerous ${findings.length === 1 ? "sink" : "sinks"} would run in the page.`
              : "Still: never pass untrusted HTML to innerHTML."}
          </p>
        </section>
      </div>
      <p className="mt-4 font-mono text-[12px] leading-relaxed text-muted">
        Defence in depth: React escapes text by default, untrusted HTML never reaches innerHTML or
        dangerouslySetInnerHTML, and this site sends a Content-Security-Policy header with
        object-src &apos;none&apos; and frame-ancestors &apos;none&apos;.
      </p>
    </div>
  );
}
