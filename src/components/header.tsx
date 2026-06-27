'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, User, Mail, FolderGit, Wrench, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { ThemeToggle } from './theme-toggle';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { href: '#about', label: 'About', icon: User },
  { href: '#skills', label: 'Skills', icon: Code2 },
  { href: '#services', label: 'Services', icon: Wrench },
  { href: '#projects', label: 'Projects', icon: FolderGit },
  { href: '#contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoScale, setLogoScale] = useState(1);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 10);

        // Keep logo readable on mobile; gently shrink on desktop only.
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (isMobile) {
          setLogoScale(1);
          return;
        }

        const maxScroll = 300;
        const minScale = 0.55;
        const scale = Math.max(minScale, 1 - scrollY / maxScroll);
        setLogoScale(scale);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const closeMobileMenu = () => {
    if(isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === '#top') {
      gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power2.inOut' });
    } else {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          gsap.to(window, { scrollTo: targetElement, duration: 1, ease: 'power2.inOut' });
      }
    }
    closeMobileMenu();
  };


  const NavLink = ({ href, children, isMobile = false }: { href: string; children: React.ReactNode, isMobile?: boolean }) => (
    <Link
      href={href}
      onClick={(e) => handleNavClick(e, href)}
      className={cn(
        "font-medium transition-colors hover:text-primary relative group",
        isMobile ? 'text-lg' : 'text-sm',
      )}
    >
      <span>{children}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/40 bg-background/80 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="#top" onClick={(e) => handleNavClick(e, '#top')} className={cn('flex items-center gap-2 transition-all duration-300 ml-5', !isScrolled && 'md:mt-8')}>
          <div 
            className="transform-gpu transition-transform duration-300 ease-out"
            style={{ transform: `scale(${logoScale})` }}
          >
            <Logo className="md:w-36 md:h-36 md:text-5xl" />
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
          ))}
           <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="p-6">
                 <Link href="#top" onClick={(e) => handleNavClick(e, '#top')} className="flex items-center gap-2 mb-8">
                  <Logo className="w-7 h-7 text-lg" />
                </Link>
                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href} isMobile>
                      <div className="flex items-center gap-4">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        {item.label}
                      </div>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
