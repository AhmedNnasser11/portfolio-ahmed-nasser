"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className="w-20 h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-800"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Spinning Progress */}
        <motion.div
          className="absolute inset-0 w-20 h-20 rounded-full border-t-2 border-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Pulse */}
        <motion.div
          className="absolute inset-0 m-auto w-3 h-3 bg-primary rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
