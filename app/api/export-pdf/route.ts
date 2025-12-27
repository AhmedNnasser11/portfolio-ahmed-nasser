import { NextResponse } from "next/server";
import { getBrowser } from "@/lib/puppeteer";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "ahmed_cv_ats.html");
        const htmlContent = fs.readFileSync(filePath, "utf-8");

        const browser = await getBrowser();
        const page = await browser.newPage();

        // Calculate years of experience dynamically
        const CAREER_START_DATE = new Date("2022-01-01");
        const experienceYears = Math.round((new Date().getTime() - CAREER_START_DATE.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

        let contentObj = htmlContent;
        // Replace "over 4 years" (or similar patterns from original HTML) with dynamic value
        // Note: The regex handles the static "over 4 years" in the source HTML.
        contentObj = contentObj.replace(/over \d+ years/, ` ${experienceYears} years`);

        // Set the content of the page
        await page.setContent(contentObj, { waitUntil: "networkidle0" });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            scale: 0.7,
            margin: {
                top: "20px",
                right: "20px",
                bottom: "20px",
                left: "20px"
            }
        });

        await browser.close();

        // Create response with PDF
        const response = new NextResponse(Buffer.from(pdfBuffer));
        response.headers.set("Content-Type", "application/pdf");
        response.headers.set("Content-Disposition", 'attachment; filename="ahmed_cv.pdf"');

        return response;
    } catch (error) {
        console.error("PDF Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
    }
}
