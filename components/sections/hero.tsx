"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/layout-primitives";
import { PROFILE } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Linkedin } from "lucide-react";
import Link from "next/link";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 } as any,
  },
};

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <Container>
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="max-w-3xl"
        >
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70"
          >
            I build digital products with{" "}
            <span className="text-primary">precision</span> and{" "}
            <span className="text-primary italic">purpose</span>.
          </motion.h1>

          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-xl text-muted-foreground mb-10 leading-relaxed"
          >
            {PROFILE.summary}
          </motion.p>

          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex flex-col gap-3 mb-10 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">📍</span>
              <span>{PROFILE.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">✉️</span>
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:text-primary transition-colors"
              >
                {PROFILE.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">📱</span>
              <a
                href={`tel:${PROFILE.phone}`}
                className="hover:text-primary transition-colors"
              >
                {PROFILE.phone}
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" asChild>
              <Link href="#projects">
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="shadow-lg hover:shadow-xl transition-shadow"
              asChild
            >
              <a href="/api/export-pdf">
                Download CV <Download className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <div className="flex gap-2 ml-auto items-center">
              <Button variant="ghost" size="icon" asChild>
                <Link href={PROFILE.links.linkedin}>
                  <Linkedin size={20} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
