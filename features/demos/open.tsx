// Lazy entry for the live demos (CLAUDE.md §6 rule 10: demos load on open).
// Loaded with import() from StageBoot's click listener, then renders a <dialog>
// into its own React root, so none of this is in the initial bundle.
import { createRoot, type Root } from "react-dom/client";
import { DemoDialog } from "./DemoDialog";

let root: Root | null = null;

export function openDemo(id: string, trigger: HTMLElement | null) {
  if (!root) {
    const host = document.createElement("div");
    host.id = "demo-root";
    document.body.appendChild(host);
    root = createRoot(host);
  }
  const html = document.documentElement;
  html.style.overflow = "hidden"; // native scroll lock (phones); Lenis is stopped via the event
  document.dispatchEvent(new Event("demo:open"));

  const close = () => {
    root?.render(null);
    html.style.removeProperty("overflow");
    document.dispatchEvent(new Event("demo:close"));
    trigger?.focus({ preventScroll: true });
  };
  root.render(<DemoDialog key={`${id}-${Date.now()}`} id={id} onClose={close} />);
}
