"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Linkedin, Twitter, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareActionsProps {
  title: string;
  slug: string;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function ShareActions({
  title,
  slug,
  className,
  orientation = "vertical",
}: ShareActionsProps) {
  const [copied, setCopied] = React.useState(false);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
  ];

  return (
    <div
      className={cn(
        "flex gap-2 items-center",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        <span className="sr-only">Copy link</span>
      </Button>

      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm"
          asChild
        >
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            <link.icon className="w-4 h-4" />
            <span className="sr-only">Share on {link.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
}
