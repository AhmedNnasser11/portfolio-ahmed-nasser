// Facts only from CLAUDE.md §4 and public/Ahmed_Nasser_Frontend_Developer_CV.pdf.
// The CV phone number is never published.

export const SITE_URL = "https://portfolio-ahmed-nasser.vercel.app";

export const CV_HREF = "/Ahmed_Nasser_Frontend_Developer_CV.pdf";

export const profile = {
  name: "Ahmed Nasser",
  title: "Frontend Developer",
  location: "Cairo, Egypt",
  status: "Available for work",
  years: "4+",
  tagline: "4+ years building production React.js & Next.js apps",
  coreStack: ["React.js", "Next.js", "TypeScript", "JavaScript"],
  coreStackShort: ["React", "Next.js", "TS", "JS"],
  secondaryStack: [
    "Tailwind CSS",
    "TanStack Query",
    "Redux Toolkit",
    "Zustand",
    "REST",
    "WebSockets",
    "Vitest",
    "Playwright",
  ],
  description:
    "Frontend Developer in Cairo, Egypt with 4+ years building production React.js and Next.js apps: enterprise SaaS dashboards with a focus on performance and security, for clients in Saudi Arabia and Egypt.",
} as const;

export const links = {
  email: "ahmednnasser111@gmail.com",
  github: "https://github.com/AhmedNnasser11",
  linkedin: "https://www.linkedin.com/in/ahmed-nasser-931490212",
  npm: "https://www.npmjs.com/~ahmednnasser111",
} as const;

export const nav = [
  { href: "#layers", label: "Layers" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
] as const;
