import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    title: "Ahmed Nasser | Front End Web Developer",
    description:
      "Explore the portfolio of Ahmed Nasser, featuring innovative web applications, dashboards, and freelance projects built with modern technologies.",
    siteName: "Ahmed Nasser Portfolio",
    images: [
      {
        url: "/og-image.png",
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
    creator: "@ahmednnasser111",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30`}
      >
        <Providers>
          <Navbar />
          <main className="pt-20 grow">{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
        <GoogleAnalytics gaId="G-NEL46ECT9Y" />
      </body>
    </html>
  );
}
