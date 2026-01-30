"use client";

import React, { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pre({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    if (!preRef.current) return;
    const code = preRef.current.innerText;
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute right-4 top-4 z-10 h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1.5 text-zinc-500 dark:text-zinc-400 opacity-0 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 group-hover:opacity-100",
          isCopied && "border-green-500/50 bg-green-500/10 text-green-500 opacity-100"
        )}
      >
        {isCopied ? <Check className="h-full w-full" /> : <Copy className="h-full w-full" />}
      </button>
      <pre
        ref={preRef}
        className={cn("overflow-x-auto", className)}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

export const mdxComponents = {
  pre: Pre,
};
