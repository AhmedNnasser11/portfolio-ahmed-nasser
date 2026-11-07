// Device tiers, decided once at boot (CLAUDE.md §6 rule 3, docs/PLAN.md §3).
// Precedence: static > low > desktop > phone. `?tier=` overrides for testing.
// navigator.deviceMemory / hardwareConcurrency / connection.saveData:
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory

export type Tier = "static" | "low" | "desktop" | "phone";

const TIERS: Tier[] = ["static", "low", "desktop", "phone"];

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export function detectTier(): Tier {
  const override = new URLSearchParams(location.search).get("tier");
  if (override && (TIERS as string[]).includes(override)) return override as Tier;

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";

  const desktop = matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
  if (!desktop) {
    const nav = navigator as NavigatorHints;
    const saveData = nav.connection?.saveData === true;
    const fewCores = (nav.hardwareConcurrency ?? 8) <= 2;
    // deviceMemory is capped at 8 and rounded; 6 GB phones report 4, so only "< 4" means low.
    const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    if (saveData || fewCores || lowMemory) return "low";
    return "phone";
  }
  return "desktop";
}
