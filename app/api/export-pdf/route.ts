import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "ahmed_cv_ats.html");
        const htmlContent = fs.readFileSync(filePath, "utf-8");

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the content of the page
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

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
