import { expect, test } from "@playwright/test";
import { openDemo, scrollThrough, SECTIONS, skipIntro } from "./helpers";

test("a. no console errors / pageerrors during load and full scroll", async ({ page }) => {
  const errs: string[] = [];
  page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text()));
  page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  await page.goto("/");
  await scrollThrough(page);
  expect(errs).toEqual([]);
});

test("b. no horizontal scroll at top and bottom", async ({ page }) => {
  await page.goto("/");
  const over = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(await over()).toBeLessThanOrEqual(0);
  await scrollThrough(page);
  expect(await over()).toBeLessThanOrEqual(0);
});

test("c. every chapter renders; h1 exact; header title always visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Ahmed Nasser — Frontend Developer");
  const header = page.locator("header.sticky");
  const title = header.getByText("Frontend Developer").first();
  await expect(title).toBeVisible();
  for (const id of SECTIONS) {
    const s = page.locator(`#${id}`);
    await expect(s).toHaveCount(1);
    await page.evaluate((i) => document.getElementById(i)!.scrollIntoView(), id);
    await page.waitForTimeout(150);
    await expect(s).toBeVisible();
    await expect(title).toBeVisible();
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(title).toBeVisible();
});

test("c2. mobile tab bar only below 768px", async ({ page, viewport }) => {
  await page.goto("/");
  const nav = page.locator('nav[aria-label="Sections"]');
  if (viewport!.width < 768) {
    await expect(nav).toBeVisible();
    await expect(nav.locator("a")).toHaveCount(5);
  } else await expect(nav).toBeHidden();
});

test("d. intro skip / replay / scroll-skip", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(page.locator("#intro")).toBeVisible();
  await page.locator("button.intro-skip").click();
  await expect(html).toHaveAttribute("data-intro", "done");
  await expect(page.locator("#intro")).toBeHidden();
  await expect(page.locator("button.intro-replay")).toBeVisible();
  await page.locator("button.intro-replay").click();
  await expect(html).toHaveAttribute("data-intro", "playing");
  await expect(page.locator("#intro")).toBeVisible();
  await page.mouse.move(100, 300);
  await page.mouse.wheel(0, 300);
  await expect(html).toHaveAttribute("data-intro", "done");
  await expect(page.locator("#intro")).toBeHidden();
});

test("e. all six demos open and close with Escape, focus returns", async ({ page }) => {
  await page.goto("/?tier=static");
  await skipIntro(page);
  await expect(page.locator("button.demo-open[data-demo]")).toHaveCount(6);
  for (const id of ["interface", "components", "data", "shield", "engine", "ai-quality"]) {
    const btn = await openDemo(page, id);
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog.demo-dialog")).toHaveCount(0);
    await expect(btn).toBeFocused();
  }
});

test("f. EN/AR toggles RTL", async ({ page }) => {
  await page.goto("/?tier=static");
  await skipIntro(page);
  await openDemo(page, "interface");
  const dlg = page.locator("dialog.demo-dialog");
  await dlg.getByRole("button", { name: "عربي" }).click();
  await expect(dlg.locator('[dir="rtl"][lang="ar"]')).toBeVisible();
  await dlg.getByRole("button", { name: "EN", exact: true }).click();
  await expect(dlg.locator('[dir="rtl"]')).toHaveCount(0);
  await expect(dlg.locator('[dir="ltr"]').first()).toBeVisible();
});

test("g. keyboard only", async ({ page, viewport }) => {
  test.skip(![390, 1440].includes(viewport!.width), "desktop-1440 and phone-390 only");
  await page.goto("/?tier=static");
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(first).toMatch(/Skip to content/i);
  let found = false;
  const bad: string[] = [];
  for (let i = 0; i < 80 && !found; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const cs = getComputedStyle(el);
      return {
        demo: el.matches("[data-demo]"),
        desc: el.tagName + "." + el.className + " " + (el.textContent ?? "").trim().slice(0, 30),
        outline: cs.outlineStyle,
        skip: /skip to content/i.test(el.textContent ?? ""),
        shadow: cs.boxShadow,
      };
    });
    if (info.outline === "none" && !info.skip) bad.push(`${info.desc} (box-shadow: ${info.shadow})`);
    found = info.demo;
  }
  expect(found, "reached a [data-demo] button within 80 tabs").toBe(true);
  expect(bad).toEqual([]);
  const focused = page.locator(":focus");
  await page.keyboard.press("Enter");
  await expect(page.locator("dialog.demo-dialog[open]")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog.demo-dialog")).toHaveCount(0);
  await expect(focused).toBeFocused();
});

test("h. reduced motion gives static version", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#intro")).toBeHidden();
  await expect(page.locator("html")).toHaveAttribute("data-tier", "static");
  const panels = page.locator(".stage-panel");
  await expect(panels).toHaveCount(6);
  for (let i = 0; i < 6; i++) await expect(panels.nth(i)).toBeVisible();
  const innerWidth = page.viewportSize()!.width;
  const { h, vh } = await page.evaluate(() => ({
    h: document.getElementById("layers")!.getBoundingClientRect().height,
    vh: window.innerHeight,
  }));
  // Six stacked cards on a phone are legitimately ~3.8 viewports tall; the scroll stage is 7 viewports.
  expect(h).toBeLessThan((innerWidth < 768 ? 5 : 3) * vh);
});

test("i. XSS payload is inert", async ({ page }) => {
  const reqs: string[] = [];
  page.on("request", (r) => reqs.push(r.url()));
  await page.goto("/?tier=static");
  await skipIntro(page);
  await openDemo(page, "shield");
  await page.locator("textarea#xss-input").fill('<img src=x onerror="window.__p=1">');
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => (window as unknown as { __p?: number }).__p)).toBeUndefined();
  expect(reqs.filter((u) => /\/x(\?|$)/.test(u))).toEqual([]);
});

test("j. JS disabled still serves content", async ({ browser, baseURL, viewport }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: viewport!, baseURL });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#intro")).toBeHidden();
  await expect(page.locator(".demo-open").first()).toBeHidden();
  for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toHaveCount(1);
  await ctx.close();
});

test("k. blocked JS: hero readable, CSS-only reel ends", async ({ page }) => {
  await page.route("**/_next/static/**/*.js", (r) => r.abort());
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#intro")).toBeHidden({ timeout: 12_000 });
});

test("l. phone has no blur / backdrop-filter / preserve-3d", async ({ page, viewport }) => {
  test.skip(viewport!.width !== 390, "phone-390 only");
  await page.goto("/");
  await skipIntro(page);
  await scrollThrough(page);
  const bad = await page.evaluate(() => {
    const out: string[] = [];
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      const d = el.tagName + "." + (el.getAttribute("class") ?? "").slice(0, 40);
      const bf = cs.backdropFilter || (cs as unknown as Record<string, string>).webkitBackdropFilter;
      if (bf && bf !== "none") out.push(`${d} backdrop-filter:${bf}`);
      if (cs.filter.includes("blur")) out.push(`${d} filter:${cs.filter}`);
      if (cs.transformStyle === "preserve-3d") out.push(`${d} preserve-3d`);
    }
    return out;
  });
  expect(bad).toEqual([]);
});

test("m. scroll-mode panel demo opens", async ({ page, viewport }) => {
  test.skip(![390, 1440].includes(viewport!.width), "desktop-1440 and phone-390 only");
  await page.goto("/");
  await skipIntro(page);
  await page.evaluate(() => {
    const l = document.getElementById("layers")!;
    const top = l.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + 0.5 * (l.offsetHeight - window.innerHeight));
  });
  const active = page.locator('.stage-panel[data-state="active"]');
  await expect(active).toHaveCount(1, { timeout: 10_000 });
  await active.locator(".demo-open").click();
  await expect(page.locator("dialog.demo-dialog[open]")).toBeVisible();
});
