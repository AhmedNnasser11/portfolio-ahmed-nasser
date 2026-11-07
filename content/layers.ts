// CLAUDE.md §4 layer table, with the CV-accurate wording from docs/PLAN.md §8.
// `*word*` marks the gradient keyword (title) or highlighter (proof).

export type Skill = { name: string; key?: boolean };

export type Layer = {
  id: string;
  number: string;
  name: string;
  title: string;
  skills: Skill[];
  proof: string;
  demo: string;
};

export const layers: Layer[] = [
  {
    id: "interface",
    number: "01",
    name: "Interface",
    title: "Pixels people *touch*",
    skills: [
      { name: "Figma to code", key: true },
      { name: "Responsive design" },
      { name: "Accessibility (WCAG)", key: true },
      { name: "Tailwind CSS" },
      { name: "Shadcn/UI" },
      { name: "MUI" },
      { name: "Framer Motion" },
      { name: "i18next · RTL" },
    ],
    proof:
      "Figma designs turned into *production UI* for clients in *Saudi Arabia and Egypt*.",
    demo: "EN / عربي switch with RTL",
  },
  {
    id: "components",
    number: "02",
    name: "Components",
    title: "Architecture that *scales*",
    skills: [
      { name: "React.js" },
      { name: "Next.js App Router", key: true },
      { name: "Server Components", key: true },
      { name: "Server Actions" },
      { name: "SSR · SSG · ISR" },
      { name: "TypeScript", key: true },
      { name: "Design systems" },
      { name: "Clean architecture" },
    ],
    proof:
      "Built *Elli*, an enterprise school management platform, *single-handedly in about 6 months*.",
    demo: "Architecture Lab",
  },
  {
    id: "data",
    number: "03",
    name: "Data",
    title: "State, APIs, *real-time*",
    skills: [
      { name: "TanStack Query", key: true },
      { name: "Redux Toolkit" },
      { name: "Zustand" },
      { name: "REST APIs" },
      { name: "WebSockets", key: true },
      { name: "Pusher" },
      { name: "React Hook Form + Zod" },
      { name: "RBAC", key: true },
    ],
    proof:
      "*RBAC* with Admin, Analyst and Viewer tiers for a *threat-intelligence SaaS* dashboard.",
    demo: "Admin / Analyst / Viewer RBAC switch",
  },
  {
    id: "shield",
    number: "04",
    name: "Shield",
    title: "Security *by default*",
    skills: [
      { name: "XSS prevention", key: true },
      { name: "CSRF prevention" },
      { name: "Content Security Policy", key: true },
      { name: "Input validation" },
      { name: "Dependency audits" },
      { name: "Auth & sessions" },
    ],
    proof:
      "Built an *open-source security auditor* skill for Next.js App Router apps.",
    demo: "XSS playground",
  },
  {
    id: "engine",
    number: "05",
    name: "Engine",
    title: "Fast *under load*",
    skills: [
      { name: "Core Web Vitals", key: true },
      { name: "Code splitting" },
      { name: "Lazy loading" },
      { name: "Re-render optimization", key: true },
      { name: "Technical SEO" },
      { name: "GEO · AIO" },
    ],
    proof:
      "Fixed an ERP page that *froze at 2,000 rows* by splitting the component and moving filters from state to *useRef*.",
    demo: "Break it / Fix it",
  },
  {
    id: "ai-quality",
    number: "06",
    name: "AI & Quality",
    title: "Built with *AI agents*, tested",
    skills: [
      { name: "Claude Code", key: true },
      { name: "OpenCode" },
      { name: "AI coding agents" },
      { name: "Vitest" },
      { name: "Playwright", key: true },
      { name: "GitLab CI/CD" },
    ],
    proof:
      "Uses *AI coding agents daily* and publishes auditing skills for *security and SEO / GEO*.",
    demo: "Terminal replay of the auditors",
  },
];
