"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import Preloader from "../components/Preloader";
import Header from "../components/header";
import Footer from '@/components/footer';

const HeroSection = dynamic(() => import('@/components/sections/hero-section'), { ssr: true });
const AboutSection = dynamic(() => import('@/components/sections/about-section'), { ssr: true });
const SkillsSection = dynamic(() => import('@/components/sections/skills-section'), { ssr: true });
const ServicesSection = dynamic(() => import('@/components/sections/services-section'), { ssr: true });
const ProjectsSection = dynamic(() => import('@/components/sections/projects-section'), { ssr: true });
const ContactSection = dynamic(() => import('@/components/sections/contact-section'), { ssr: true });

const PRELOADER_SEEN = 'preloader-seen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // The intro plays once per browser session: returning to the page (refresh,
  // back from /projects) goes straight to content. Skipped entirely under
  // reduced motion. Layout effect so the skip happens before first paint.
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(PRELOADER_SEEN) === '1';
    } catch {
      // storage blocked (private mode etc.): just play the intro
    }
    if (prefersReducedMotion || seen) setIsLoading(false);
  }, []);

  // Arriving with a section hash (e.g. "/#contact" from /projects): the
  // sections mount after the intro / dynamic import, so the browser's own
  // anchor jump finds nothing. Once content is up, wait for the target to
  // exist, then jump there (instant: we're arriving, not moving within a page).
  useEffect(() => {
    if (isLoading) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let frame = 0;
    const started = performance.now();
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
      if (performance.now() - started < 4000) frame = requestAnimationFrame(tryScroll);
    };
    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem(PRELOADER_SEEN, '1');
    } catch {
      // ignore
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-transparent text-foreground">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="flex min-h-screen flex-col">
           {/* When Preloader unmounts, Header mounts.
               The Logo detects it exists in both and "flies" to the new position. */}
           <Header />
           <div className="flex-1">
             <HeroSection />
             <AboutSection />
             <SkillsSection />
             <div className="mx-auto max-w-7xl px-4 md:px-6">
               <div className="h-px w-full bg-border" />
             </div>
             <ServicesSection />
             <ProjectsSection />
             <ContactSection />
           </div>
           <Footer />
        </div>
      )}
    </main>
  );
}
