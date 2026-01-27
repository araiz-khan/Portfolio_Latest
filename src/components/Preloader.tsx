"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useTheme } from 'next-themes';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [showText, setShowText] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Reduce animation duration on mobile or slow connection
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const textDelay = isMobile ? 600 : 800;
    const completeDelay = isMobile ? 1500 : 2000;

    // After text delay, show the text next to logo
    const timer1 = setTimeout(() => {
      setShowText(true);
    }, textDelay);

    // After showing text, morph logo to header (keep text visible)
    const timer2 = setTimeout(() => {
      onComplete();
    }, completeDelay);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="flex items-center gap-6">
        {/* AK LOGO - Always visible and will morph to header */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 120,
            damping: 20
          }}
        >
          <Logo className="w-32 h-32 md:w-40 md:h-40 text-6xl md:text-7xl drop-shadow-2xl" />
        </motion.div>

        {/* ARAIZ KHAN TEXT - Appears next to logo */}
        <AnimatePresence>
          {showText && (
            <motion.h1
              initial={{
                opacity: 0,
                x: -30,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                x: 30,
                scale: 0.8,
                transition: { duration: 0.4, ease: "easeIn" }
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
              className="text-4xl md:text-6xl font-bold text-foreground tracking-tight"
            >
              Araiz Khan
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}