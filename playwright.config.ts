import { defineConfig, devices } from "@playwright/test";

const vp = (name: string, width: number, height: number) => ({
  name,
  use: { ...devices["Desktop Chrome"], viewport: { width, height }, isMobile: false },
});

export default defineConfig({
  testDir: "tests/e2e",
  retries: 0,
  reporter: "list",
  use: { baseURL: "http://localhost:3210" },
  webServer: {
    command: "node node_modules/next/dist/bin/next start -p 3210",
    url: "http://localhost:3210",
    reuseExistingServer: true,
  },
  projects: [
    vp("phone-360", 360, 780),
    vp("phone-390", 390, 844),
    vp("tablet-768", 768, 1024),
    vp("desktop-1440", 1440, 900),
  ],
});
