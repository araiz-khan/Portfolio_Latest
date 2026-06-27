'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SocialIcon } from './social-icon';

gsap.registerPlugin(ScrollToPlugin);

export default function Footer() {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const logoGradientId = React.useId();

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power2.inOut' });
  };

  return (
    <footer className="bg-background transition-colors duration-300">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-4 py-8 sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
            <Link href="#top" aria-label="Back to top" onClick={scrollToTop}>
            <svg
              viewBox="0 0 200 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-16 w-16"
            >
              <defs>
                <linearGradient id={logoGradientId} x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <path
                d="M26 124 L58 30 L90 124"
                stroke={`url(#${logoGradientId})`}
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M120 30 L120 124"
                stroke={`url(#${logoGradientId})`}
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M120 80 L172 30"
                stroke={`url(#${logoGradientId})`}
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M120 80 L174 124"
                stroke={`url(#${logoGradientId})`}
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href="https://github.com/araiz-khan" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile"><SocialIcon brand="github" className="h-5 w-5" /></Link>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href="https://www.linkedin.com/in/araiz-khan/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile"><SocialIcon brand="linkedin" className="h-5 w-5" /></Link>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href="https://x.com/araiz_exe" target="_blank" rel="noopener noreferrer" aria-label="Visit X (Twitter) profile"><SocialIcon brand="x" className="h-5 w-5" /></Link>
          </Button>
           <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href="https://stackoverflow.com/users/21872928/araiz-khan" target="_blank" rel="noopener noreferrer" aria-label="Visit Stack Overflow profile">
              <SocialIcon brand="stackoverflow" className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Araiz Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
