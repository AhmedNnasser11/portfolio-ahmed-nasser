// Source: public/Ahmed_Nasser_Frontend_Developer_CV.pdf (Professional Experience + Freelance).
// Recruiter-scannable rewrite: action verb first, scope, then outcome. Facts only.
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
      "Built the full Next.js frontend of Cyber-Guardian, a *threat-intelligence SaaS*, as *sole frontend developer*.",
      "Designed *RBAC* (Admin, Analyst, Viewer) and built advanced data tables and breach-trend analytics for high-volume data.",
      "*Team project:* shipped TravWare SaaS ERP interfaces *used in production* by travel clients, working with product, Laravel backend and design teams. Fixed a page that *froze at 2,000 rows* by splitting components and moving filters from state to *useRef*.",
      "*Team project:* delivered the TravWare flights & hotels *booking engine* in Next.js with per-client branding.",
      "*Team project:* co-developed a social media management dashboard (content calendar, unified inbox, analytics & reporting) with reusable Next.js and TypeScript components and REST APIs.",
    ],
  },
  {
    company: "INCode",
    period: "Feb 2024 – Dec 2025",
    mode: "Hybrid, Cairo",
    points: [
      "Owned production releases, change requests and hotfixes as *sole frontend developer*.",
      "Architected and built *Elli*, an enterprise school management platform, *single-handedly in about 6 months*; first adopted by Forsan International Schools.",
      "Engineered the *Olimi.ai* dashboard (Voice AI, first client *Paymob*): real-time analytics, AI call summaries, sentiment analysis. Shipped the Beesly AI dashboard with live call monitoring.",
      "*Led two junior developers* and reviewed their code on a multi-tenant restaurant system for three brands.",
    ],
  },
  {
    company: "Mazeed",
    period: "Apr 2022 – Feb 2024",
    mode: "Remote",
    points: [
      "Migrated legacy HTML, Bootstrap and jQuery products *to React* in a team of 4 frontend developers, for Saudi clients including *Monsha’at* and *Takaful*.",
      "Optimized *Core Web Vitals* across all platforms and cut re-renders by refactoring to pure components.",
      "Built a meeting management platform and a secure voting app with live results. *Mentored a junior developer*.",
    ],
  },
  {
    company: "Freelance",
    period: "Part-time",
    mode: "By referral",
    points: [
      "Built *Ajzaa*, a multi-tenant auto-parts marketplace dashboard: RBAC, live chat, delivery tracking (React.js, Redux, Pusher).",
      "Delivered *Baian AI* invoice extraction (Zoho Books, Odoo / WhatsApp workflows) and the Rayan Hajj water distribution platform.",
      "Developed Next.js SSR tourism sites tuned for Core Web Vitals and SEO. Kenzy Tours and First Mas *rank on Google* for Hajj, Umrah and tourism searches.",
    ],
  },
];
