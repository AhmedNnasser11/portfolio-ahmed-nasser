import { lazy, Suspense, useEffect, useRef } from "react";
import { layers } from "@/content/layers";

// One lazy chunk per demo, fetched only when that demo is about to open
// (hover/focus/press preloads it: vercel-react-best-practices bundle-preload).
const LOADERS = {
  interface: () => import("./RtlDemo"),
  components: () => import("./ArchLabDemo"),
  data: () => import("./RbacDemo"),
  shield: () => import("./XssDemo"),
  engine: () => import("./BreakItDemo"),
  "ai-quality": () => import("./AuditorsDemo"),
} as const;
type DemoId = keyof typeof LOADERS;

const DEMOS = {
  interface: lazy(LOADERS.interface),
  components: lazy(LOADERS.components),
  data: lazy(LOADERS.data),
  shield: lazy(LOADERS.shield),
  engine: lazy(LOADERS.engine),
  "ai-quality": lazy(LOADERS["ai-quality"]),
} satisfies Record<DemoId, unknown>;

/** Starts fetching a demo chunk early; import() dedupes, so lazy() reuses it. */
export function preloadDemo(id: string) {
  if (id in LOADERS) void LOADERS[id as DemoId]().catch(() => {});
}

type Props = { id: string; onClose: () => void };

/** Native modal <dialog>: focus trap, Escape and ::backdrop for free. */
export function DemoDialog({ id, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const layer = layers.find((l) => l.id === id);
  const Demo = DEMOS[id as DemoId];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    d.showModal();
    const onCancel = () => onClose();
    d.addEventListener("close", onCancel);
    return () => d.removeEventListener("close", onCancel);
  }, [onClose]);

  if (!layer || !Demo) return null;

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-title"
      data-lenis-prevent
      className="demo-dialog"
      onClick={(e) => {
        // Click on the backdrop (the dialog box itself, outside the content) closes.
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      <div className="demo-body">
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mono-label mb-1">
              Layer {layer.number} · {layer.name} · live demo
            </p>
            <h2 id="demo-title" className="text-[clamp(22px,5.5vw,30px)] leading-tight font-extrabold tracking-[-0.035em]">
              {layer.demo}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line font-mono text-[12px] tracking-[0.12em] uppercase hover:border-accent"
            aria-label="Close demo"
          >
            ✕
          </button>
        </header>
        <Suspense fallback={<p className="mono-label py-10 text-center">Loading demo…</p>}>
          <Demo />
        </Suspense>
      </div>
    </dialog>
  );
}
