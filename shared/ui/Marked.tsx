import { Fragment } from "react";

type Props = {
  text: string;
  /** "hl" = highlighter band, "grad" = gradient keyword. */
  variant?: "hl" | "grad";
};

/** Renders `*word*` segments from content/*.ts as highlights. */
export function Marked({ text, variant = "hl" }: Props) {
  const parts = text.split("*");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={variant}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain text without the `*` markers (for metadata / JSON-LD / aria). */
export function plain(text: string) {
  return text.replaceAll("*", "");
}
