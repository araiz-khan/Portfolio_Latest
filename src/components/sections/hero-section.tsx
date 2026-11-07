'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import TextType from '../TextType';
import { smoothScrollTo } from '@/lib/smooth-scroll';
import dynamic from 'next/dynamic';

// Decorative-only: load after hydration so it stays off the initial bundle/SSR.
const ParticleBackground = dynamic(() => import('../particle-background'), { ssr: false });



const HERO_PHRASES = [
  "I Build Modern Web Experiences",
  "I Engineer Scalable Solutions",
  "I Create Beautiful Interfaces",
  "I Solve Complex Problems",
];

const HERO_TEXT_CLASSES =
  "text-4xl font-bold tracking-tighter !leading-tight sm:text-5xl md:text-6xl xl:text-7xl";

export default function HeroSection() {

  // In-page links scroll with the shared GSAP scroller (there's no CSS
  // scroll-behavior: smooth to fall back on).
  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) smoothScrollTo(section);
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen overflow-hidden bg-transparent transition-colors duration-300 flex flex-col justify-center"
      style={{ minHeight: 'max(600px, 100vh)' }}
    >
      <ParticleBackground
        particleCount={30}
        className="absolute inset-0 z-0 h-full w-full"
      />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6 pt-16">
        <div className="grid items-center gap-12 md:grid-cols-1">
          <div className="flex flex-col justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="font-body text-lg font-semibold text-primary/80">Hi, I&apos;m Araiz Khan</h1>
              <div className="grid">
                {/* Invisible sizer: reserves height for the tallest phrase at every
                    breakpoint so the heading never resizes mid-animation. */}
                {HERO_PHRASES.map((phrase) => (
                  <span
                    key={phrase}
                    aria-hidden="true"
                    className={`invisible col-start-1 row-start-1 ${HERO_TEXT_CLASSES}`}
                  >
                    {phrase}
                  </span>
                ))}
                <TextType
                  as="h2"
                  text={HERO_PHRASES}
                  className={`col-start-1 row-start-1 ${HERO_TEXT_CLASSES}`}
                  typingSpeed={50}
                  deletingSpeed={25}
                  pauseDuration={2000}
                  loop={true}
                />
              </div>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
                As a dedicated software developer, I specialize in crafting elegant, high-performance web solutions that deliver exceptional user experiences. I transform complex challenges into intuitive and efficient applications that not only meet but exceed user expectations.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button asChild size="lg">
                <Link href="#projects" onClick={scrollToSection('projects')}>
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#contact" onClick={scrollToSection('contact')}>
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <Link
          href="#about"
          onClick={scrollToSection('about')}
          className="scroll-cue flex items-center justify-center"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8 text-primary" />
        </Link>
      </div>
    </section>
  );
}
