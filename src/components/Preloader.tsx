"use client";
import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Logo from "./Logo";

// Each stroke of the AK monogram. Drawn in order with framer's pathLength so the
// animation is reliable regardless of font (no fragile stroke-dash math).
const STROKES = [
  "M26 124 L58 30 L90 124", // A — left leg up to apex, down right leg
  "M120 30 L120 124",       // K — stem
  "M120 80 L172 30",        // K — upper arm
  "M120 80 L174 124",       // K — lower arm
];

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.08, duration: 0.38, ease: "easeInOut" },
      opacity: { delay: i * 0.08, duration: 0.05 },
    },
  }),
};

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const complete = isMobile ? 1200 : 1350;

    const timer = setTimeout(onComplete, complete);
    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
    >
      <div className="flex flex-col items-center gap-7">
        <div className="relative flex h-32 w-44 items-center justify-center md:h-40 md:w-56">
          <motion.div className="absolute" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 0 }}>
            <Logo className="h-28 w-28 md:h-36 md:w-36" />
          </motion.div>

          {/* Self-drawing AK monogram */}
          <motion.svg
            viewBox="0 0 200 150"
            aria-hidden="true"
            className="h-auto w-36 overflow-visible md:w-44"
          >
            <defs>
              <linearGradient id="ak-monogram" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#9333ea" />
              </linearGradient>
            </defs>
            {STROKES.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="url(#ak-monogram)"
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={drawVariants}
                custom={i}
                initial="hidden"
                animate="visible"
              />
            ))}
          </motion.svg>
        </div>

        {/* Name */}
        <motion.div
          className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
        >
          Araiz Khan
        </motion.div>
      </div>
    </motion.div>
  );
}
