"use client";

import { memo, useEffect, useRef, useState } from "react";

// Layer 05 · Engine. Recreates the CV story: an ERP page with 2,000 rows froze
// because every filter keystroke re-rendered every row; the fix split the
// component and moved the filter value from state to useRef.
// Everything shown is measured live in this browser (rAF frames, a
// layout-shift PerformanceObserver, row commits counted in effects).
// Input is scripted ("Run test"), so the broken mode never blocks real typing.

const CITIES = ["Cairo", "Riyadh", "Jeddah", "Alexandria", "Dammam", "Giza", "Mecca", "Medina"];
type Row = { id: number; name: string; city: string; amount: number };
const ROWS: Row[] = Array.from({ length: 2000 }, (_, i) => ({
  id: i + 1,
  name: `Booking ${String(i + 1).padStart(4, "0")}`,
  city: CITIES[(i * 7) % CITIES.length],
  amount: ((i * 7919) % 100000) / 100,
}));
const SCRIPT = "booking 01"; // keeps all 2,000 rows for most keystrokes, like a real search
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const match = (r: Row, q: string) =>
  !q || `${r.name} ${r.city}`.toLowerCase().includes(q.toLowerCase());

// Row commits during a test run, counted in an effect (runs once per committed render).
const counter = { commits: 0 };

function RowView({ row }: { row: Row }) {
  useEffect(() => {
    counter.commits += 1;
  });
  return (
    <tr className="border-b border-line">
      <td className="py-1 pr-3 font-mono text-muted">{row.id}</td>
      <td className="py-1 pr-3">{row.name}</td>
      <td className="py-1 pr-3 text-secondary">{row.city}</td>
      <td className="py-1 text-right font-mono">{money.format(row.amount)}</td>
    </tr>
  );
}
const MemoRow = memo(RowView);

function Table({ query, memoRows }: { query: string; memoRows: boolean }) {
  const rows = ROWS.filter((r) => match(r, query));
  const R = memoRows ? MemoRow : RowView;
  return (
    <table className="w-full text-left text-[13px]">
      <tbody>
        {rows.map((r) => (
          <R key={r.id} row={r} />
        ))}
      </tbody>
    </table>
  );
}
const MemoTable = memo(Table);

type Result = { mode: Mode; fps: number; longest: number; commits: number; shift: number; ms: number };
type Mode = "broken" | "fixed";

const nextFrame = () => new Promise<number>((r) => requestAnimationFrame(r));
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Scripted typing + live measurement (outside the component: event-time only). */
async function measure(mode: Mode, type: (text: string) => void, finish: () => void): Promise<Result> {
  counter.commits = 0;
  let shift = 0;
  const po = new PerformanceObserver((list) => {
    for (const e of list.getEntries() as Array<PerformanceEntry & { value: number; hadRecentInput: boolean }>) {
      if (!e.hadRecentInput) shift += e.value;
    }
  });
  try {
    po.observe({ type: "layout-shift" });
  } catch {
    /* not supported (Safari/Firefox): reported as 0 */
  }
  let frames = 0;
  let longest = 0;
  let last = performance.now();
  let measuring = true;
  const loop = (t: number) => {
    frames++;
    longest = Math.max(longest, t - last);
    last = t;
    if (measuring) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  const start = performance.now();
  for (let i = 1; i <= SCRIPT.length; i++) {
    type(SCRIPT.slice(0, i));
    await wait(30); // fast typing: the run stays inside the 500 ms input window (shifts are input-driven)
  }
  finish();
  await nextFrame();
  await nextFrame();
  measuring = false;
  po.disconnect();
  const ms = performance.now() - start;
  return {
    mode,
    fps: Math.round((frames / ms) * 1000),
    longest: Math.round(longest),
    commits: counter.commits,
    shift: Math.round(shift * 1000) / 1000,
    ms: Math.round(ms),
  };
}

export default function BreakItDemo() {
  const [mode, setMode] = useState<Mode>("broken");
  const [query, setQuery] = useState(""); // broken: filter lives in state
  const [applied, setApplied] = useState(""); // fixed: applied once, after typing
  const inputRef = useRef<HTMLInputElement>(null); // fixed: typing goes to the ref only
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const reset = (m: Mode) => {
    setMode(m);
    setQuery("");
    setApplied("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const run = async () => {
    setRunning(true);
    reset(mode);
    await nextFrame();
    await nextFrame();
    const result = await measure(
      mode,
      (text) => {
        if (mode === "broken") setQuery(text); // every keystroke re-renders the table
        else if (inputRef.current) inputRef.current.value = text; // no React render at all
      },
      () => {
        if (mode === "fixed") setApplied(SCRIPT); // one render when typing is done
      },
    );
    setResults((r) => [result, ...r.filter((x) => x.mode !== mode)].slice(0, 2));
    setRunning(false);
  };

  return (
    <div>
      <div role="group" aria-label="Mode" className="mb-4 flex flex-wrap gap-2">
        {(["broken", "fixed"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            disabled={running}
            onClick={() => reset(m)}
            className={`min-h-11 rounded-full border px-5 text-[14px] font-semibold ${mode === m ? (m === "broken" ? "border-[#f87171] bg-[#f87171] text-bg" : "border-ok bg-ok text-bg") : "border-line text-secondary"}`}
          >
            {m === "broken" ? "Break it" : "Fix it"}
          </button>
        ))}
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="min-h-11 rounded-full bg-text px-5 text-[14px] font-semibold text-bg disabled:opacity-60"
        >
          {running ? "Typing…" : `Run test: type “${SCRIPT}”`}
        </button>
      </div>

      <p className="mb-3 text-[14px] leading-relaxed text-secondary">
        {mode === "broken"
          ? "Broken: the filter is React state, so every keystroke re-renders all 2,000 rows."
          : "Fixed: typing goes to a useRef (no re-render), the table is a separate memoized component, and the filter is applied once."}
      </p>

      {results.length > 0 && (
        <table className="mb-4 w-full text-left font-mono text-[12px] tabular-nums">
          <thead className="text-muted">
            <tr>
              <th className="py-1 font-normal">mode</th>
              <th className="py-1 font-normal">fps</th>
              <th className="py-1 font-normal">longest frame</th>
              <th className="py-1 font-normal">row renders</th>
              <th className="py-1 font-normal">layout shift</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.mode}>
                <td className={r.mode === "broken" ? "text-[#f87171]" : "text-ok"}>{r.mode}</td>
                <td>{r.fps}</td>
                <td>{r.longest} ms</td>
                <td>{r.commits.toLocaleString("en-US")}</td>
                <td>{r.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <label className="mb-2 block">
        <span className="mono-label">Filter (scripted)</span>
        <input
          key={mode /* controlled in broken mode, uncontrolled (ref) in fixed mode */}
          ref={inputRef}
          readOnly
          name="filter"
          autoComplete="off"
          value={mode === "broken" ? query : undefined}
          defaultValue={mode === "fixed" ? "" : undefined}
          className="mt-1 w-full rounded-xl border border-line bg-surface-2 px-3 py-2 font-mono text-[14px]"
        />
      </label>
      <p className="mb-2 font-mono text-[12px] text-muted">2,000 rows · mock data · measured in this browser</p>
      <div className="max-h-[40vh] overflow-auto rounded-xl border border-line px-3" data-lenis-prevent>
        {mode === "broken" ? (
          <Table query={query} memoRows={false} />
        ) : (
          <MemoTable query={applied} memoRows />
        )}
      </div>
    </div>
  );
}
