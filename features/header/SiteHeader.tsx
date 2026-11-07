import { CV_HREF, nav, profile } from "@/content/profile";

/**
 * Sticky header. Rule 0.1: "Frontend Developer" + core stack visible at every
 * scroll position, phones included (thin mono stack line under the title).
 * Phones (< md): slim header with name, title, stack line and Download CV;
 * section navigation lives in the bottom TabBar. From md up the top nav takes over.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-(--z-header) h-(--header-h) border-b border-line bg-bg">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        <a
          href="#top"
          className="flex min-h-11 min-w-0 flex-col justify-center leading-tight lg:flex-row lg:items-center lg:gap-2"
        >
          <span className="truncate text-[15px] font-bold tracking-[-0.02em]">
            {profile.name}
            <span className="text-subtle"> · </span>
            <span className="text-secondary">{profile.title}</span>
          </span>
          <span translate="no" className="truncate font-mono text-[11px] tracking-[0.08em] text-muted lg:text-[12px]">
            <span className="hidden text-subtle lg:inline">· </span>
            {profile.coreStackShort.join(" · ")}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center lg:gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-2 text-[13px] text-muted transition-colors hover:text-text lg:px-3 lg:text-[14px]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={CV_HREF}
          download
          className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-line px-3 text-[13px] font-semibold hover:border-accent lg:px-4 lg:text-[14px]"
        >
          <span className="sr-only min-[400px]:not-sr-only">Download&nbsp;</span>CV
        </a>
      </div>
    </header>
  );
}
