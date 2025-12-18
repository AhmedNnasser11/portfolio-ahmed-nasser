import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";

export async function getBrowser() {
    const isProd = process.env.NODE_ENV === "production";

    if (isProd) {
        const executablePath = await chromium.executablePath();
        console.log("[PDF Export] Executable path:", executablePath);

        return puppeteerCore.launch({
            args: chromium.args,
            defaultViewport: { width: 1920, height: 1080 },
            executablePath,
            headless: "shell",
        });
    }

    // Local development: use full Puppeteer
    return puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
}
