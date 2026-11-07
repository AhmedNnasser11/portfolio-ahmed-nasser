import type { NextConfig } from "next";

// CSP: "Without Nonces" (node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
// Nonces would force dynamic rendering; the page must stay static (CLAUDE.md §6 rule 13).
// 'unsafe-inline' scripts are still required: the App Router streams inline
// RSC payload scripts (self.__next_f.push) that SRI cannot hash.
// SRI below adds integrity hashes to every Next.js chunk <script>.
const isDev = process.env.NODE_ENV === "development";
const isHttpsDeploy = Boolean(process.env.VERCEL);

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isHttpsDeploy ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    sri: { algorithm: "sha256" },
    // inlineCss.md: Tailwind CSS is small; inlining removes the render-blocking
    // stylesheet request for first-time visitors (most visitors here).
    inlineCss: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    // `qualities` is required in Next 16 (image.md).
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
