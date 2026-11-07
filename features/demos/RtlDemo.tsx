"use client";

import { useState } from "react";

// Layer 01 · Interface. The Arabic is a translation of existing site copy only
// (CLAUDE.md §4 / layer 01); no new claims. Arabic uses the system font
// fallback, so no third font family is loaded (§6 rule 2).
const COPY = {
  en: {
    role: "Frontend Developer · Cairo, Egypt",
    title: "Pixels people touch",
    proof: "Figma designs turned into production UI for clients in Saudi Arabia and Egypt.",
    cta: "Download CV",
    chips: ["Figma to code", "Accessibility (WCAG)", "i18next · RTL"],
  },
  ar: {
    role: "مطوّر واجهات أمامية · القاهرة، مصر",
    title: "واجهات يلمسها الناس",
    proof: "تصاميم Figma تحوّلت إلى واجهات إنتاجية لعملاء في السعودية ومصر.",
    cta: "تحميل السيرة الذاتية",
    chips: ["من Figma إلى كود", "إمكانية الوصول (WCAG)", "i18next · RTL"],
  },
} as const;

export default function RtlDemo() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const t = COPY[lang];
  return (
    <div>
      <div role="group" aria-label="Language" className="mb-4 inline-flex rounded-full border border-line p-1">
        {(["en", "ar"] as const).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
            className={`min-h-11 rounded-full px-5 text-[14px] font-semibold ${lang === l ? "bg-text text-bg" : "text-secondary"}`}
          >
            {l === "en" ? "EN" : "عربي"}
          </button>
        ))}
      </div>

      <div
        lang={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="rounded-(--radius-card) border border-line bg-surface-2 p-5"
      >
        <p className="mb-2 flex items-center gap-2 text-[13px] text-secondary">
          <span aria-hidden="true" className="size-2 rounded-full bg-ok" />
          {t.role}
        </p>
        <p className="text-[26px] leading-tight font-extrabold">{t.title}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {t.chips.map((c) => (
            <li key={c} className="rounded-full border border-line px-3 py-1 text-[13px] text-secondary">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[15px] leading-relaxed text-secondary">{t.proof}</p>
        <p className="mt-4 flex items-center gap-2 text-[14px] font-semibold">
          <span className="rounded-full bg-text px-4 py-2 text-bg">{t.cta}</span>
          <span aria-hidden="true" className="text-accent">{lang === "ar" ? "←" : "→"}</span>
        </p>
      </div>
      <p className="mt-3 font-mono text-[12px] text-muted">
        dir=&quot;{lang === "ar" ? "rtl" : "ltr"}&quot; flips the whole layout: text alignment, chip order and the arrow, with no separate stylesheet.
      </p>
    </div>
  );
}
