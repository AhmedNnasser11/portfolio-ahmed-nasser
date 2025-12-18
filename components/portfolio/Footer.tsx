"use client";

import React from "react";

export function Footer() {
  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="text-center text-slate-500 dark:text-slate-600 py-12 border-t border-slate-200 dark:border-neutral-900 mt-12">
      <p>© {year || 2024} Ahmed Nasser.</p>
    </footer>
  );
}
