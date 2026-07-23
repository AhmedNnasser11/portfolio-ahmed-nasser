export const PROFILE = {
    name: "Ahmed Nasser",
    title: "Front-End Web Developer | React.js & Next.js Specialist",
    location: "Cairo, Egypt",
    summary:
        "Frontend Web Developer with 5+ years of experience building high-performance web applications and enterprise-grade dashboards with React.js and Next.js — including independently architecting and delivering a full-scale cybersecurity intelligence dashboard as sole frontend owner. Skilled at transforming complex, data-heavy requirements — SaaS ERP systems, security intelligence platforms, analytics dashboards — into fast, intuitive user experiences. Proven collaborator across cross-functional teams in travel, insurance, education, hospitality, and cybersecurity sectors, with expertise in performance optimization (SSR, code splitting, lazy loading), state management, authentication & RBAC systems, and scalable component architecture.",
    email: "ahmednnasser111@gmail.com",
    phone: "+20 10 686 920 41",
    links: {
        github: "https://github.com/AhmedNnasser11",
        linkedin: "https://www.linkedin.com/in/ahmed-nasser-931490212/",
        npm: "https://www.npmjs.com/~ahmednnasser111",
        resume: "/Ahmed_Nasser_front_end_react_next_CV.pdf",
    },
};

export const EXPERIENCE = [
    {
        company: "E2E County",
        role: "Frontend Developer",
        period: "Jan 2026 – Present",
        description:
            "Serving as the Sole Frontend Developer, independently building the entire frontend application from scratch for a cybersecurity intelligence SaaS platform spanning dark web surveillance, phishing & domain protection, vulnerability prioritization, and threat intelligence. Also collaborate with cross-functional teams on the TravWare SaaS ERP ecosystem for the travel industry.",
        highlights: [
            "Independently built a full-scale Next.js dashboard for Cyber-Guardian Intelligence covering credential monitoring, brand protection, VIP monitoring, and incident management with complex nested interfaces, advanced data tables, and filtering.",
            "Built breach-trend analytics and incident risk-scoring visualizations from scratch, optimized for large, high-volume datasets.",
            "Designed and implemented a complete Role-Based Access Control (RBAC) system supporting Admin, Analyst, and Viewer permission tiers.",
            "Established a performant, responsive, reusable component architecture as sole frontend owner, setting the scalability standard for the platform.",
            "Collaborated with cross-functional engineering teams to build high-performance Next.js interfaces for TravWare, a SaaS ERP ecosystem serving the travel industry.",
            "Contributed to scalable UI components for e-commerce booking engines (DMCs, OTAs, hotel partners) and implemented frontend features for real-time inventory management tooling.",
            "Participated in the development of a unified social media management dashboard, working with backend developers and designers to consolidate multiple accounts into a single interface.",
        ],
        environment: [
            "Next.js",
            "React.js",
            "TypeScript",
            "Tailwind CSS",
            "RBAC",
            "SaaS Dashboard",
            "SaaS ERP",
        ],
    },
    {
        company: "INCode",
        role: "Frontend Developer",
        period: "Feb 2024 – Dec 2025",
        description:
            "Architected enterprise-grade systems and Voice AI platforms, focusing on scalability and complex business logic across education, hospitality, insurance, and AI sectors.",
        highlights: [
            "Architected an enterprise-grade school management platform (Elli) integrating quiz engines, assignment tracking, automated scheduling, and role-based permissions for administrators, teachers, and students.",
            "Engineered the management dashboard for a MENA-focused Voice AI platform (Olimi.ai) supporting 20+ languages/dialects, real-time analytics (Intent Accuracy, CSAT), AI call summaries, sentiment analysis, and knowledge base integrations.",
            "Built high-performance analytics dashboards for insurance and education clients (Deraya), improving data visualization and real-time reporting.",
            "Delivered a multi-brand restaurant management system (Eatery, Kokomo & Otto) with a centralized dashboard for managing brands, branches, and dynamic digital menus.",
            "Built a Shopify-integrated dashboard (Convest) to streamline payment installments and supplier management with real-time cash-flow analytics.",
            "Developed a grocery price comparison platform (Karnly) spanning major retail chains, engineering high-concurrency scraping and data normalization pipelines.",
            "Built a management dashboard (Beesly AI) for an AI-powered virtual secretary, enabling real-time call monitoring, booking visualization, and conversation analytics.",
        ],
        environment: [
            "Next.js",
            "TypeScript",
            "TanStack Query",
            "React Hook Form",
            "Zod",
            "Tailwind CSS",
            "RizzUI",
        ],
    },
    {
        company: "Mazeed",
        role: "Frontend Developer",
        period: "Apr 2022 – Feb 2024",
        description:
            "Focused on internal management systems, real-time applications, and organizational productivity tools.",
        highlights: [
            "Internal Meeting Management: Designed a centralized scheduling and collaborative workflow system.",
            "Real-time Voting: Developed a secure, high-concurrency voting application with live results.",
            "Task Management: Scaled a comprehensive productivity system with optimized project tracking.",
            "Committee Management: Automated administrative tasks for large-scale organizations with complex RBAC.",
        ],
        environment: [
            "React.js",
            "Redux",
            "Tailwind CSS",
            "React Hook Form",
            "Yup",
            "Moment.js",
            "i18next",
        ],
    },

];

export const PROJECTS = [
    {
        title: "Ajzaa E-commerce Dashboard",
        slug: "ajzaa",
        description:
            "Engineered a comprehensive multi-tenant vendor and admin dashboard. Features multi-store onboarding, shipping representative tracking, RBAC, and real-time chat support.",
        highlights: [
            "Architected a multi-tenant vendor dashboard supporting 50+ onboarded stores.",
            "Stack: React, Redux Toolkit, Pusher (Real-time).",
            "Enabled real-time order tracking and shipping logistics management.",
            "Reduced vendor onboarding time by 40% via automated workflows.",
        ],
        tags: ["React.js", "Redux", "Tailwind CSS", "Pusher"],
        link: "https://ajzaa.com",
        year: "2024",
        featured: true,
    },
    {
        title: "Olimi.ai Voice Dashboard",
        slug: "olimi",
        description:
            "Unified management dashboard for a Voice AI platform. Handles 20+ languages, real-time sentiment analysis, and AI call summaries.",
        highlights: [
            "Engineered a real-time sentiment analysis dashboard processing live voice streams.",
            "Stack: Next.js, TanStack Query, WebSockets.",
            "Visualized data for 20+ languages simultaneously with <100ms latency.",
            "Improved customer support response times by 25% through live alerts.",
        ],
        tags: ["Next.js", "TypeScript", "TanStack Query", "AI"],
        link: "#",
        year: "2024",
        featured: true,
    },
    {
        title: "Rayan Water Distribution",
        slug: "rayan",
        description:
            "Successfully developed a mission-critical web application using Next.js and TypeScript to manage water distribution during the Hajj season. Implemented tracking for distribution points and a comprehensive supervisor evaluation system to ensure service quality and operational efficiency.",
        highlights: [
            "Built a mission-critical tracking system for water distribution during Hajj using Next.js and TypeScript.",
            "Stack: Next.js, TypeScript, Offline-first capabilities.",
            "Guaranteed 100% uptime during peak load (2M+ users).",
            "Tracked 15,000+ distribution points in real-time with supervisor evaluation system.",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        link: "#",
        year: "2023",
        featured: true,
    },
    {
        title: "Kenzytours",
        slug: "kenzytours",
        description:
            "High-performance tourism platform with complex booking systems and trip management flows. Optimized for SSR and SEO.",
        highlights: [
            "Developed a high-performance booking enging with complex calendar logic.",
            "Stack: Next.js (SSR), Tailwind, SEO Optimization.",
            "Achieved perfect Lighthouse scores (100) for Performance and SEO.",
            "Increased organic traffic by 60% within 3 months of launch.",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        link: "https://kenzytours.com",
        year: "2023",
        featured: true,
    },
    {
        title: "Kemet Travel",
        slug: "kemet-travel",
        description:
            "Global tourism marketplace with robust filtering and advanced search for international travel catalogs.",
        highlights: [
            "Built a global tourism marketplace with robust filtering.",
            "Optimized for speed and complex search queries.",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        link: "https://kemettravel.com",
        year: "2023",
        featured: false,
    },
    {
        title: "SeenShow Streaming UI",
        slug: "seenshow",
        description:
            "Advanced movie streaming user interface with modern aesthetics and fluid transitions.",
        highlights: [
            "Designed and implemented a modern streaming UI with fluid transitions.",
            "Utilized Shadcn/UI for a premium component library feel.",
        ],
        tags: ["Next.js", "Shadcn/UI", "Tailwind CSS", "TypeScript"],
        link: "#",
        year: "2022",
        featured: false,
    },
    {
        title: "Kayef Partners",
        slug: "kayef",
        description:
            "Enterprise landing pages for coffee partners and internal applications.",
        highlights: [
            "Developed responsive landing pages for high-profile clients.",
            "Focus on brand consistency and asset optimization.",
        ],
        tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        link: "#",
        year: "2021",
        featured: false,
    },
    {
        title: "First Mas Hajj Services",
        slug: "first-mas",
        description:
            "Comprehensive Egyptian tourism company website for Hajj and Umrah pilgrimage services. Features package showcase system with pricing and booking information, optimized for tourism industry requirements.",
        highlights: [
            "Developed comprehensive website for Hajj and Umrah pilgrimage services.",
            "Implemented package showcase system with pricing and booking information.",
            "Optimized for tourism industry requirements and user experience.",
            "Integrated seamless booking flow for pilgrimage packages.",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Tourism"],
        link: "https://first-mas.com",
        year: "2024",
        featured: false,
    },
    {
        title: "HighSkyView Tourism",
        slug: "high-sky-view",
        description:
            "High-performance tourism platform built with Next.js SSR for superior SEO and fast page transitions, featuring complex booking flows and trip management.",
        highlights: [
            "Developed tourism platform with Next.js SSR for superior SEO performance.",
            "Implemented complex booking flows and trip management systems.",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Tourism"],
        link: "#",
        year: "2024",
        featured: false,
    },
    {
        title: "Gallery Zidan Furniture",
        slug: "gallery-zidan",
        description:
            "Showcase website for a heritage classic-furniture restoration and manufacturing business (est. 1940), specializing in repair, gilding, and French furniture craftsmanship.",
        highlights: [
            "Built a showcase website for a heritage classic-furniture restoration and manufacturing business established in 1940.",
            "Highlighted specialization in repair, gilding, and French furniture craftsmanship.",
            "Designed with premium aesthetics for the luxury furniture market.",
            "Featured comprehensive product galleries and company history.",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Furniture"],
        link: "https://gallery-zidan-front.vercel.app",
        year: "2024",
        featured: false,
    },
    {
        title: "ShodShop Price Comparison",
        slug: "shodshop",
        description:
            "A specialized price comparison platform for the Saudi Arabian market, enabling users to compare real-time prices across major retailers like Amazon and Noon.",
        highlights: [
            "Developed a real-time price comparison engine for Saudi Arabian e-commerce giants.",
            "Integrated data from multiple sources including Amazon and Noon.",
            "Optimized for fast searching and price tracking across various categories.",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "E-commerce"],
        link: "#",
        year: "2024",
        featured: false,
    },
    {
        title: "Karnly Grocery Comparison",
        slug: "karnly",
        description:
            "A comprehensive grocery price comparison platform allowing users to find the best deals across major retail chains including Carrefour, Seoudi, and Spinneys.",
        highlights: [
            "Engineered a high-concurrency scraping and data normalization engine for diverse grocery inventories.",
            "Implemented real-time price tracking and automated savings calculations for shopping baskets.",
            "Designed a mobile-first UI for seamless in-store price checking and list management.",
        ],
        tags: ["Next.js", "TypeScript", "TanStack Query", "E-commerce"],
        link: "#",
        year: "2025",
        featured: false,
    },
    {
        title: "Beesly AI Management Dashboard",
        slug: "beesly-ai",
        description:
            "Architected and developed the comprehensive management dashboard for Beesly AI, allowing businesses to monitor real-time AI voice interactions, manage automated bookings, and review conversation analytics.",
        highlights: [
            "Built a real-time monitoring interface for AI-powered voice conversations and automated call handling.",
            "Implemented an intuitive booking management system for visualizing and organizing AI-scheduled appointments.",
            "Integrated detailed conversation analytics and sentiment analysis modules for actionable business insights.",
        ],
        tags: ["Next.js", "AI", "Dashboard", "TanStack Query"],
        link: "https://www.producthunt.com/products/beesly-ai",
        year: "2024",
        featured: false,
    },
    {
        title: "Baian AI Invoice Extraction",
        slug: "baian",
        description:
            "A powerful AI-driven platform for automated invoice extraction and modification. Streamlines accounting workflows through seamless integrations with Zoho Books, Odoo, and WhatsApp.",
        highlights: [
            "Engineered an AI extraction engine to process and digitize complex, unstructured invoice documents.",
            "Developed a full integration suite for Zoho Books, enabling secure and automated data synchronization.",
            "Built dynamic interfaces for real-time document modification and multi-system integration management.",
            "Architected a scalable workflow for Odoo and WhatsApp-based document processing.",
        ],
        tags: ["Next.js", "AI", "SaaS", "Integrations"],
        link: "#",
        year: "2024",
        featured: true,
    },
];

export const CORE_COMPETENCIES = [
    "React.js",
    "Next.js (App Router, SSR, ISR, PPR)",
    "TypeScript",
    "JavaScript (ES6+)",
    "State Management (Redux Toolkit, Zustand)",
    "TanStack Query",
    "Tailwind CSS",
    "RBAC & Authentication",
    "REST APIs & WebSockets",
    "Performance Optimization",
    "Responsive Design & UI/UX",
    "SaaS Dashboard Architecture",
];

export const SKILLS = {
    core: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3"],
    nextjs: ["App Router", "Server-Side Rendering (SSR)", "Incremental Static Regeneration (ISR)", "Partial Prerendering (PPR)"],
    state: ["Redux Toolkit", "Zustand", "React Context API", "Signals"],
    ui: ["Tailwind CSS", "MUI", "Shadcn/UI", "Headless UI", "RizzUI", "Styled-components"],
    data: ["TanStack Query", "Axios", "RESTful APIs", "WebSockets"],
    dashboards: ["Enterprise dashboards", "Real-time data visualization", "Role-Based Access Control (RBAC)", "Authentication & session management", "Multi-module SaaS UIs"],
    testing: ["Unit & component testing", "GitLab CI", "Automated deployment workflows"],
    tools: ["Git", "Vite", "Webpack", "Performance Optimization", "SEO Best Practices", "Responsive Design"],
};

export const EDUCATION = {
    degree: "Bachelor of Commerce",
    institution: "Helwan University",
    period: "2014 - 2020",
    note: "Self-taught software engineering professional with a continuous learning mindset, focused on modern web architectures since 2015.",
};

export const LANGUAGES = [
    { language: "Arabic", proficiency: "Native" },
    { language: "English", proficiency: "Professional Working Proficiency" },
];

export const COMMUNITY = {
    title: "Open Source & Community Contributions",
    description: "Active contributor to the Open Source community, publishing and maintaining specialized libraries on NPM to assist React and Next.js developers worldwide.",
    npmUrl: "https://www.npmjs.com/~ahmednnasser111",
};
