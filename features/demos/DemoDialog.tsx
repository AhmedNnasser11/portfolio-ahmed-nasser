import { lazy, Suspense, useEffect, useRef } from "react";
import { layers } from "@/content/layers";

// One lazy chunk per demo, fetched only when that demo opens.
const DEMOS = {
  interface: lazy(() => import("./RtlDemo")),
  components: lazy(() => import("./ArchLabDemo")),
  data: lazy(() => import("./RbacDemo")),
  shield: lazy(() => import("./XssDemo")),
  engine: lazy(() => import("./BreakItDemo")),
  "ai-quality": lazy(() => import("./AuditorsDemo")),
} as const;

type Props = { id: string; onClose: () => void };

/** Native modal <dialog>: focus trap, Escape and ::backdrop for free. */
export function DemoDialog({ id, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const layer = layers.find((l) => l.id === id);
  const Demo = DEMOS[id as keyof typeof DEMOS];

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
