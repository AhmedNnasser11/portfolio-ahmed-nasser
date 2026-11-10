// HD 9:16 reel capture: Playwright + CDP screencast at device pixels.
// Usage: node reel/hd.mjs  → reel/reel-9x16.mp4 (1080×1920, 30 fps)
// Phone viewport 414×736 (exact 9:16) @3x → 1242×2208 frames, downscaled with lanczos.
// Drives the page with reel/record.js; intro sped up 2× in the video only; cut at scroll end.
import { chromium } from "playwright";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const URL = "https://portfolio-ahmed-nasser.vercel.app/";
const W = 414, H = 736, DPR = 3;
const INTRO_SPEED = 2;
const OUT = path.join(dir, process.argv[2] ?? "reel-9x16.mp4");
const tmp = path.join(dir, ".frames");

await rm(tmp, { recursive: true, force: true });
await mkdir(tmp, { recursive: true });

const browser = await chromium.launch({ args: ["--force-color-profile=srgb"] });
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: DPR,
  isMobile: true,
  hasTouch: true,
  colorScheme: "dark",
});
const page = await ctx.newPage();
await page.addInitScript(() => (history.scrollRestoration = "manual"));
const cdp = await ctx.newCDPSession(page);

const frames = []; // { file, t } t = epoch seconds
const writes = [];
cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
  cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  const file = path.join(tmp, `${String(frames.length).padStart(5, "0")}.jpg`);
  frames.push({ file, t: metadata.timestamp });
  writes.push(writeFile(file, Buffer.from(data, "base64")));
});
await cdp.send("Page.startScreencast", {
  format: "jpeg",
  quality: 95,
  maxWidth: W * DPR,
  maxHeight: H * DPR,
  everyNthFrame: 1,
});

await page.goto(URL, { waitUntil: "domcontentloaded" });
const src = await readFile(path.join(dir, "record.js"), "utf8");
await page.evaluate(`(${src})()`);
await page.waitForFunction(() => window.__rec?.phase === "done", null, { timeout: 120000, polling: 250 });
const rec = await page.evaluate(() => ({
  ...window.__rec,
  origin: performance.timeOrigin,
  fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0,
}));
await page.waitForTimeout(600);
await cdp.send("Page.stopScreencast");
await Promise.all(writes);
await browser.close();

const ep = (ms) => (rec.origin + ms) / 1000;
const start = ep(rec.fcp), introEnd = ep(rec.introAt), end = ep(rec.endAt) + 0.3;
const used = frames.filter((f) => f.t >= start - 0.05 && f.t <= end);
// Video timeline: intro compressed by INTRO_SPEED, rest real time.
const vt = (t) => (t <= introEnd ? (t - start) / INTRO_SPEED : (introEnd - start) / INTRO_SPEED + (t - introEnd));
let list = "ffconcat version 1.0\n";
for (let i = 0; i < used.length; i++) {
  const d = (i + 1 < used.length ? vt(used[i + 1].t) : vt(end)) - vt(used[i].t);
  list += `file '${used[i].file.replace(/\\/g, "/")}'\nduration ${Math.max(d, 0.001).toFixed(4)}\n`;
}
list += `file '${used.at(-1).file.replace(/\\/g, "/")}'\n`;
const listFile = path.join(tmp, "list.txt");
await writeFile(listFile, list);

const span = end - start;
console.log(`frames ${used.length} over ${span.toFixed(1)}s real → ~${(used.length / span).toFixed(1)} fps captured`);
execFileSync("ffmpeg", [
  "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", listFile,
  "-vf", "fps=30,scale=1080:1920:flags=lanczos,format=yuv420p",
  "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-profile:v", "high",
  "-movflags", "+faststart", "-an", OUT,
], { stdio: "inherit" });
await rm(tmp, { recursive: true, force: true });
console.log(`saved ${OUT}`, JSON.stringify({ tier: rec.tier, introEnd: rec.introEnd, total: rec.total }));
