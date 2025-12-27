export const PROFILE = {
    name: "Ahmed Nasser",
    title: "Senior Frontend Developer (React.js & Next.js)",
    location: "Cairo, Egypt",
    summary:
        "Dynamic and results-oriented Frontend Engineer with over 4 years of experience specializing in React.js and Next.js. Expert in building scalable, high-performance web applications and enterprise-grade dashboards. Proven track record in optimizing application performance through advanced techniques like code splitting and lazy loading. Skilled in modern state management (Redux, Zustand) and UI frameworks (Tailwind CSS, MUI, Shadcn). Adept at transforming complex business requirements into intuitive user experiences across education, insurance, and logistics sectors.",
    email: "ahmednnasser111@gmail.com",
    phone: "+20 10 686 920 41",
    links: {
        github: "https://github.com/AhmedNnasser11",
        linkedin: "https://www.linkedin.com/in/ahmed-nasser-931490212/",
        npm: "https://www.npmjs.com/~ahmednnasser111",
        resume: "/ahmed_cv_ats.pdf",
    },
};

export const EXPERIENCE = [
    {
        company: "INCode",
        role: "Frontend Developer",
        period: "Feb 2024 – Present",
        description:
            "Architected enterprise-grade systems and Voice AI platforms, focusing on scalability and complex business logic.",
        highlights: [
            "Elli: Architected a school management ecosystem with dynamic roles, quiz engines, and automated scheduling.",
            "Olimi.ai: Engineered a Voice AI management dashboard for 20+ languages with real-time analytics and sentiment analysis.",
            "Deraya: Built high-performance analytics dashboards for insurance and education sectors.",
            "Eatery/Kokomo: Developed a multi-brand restaurant management system with dynamic digital menus.",
            "Convest: Created a Shopify-integrated installment and supplier management dashboard.",
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
    {
        company: "Freelance",
        role: "Frontend Developer",
        period: "2024 – Present",
        description:
            "Delivered multiple end-to-end web applications for international clients, specializing in e-commerce, tourism, and real-time distribution systems.",
        highlights: [
            "Ajzaa: Engineered a multi-tenant e-commerce system with RBAC and real-time chat.",
            "Kenzytours & Kemet Travel: Developed high-performance tourism platforms with advanced booking and SEO.",
            "Rayan: Built a mission-critical distribution tracking system for the Hajj season.",
            "SeenShow: Designed and implemented a modern streaming UI with Shadcn/UI.",
        ],
        environment: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Redux", "Pusher"],
    },
];

export const PROJECTS = [
    {
        title: "Ajzaa E-commerce Dashboard",
        slug: "ajzaa",
        description:
            "Engineered a comprehensive multi-tenant vendor and admin dashboard. Features multi-store onboarding, shipping representative tracking, RBAC, and real-time chat support.",
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
        tags: ["Next.js", "TypeScript", "TanStack Query", "AI"],
        link: "#",
        year: "2024",
        featured: true,
    },
    {
        title: "Rayan Water Distribution",
        slug: "rayan",
        description:
            "Mission-critical web application to manage water distribution during Hajj season. Implemented point tracking and supervisor evaluation systems.",
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
        tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        link: "#",
        year: "2021",
        featured: false,
    },
];

export const SKILLS = {
    core: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3"],
    state: ["Redux Toolkit", "Zustand", "React Context API", "Signals"],
    ui: ["Tailwind CSS", "MUI", "Shadcn/UI", "Headless UI", "RizzUI", "Styled-components"],
    data: ["TanStack Query", "Axios", "RESTful APIs", "WebSockets"],
    tools: ["Git", "Vite", "Webpack", "Performance Optimization", "SEO", "Responsive Design"],
};
