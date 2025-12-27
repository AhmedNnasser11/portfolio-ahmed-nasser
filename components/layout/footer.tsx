import React from "react";
import { Container } from "@/components/layout/layout-primitives";
import { PROFILE } from "@/lib/data";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold tracking-tighter">
              AN<span className="text-primary">.</span>
            </span>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, Tailwind v4, and Framer Motion.
            </p>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link
              href={PROFILE.links.github}
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href={PROFILE.links.linkedin}
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href={PROFILE.links.npm}
              className="hover:text-foreground transition-colors"
            >
              NPM
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            © {currentYear} {PROFILE.name}. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
