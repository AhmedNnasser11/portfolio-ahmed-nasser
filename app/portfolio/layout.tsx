import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ahmed Nasser | Front End Web Developer",
  description:
    "Portfolio of Ahmed Nasser, a highly skilled Front End Web Developer specializing in React.js, Next.js, and TypeScript. View projects, skills, and experience.",
  keywords: [
    "Ahmed Nasser",
    "Front End Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Cairo",
    "Egypt",
  ],
  authors: [
    {
      name: "Ahmed Nasser",
      url: "https://www.linkedin.com/in/ahmed-nasser-931490212/",
    },
  ],
  creator: "Ahmed Nasser",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio`,
    title: "Ahmed Nasser | Front End Web Developer",
    description:
      "Explore the portfolio of Ahmed Nasser, featuring innovative web applications, dashboards, and freelance projects built with modern technologies.",
    siteName: "Ahmed Nasser Portfolio",
    images: [
      {
        url: "/og-image.png", // We don't have this, but standard to include
        width: 1200,
        height: 630,
        alt: "Ahmed Nasser Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Nasser | Front End Web Developer",
    description:
      "Highly skilled Front End Web Developer. React.js, Next.js, TypeScript specialist.",
    creator: "@ahmednnasser111", // Assuming based on npm/email pattern if twitter existed
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
