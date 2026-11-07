// Run work after the load event, when the main thread is idle, so it never
// competes with first paint or hydration (CLAUDE.md §6 rule 5).
// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
export function afterLoadIdle(cb: () => void, timeout = 2000): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timer: number | undefined;

  const schedule = () => {
    if (cancelled) return;
    // Safari < 17.4 has no requestIdleCallback: fall back to a short timeout.
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => !cancelled && cb(), { timeout });
    } else {
      timer = setTimeout(() => !cancelled && cb(), 200) as unknown as number;
    }
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timer !== undefined) window.clearTimeout(timer);
  };
}
