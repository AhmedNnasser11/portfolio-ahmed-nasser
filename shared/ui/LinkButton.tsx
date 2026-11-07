type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
  external?: boolean;
};

/** 44px minimum touch target (§2). */
export function LinkButton({
  href,
  children,
  variant = "primary",
  download,
  external,
}: Props) {
  const look =
    variant === "primary"
      ? "bg-text text-bg hover:bg-secondary"
      : "border border-line text-text hover:border-accent";
  return (
    <a
      href={href}
      download={download || undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors ${look}`}
    >
      {children}
    </a>
  );
}
