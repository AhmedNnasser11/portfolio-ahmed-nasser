// Layer 02 · Components. Facts from the CV (Open source: Next.js Architecture Lab).
const POINTS = [
  "Server vs. Client Components",
  "Suspense streaming",
  "URL-synced state",
  "Optimistic UI",
  "Feature-based structure",
];

export default function ArchLabDemo() {
  return (
    <div>
      <p className="text-[16px] leading-relaxed text-secondary">
        A reference implementation of modern <strong className="text-text">Next.js 16 / React 19</strong>{" "}
        architecture:
      </p>
      <ul className="mt-3 grid gap-2">
        {POINTS.map((p) => (
          <li key={p} className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 text-[15px]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[15px] leading-relaxed text-secondary">
        This page follows the same idea: it is a static, server-rendered page, and the JavaScript at
        first load is the framework plus a few small client islands. The scroll engine and these demos
        load on demand.
      </p>
      <a
        href="https://github.com/AhmedNnasser11/nextjs-architecture-lab"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-text px-5 text-[15px] font-semibold text-bg"
      >
        Open the Architecture Lab <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
