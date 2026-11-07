import { SITE_URL, links, profile } from "@/content/profile";

// node_modules/next/dist/docs/01-app/02-guides/json-ld.md: render as <script>,
// escape "<" as <. Facts from CLAUDE.md §4 / the CV only; no phone number.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: profile.name,
      jobTitle: profile.title,
      description: profile.description,
      // Current employer, as shown in the Experience section (GEO: clear entity relationships).
      worksFor: { "@type": "Organization", name: "E2E County" },
      url: SITE_URL,
      email: `mailto:${links.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
      sameAs: [links.github, links.linkedin, links.npm],
      knowsAbout: [...profile.coreStack, ...profile.secondaryStack],
      knowsLanguage: ["ar", "en"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${profile.name} — ${profile.title}`,
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escape <, > and & after serialization (nextjs-react-security xss-checklist).
        __html: JSON.stringify(jsonLd)
          .replace(/</g, "\\u003c")
          .replace(/>/g, "\\u003e")
          .replace(/&/g, "\\u0026"),
      }}
    />
  );
}
