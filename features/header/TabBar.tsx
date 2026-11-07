import { TabSync } from "./TabSync";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const TABS = [
  {
    href: "#top",
    label: "Home",
    sections: "top",
    icon: <path {...stroke} d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />,
  },
  {
    href: "#layers",
    label: "Skills",
    sections: "layers stack",
    icon: <path {...stroke} d="m12 3 9 4.5-9 4.5-9-4.5zM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />,
  },
  {
    href: "#experience",
    label: "Experience",
    sections: "experience",
    icon: (
      <>
        <rect {...stroke} x="3" y="7" width="18" height="13" rx="2" />
        <path {...stroke} d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
      </>
    ),
  },
  {
    href: "#work",
    label: "Work",
    sections: "work",
    icon: (
      <>
        <rect {...stroke} x="4" y="4" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="13" y="4" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="4" y="13" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="13" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    sections: "contact",
    icon: (
      <>
        <rect {...stroke} x="3" y="5" width="18" height="14" rx="2" />
        <path {...stroke} d="m4 7 8 6 8-6" />
      </>
    ),
  },
];

/**
 * Phone bottom tab bar (< md). Server-rendered plain anchors (work with JS
 * off); the icons never ship as JS. TabSync (tiny client island) moves
 * aria-current to the section crossing the middle of the viewport.
 * Solid background, no blur/backdrop-filter (CLAUDE.md §6 rule 7).
 * Height: var(--tabbar-h) = 64px + safe-area inset (globals.css).
 */
export function TabBar() {
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-(--z-tabbar) h-(--tabbar-h) border-t border-line bg-bg pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] md:hidden"
    >
      <ul className="grid h-16 grid-cols-5">
        {TABS.map((tab, i) => (
          <li key={tab.href} className="flex">
            <a
              href={tab.href}
              data-sections={tab.sections}
              aria-current={i === 0 ? "page" : undefined}
              className="group flex min-h-11 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-[0.01em] text-subtle transition-colors aria-[current=page]:text-text"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 group-aria-[current=page]:text-accent">
                {tab.icon}
              </svg>
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
      <TabSync />
    </nav>
  );
}
