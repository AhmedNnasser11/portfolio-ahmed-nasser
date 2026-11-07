// CLAUDE.md §4 experience, TravWare line reworded per docs/PLAN.md §8.
// `*word*` marks a highlighted fact.

export type Role = {
  company: string;
  period: string;
  mode: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "E2E County",
    period: "Jan 2026 – Present",
    mode: "On-site, Cairo",
    points: [
      "*Sole frontend developer* on Cyber-Guardian, a *threat-intelligence SaaS*: RBAC, advanced data tables, breach-trend analytics.",
      "TravWare ERP interfaces *used in production* by travel clients, plus a flights & hotels booking engine.",
    ],
  },
  {
    company: "INCode",
    period: "Feb 2024 – Dec 2025",
    mode: "Hybrid, Cairo",
    points: [
      "*Sole frontend developer* owning production releases, change requests and hotfixes.",
      "Dashboards for *Olimi.ai* (Voice AI, first client *Paymob*) and Beesly AI; built Elli in *about 6 months*; *led two junior developers*.",
    ],
  },
  {
    company: "Mazeed",
    period: "Apr 2022 – Feb 2024",
    mode: "Remote",
    points: [
      "Migrated legacy HTML, Bootstrap and jQuery products *to React* for Saudi clients including *Monsha’at* and *Takaful*.",
      "Optimized *Core Web Vitals* across all platforms and mentored a junior developer.",
    ],
  },
  {
    company: "Freelance",
    period: "Part-time",
    mode: "By referral",
    points: [
      "Ajzaa marketplace dashboard, *Baian AI* invoice extraction, Rayan Hajj water distribution platform.",
      "Tourism platforms with Next.js SSR; Kenzy Tours and First Mas *rank on Google* for Hajj, Umrah and tourism searches.",
    ],
  },
];
