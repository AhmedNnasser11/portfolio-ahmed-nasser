type Props = {
  children: React.ReactNode;
  filled?: boolean;
  size?: "sm" | "lg";
};

/** Filled chip = key skill; outline chip = the rest (§2). */
export function Chip({ children, filled = false, size = "sm" }: Props) {
  const sizing =
    size === "lg"
      ? "px-4 py-2 text-[clamp(15px,4vw,18px)]"
      : "px-3 py-1 text-[13px]";
  const look = filled
    ? "bg-accent font-bold text-bg border-accent"
    : "border-line text-secondary font-medium";
  return (
    <li
      className={`inline-flex items-center rounded-full border leading-tight ${sizing} ${look}`}
    >
      {children}
    </li>
  );
}
