"use client";

import { useState } from "react";

export function useCvDownload() {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async (e?: React.MouseEvent) => {
        // Prevent navigation if it's an anchor tag click
        if (e) e.preventDefault();

        try {
            setIsDownloading(true);
            const response = await fetch("/api/export-pdf");
            if (!response.ok) throw new Error("Download failed");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "Ahmed_Nasser_Frontend_Web_Developer_CV.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            alert("Failed to download PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return { isDownloading, handleDownload };
}
