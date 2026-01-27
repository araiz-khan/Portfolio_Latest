'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { AKIcon } from './ak-icon';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { StackOverflowIcon } from './stackoverflow-icon';

gsap.registerPlugin(ScrollToPlugin);

export default function Footer() {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power2.inOut' });
  };

  return (
    <footer className="bg-background transition-colors duration-300">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
           <Link href="#top" onClick={scrollToTop}>
            <AKIcon className="h-8 w-8 text-2xl" />
          </Link>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href="https://github.com/araiz-khan" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile"><Github className="h-5 w-5" /></Link>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href="https://www.linkedin.com/in/araiz-khan/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile"><Linkedin className="h-5 w-5" /></Link>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href="https://x.com/araiz_exe" target="_blank" rel="noopener noreferrer" aria-label="Visit X (Twitter) profile"><Twitter className="h-5 w-5" /></Link>
          </Button>
           <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link href="https://stackoverflow.com/users/21872928/araiz-khan" target="_blank" rel="noopener noreferrer" aria-label="Visit Stack Overflow profile">
              <StackOverflowIcon className="h-5 w-5" />
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
