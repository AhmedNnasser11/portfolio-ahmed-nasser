import { expect, type Page } from "@playwright/test";

export const SECTIONS = ["top", "layers", "stack", "experience", "work", "contact"];

export async function scrollThrough(page: Page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = await page.evaluate(() => window.innerHeight);
  for (let y = 0; y <= h; y += Math.round(vh * 0.8)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(300);
}

export async function skipIntro(page: Page) {
  const b = page.locator("button.intro-skip");
  if (await b.isVisible().catch(() => false)) await b.click();
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
}

export async function openDemo(page: Page, id: string) {
  const btn = page.locator(`button.demo-open[data-demo="${id}"]`);
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await expect(page.locator("dialog.demo-dialog[open]")).toBeVisible();
  await expect(page.locator("#demo-title")).not.toBeEmpty();
  return btn;
}
