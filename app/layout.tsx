import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SITE_URL, profile } from "@/content/profile";
import "./globals.css";

// next/font (node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md):
// two families, latin subset, swap. Both are variable fonts (one file each;
// this loader takes the full wght axis, no ranges). Inter Tight is preloaded, so
// "preload only 800" = preload this one file; the mono family is not preloaded.
const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

// Mono uses display "optional": a late swap re-wrapped the stack line and
// caused CLS 0.146 in Lighthouse. The §6 CLS budget wins over "swap" here.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "optional",
  preload: false,
  // A real monospace fallback has the same 0.6em advance; the default
  // size-adjusted Arial fallback wrapped the hero status line (CLS).
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  variable: "--font-jetbrains-mono",
});

const title = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: profile.description,
  applicationName: title,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    "Frontend Developer",
    "Cairo, Egypt",
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: title,
    title,
    description: profile.description,
    locale: "en_US",
  },
  twitter: { card: "summary", title, description: profile.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
  // Lets env(safe-area-inset-*) report the iPhone home-bar inset for the TabBar.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Extensions (wallets) and our own boot scripts set data-* on <html> before hydration.
      suppressHydrationWarning
      className={`${interTight.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-text px-5 py-3 font-semibold text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
