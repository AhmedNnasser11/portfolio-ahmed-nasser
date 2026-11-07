type Props = {
  children: React.ReactNode;
  filled?: boolean;
  size?: "sm" | "lg";
  /** Stagger index for the Inspect chip animation (--i). */
  index?: number;
};

/**
 * Filled chip = key skill; outline chip = the rest (§2). Styles live in
 * globals.css (.chip / .chip-key / .chip-lg): short class names keep the RSC
 * payload small, and there are ~45 chips on the page (P7).
 */
export function Chip({ children, filled = false, size = "sm", index }: Props) {
  const cls = `chip${filled ? " chip-key" : ""}${size === "lg" ? " chip-lg" : ""}`;
  return (
    <li className={cls} translate="no" style={index === undefined ? undefined : ({ "--i": index } as React.CSSProperties)}>
      {children}
    </li>
  );
}
