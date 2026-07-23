import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ahmed Nasser — Front-End Web Developer & React/Next.js Specialist",
    short_name: "Ahmed Nasser",
    description:
      "Portfolio of Ahmed Nasser, a highly skilled Front-End Web Developer specializing in React.js, Next.js, and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#09090b",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
