'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Glass } from 'glisse';
import { ArrowRight, ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { smoothScrollTo } from '@/lib/smooth-scroll';
import './hero.css';

// Decorative-only: load after hydration so it stays off the initial bundle/SSR.
const ParticleBackground = dynamic(() => import('../particle-background'), { ssr: false });

// The tagline's last word cycles through these (blur cross-fade, not typing).
const WORDS = ['fast.', 'intelligent.', 'beautiful.', 'effortless.'];
const WORD_INTERVAL = 2800;

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Cycles WORDS while the hero is on screen and the tab is visible. */
function useRotatingWord() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const el = ref.current;
    let visible = true;
    const io = el
      ? new IntersectionObserver(([entry]) => {
          visible = Boolean(entry?.isIntersecting);
        })
      : null;
    if (el) io?.observe(el);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setIndex((i) => (i + 1) % WORDS.length);
    }, WORD_INTERVAL);
    return () => {
      window.clearInterval(id);
      io?.disconnect();
    };
  }, []);

  // Size the word box to the *current* word so the line stays tight.
  const [widths, setWidths] = useState<number[]>([]);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidths(Array.from(el.children, (child) => (child as HTMLElement).offsetWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el.parentElement ?? el);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  return { index, ref, width: widths[index] };
}

/**
 * Lock-screen style depth: the pointer's offset from the hero's centre,
 * spring-smoothed (critically damped). The name and the portrait read it at
 * different strengths so the layers separate. Fine pointers only; off under
 * reduced motion.
 */
function useDepthParallax() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 110, damping: 21, mass: 1 });
  const y = useSpring(py, { stiffness: 110, damping: 21, mass: 1 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [px, py]);

  return { x, y, ref };
}

/**
 * Hero: your name across the full width in huge thin type, you (a
 * background-free cutout) standing in front of it so your head overlaps the
 * letters, your role either side of your face, and the intro + actions in the
 * bottom-left. Depth parallax on the pointer; everything enters once.
 */
export default function HeroSection() {
  const { index, ref: wordRef, width: wordWidth } = useRotatingWord();
  const { x, y, ref: sectionRef } = useDepthParallax();
  // Text layers are "further away" than you, so they move less (and opposite).
  const backX = useTransform(x, (v) => v * -12);
  const backY = useTransform(y, (v) => v * -6);
  const personX = useTransform(x, (v) => v * 14);
  const personY = useTransform(y, (v) => v * 8);

  // In-page links scroll with the shared GSAP scroller (there's no CSS
  // scroll-behavior: smooth to fall back on).
  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) smoothScrollTo(section);
  };

  return (
    <section ref={sectionRef} id="hero" className="hero">
      <ParticleBackground particleCount={30} className="absolute inset-0 z-0 h-full w-full" />

      {/* ---- Depth stage: name + role behind, you in front ---- */}
      <div className="hero-stage">
        <motion.h1 className="hero-name" style={{ x: backX, y: backY }}>
          Araiz Khan
        </motion.h1>

        <motion.p className="hero-role" style={{ x: backX, y: backY }}>
          <span className="hero-role-left">Full Stack</span>
          <span className="sr-only"> &amp; </span>
          <span className="hero-role-right">AI Developer</span>
        </motion.p>

        <div className="hero-person" aria-hidden="true">
          <motion.div className="hero-person-layer" style={{ x: personX, y: personY }}>
            <Image src="/hero-portrait.png" alt="" fill priority sizes="(min-width: 1024px) 620px, 92vw" />
          </motion.div>
        </div>
      </div>

      {/* ---- Intro + actions (bottom-left) ---- */}
      <div className="hero-info">
        <Glass className="hero-pill hero-enter" style={{ ['--d' as string]: '380ms' }}>
          <MapPin aria-hidden /> Based in Lahore, Pakistan
        </Glass>

        <p className="hero-tagline hero-enter" style={{ ['--d' as string]: '440ms' }}>
          <span className="sr-only">I build web experiences that feel fast, intelligent, beautiful and effortless.</span>
          <span aria-hidden="true">
            Web experiences that feel
            {/* the word gets its own line, so the block never reflows as it changes */}
            <br />
            <span ref={wordRef} className="hero-word" style={wordWidth ? { width: `${wordWidth}px` } : undefined}>
              {WORDS.map((word, i) => (
                <span
                  key={word}
                  className="hero-word-item"
                  data-state={
                    i === index ? 'active' : i === (index + WORDS.length - 1) % WORDS.length ? 'leaving' : 'waiting'
                  }
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
        </p>

        <p className="hero-lede hero-enter" style={{ ['--d' as string]: '500ms' }}>
          Full-stack &amp; AI developer building high-performance web apps, from generative-AI products to polished,
          scalable platforms.
        </p>

        <div className="hero-actions hero-enter" style={{ ['--d' as string]: '560ms' }}>
          <Button asChild>
            <Link href="#projects" onClick={scrollToSection('projects')}>
              View my work <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Link href="#contact" onClick={scrollToSection('contact')} className="hero-link">
            Get in touch <ChevronRight aria-hidden />
          </Link>
        </div>
      </div>

      <div className="hero-cue">
        <Link href="#about" onClick={scrollToSection('about')} className="scroll-cue" aria-label="Scroll down">
          <ChevronDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
