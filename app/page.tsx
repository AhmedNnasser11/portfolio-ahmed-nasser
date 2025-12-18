import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Resume Export</h1>
      <a
        href="/api/export-pdf"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Export PDF
      </a>
    </div>
  );
};

export default page;
