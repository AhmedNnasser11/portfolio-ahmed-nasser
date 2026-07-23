"use client";

export function useCvDownload() {
    const handleDownload = (e?: { preventDefault: () => void }) => {
        e?.preventDefault();
        const link = document.createElement("a");
        link.href = "/Ahmed_Nasser_front_end_react_next_CV.pdf";
        link.download = "Ahmed_Nasser_front_end_react_next_CV.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return { isDownloading: false, handleDownload };
}
