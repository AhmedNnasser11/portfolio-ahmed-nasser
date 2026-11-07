// CLAUDE.md §4 selected work + open source, worded per docs/PLAN.md §8.

export type Project = { name: string; description: string; stack: string[] };

export const projects: Project[] = [
  {
    name: "Cyber-Guardian",
    description:
      "Threat-intelligence SaaS: dark web surveillance, brand protection, incident management, with Admin, Analyst and Viewer RBAC.",
    stack: ["Next.js", "TypeScript"],
  },
  {
    name: "TravWare",
    description:
      "SaaS ERP interfaces (team project) and a flights & hotels booking engine with per-client branding.",
    stack: ["Next.js", "TypeScript", "REST"],
  },
  {
    name: "Olimi.ai",
    description:
      "Voice AI dashboard: real-time analytics, call summaries, sentiment analysis.",
    stack: ["Next.js", "TypeScript"],
  },
  {
    name: "Elli",
    description:
      "Enterprise school platform: courses, quiz engines, scheduling, role-based permissions.",
    stack: ["Next.js", "TypeScript"],
  },
  {
    name: "Ajzaa",
    description:
      "Vendor & admin dashboard for a multi-tenant Saudi auto-parts marketplace: live chat, delivery tracking.",
    stack: ["React.js", "Redux", "Pusher"],
  },
  {
    name: "Baian AI",
    description:
      "AI invoice extraction with Zoho Books + Odoo / WhatsApp workflows.",
    stack: ["Next.js", "Zoho Books", "Odoo"],
  },
];

export type OpenSourceLink = { name: string; href: string; label: string };

export const openSource: OpenSourceLink[] = [
  {
    name: "Next.js & React Security Auditor",
    href: "https://github.com/AhmedNnasser11/nextjs-react-security",
    label: "github.com/AhmedNnasser11/nextjs-react-security",
  },
  {
    name: "Next.js Architecture Lab",
    href: "https://github.com/AhmedNnasser11/nextjs-architecture-lab",
    label: "github.com/AhmedNnasser11/nextjs-architecture-lab",
  },
  {
    name: "Technical SEO & GEO Auditor",
    href: "https://github.com/AhmedNnasser11/technical-seo-geo-claude-skill",
    label: "github.com/AhmedNnasser11/technical-seo-geo-claude-skill",
  },
  {
    name: "6 NPM packages",
    href: "https://www.npmjs.com/~ahmednnasser111",
    label: "npmjs.com/~ahmednnasser111",
  },
];
