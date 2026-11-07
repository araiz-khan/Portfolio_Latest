'use client';

import { forwardRef, useState, useEffect, useRef, type AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu as GlassMenu, TabBar } from 'glisse';
import { Menu, Home, User, Mail, FolderGit, Wrench, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { ThemeToggle } from './theme-toggle';
import { smoothScrollTo as scrollToTarget } from '@/lib/smooth-scroll';

const navItems = [
  { href: '#top', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#skills', label: 'Skills', icon: Code2 },
  { href: '#services', label: 'Services', icon: Wrench },
  { href: '/projects', label: 'Projects', icon: FolderGit },
  { href: '#contact', label: 'Contact', icon: Mail },
];

const valueOf = (href: string) => href.replace(/^[#/]+/, '');

// Hash links only work in-page on the homepage; elsewhere route to "/#section"
// (and Home to "/").
const resolveHref = (href: string, isHome: boolean) => {
  if (isHome || !href.startsWith('#')) return href;
  return href === '#top' ? '/' : `/${href}`;
};

// The tab that's selected before any section is reached.
const HOME = 'top';

// In-page hash links (only "#…" when we're already on the homepage) scroll
// smoothly. Returns true when it handled the navigation.
//
// While that scroll is in flight the scroll-spy stands down: the tab you
// pressed is already selected, and letting the spy report every section the
// page passes on the way made the selection bounce back through Home, About,
// Skills… before settling. It resumes (and re-syncs) when the scroll lands or
// the visitor interrupts it by scrolling themselves.
//
// A real press on a glisse tab delivers TWO clicks (the browser's, plus one
// glisse dispatches itself on pointer-up). The duplicate is ignored, and only
// the most recent scroll may release the lock: a superseded scroll reports
// "done" when it's cancelled, which used to switch the spy back on while the
// page was still flying and bring the bouncing right back.
const navScroll = { active: false, run: 0, lastTarget: '', lastAt: 0 };

function smoothScrollTo(target: string) {
  if (!target.startsWith('#')) return false;
  const now = performance.now();
  if (target === navScroll.lastTarget && now - navScroll.lastAt < 400) return true; // duplicate click
  navScroll.lastTarget = target;
  navScroll.lastAt = now;

  const el = target === '#top' ? 0 : document.querySelector(target);
  if (el === null) return true;
  const run = ++navScroll.run;
  navScroll.active = true;
  scrollToTarget(el, {
    onDone: () => {
      if (run !== navScroll.run) return; // superseded by a newer scroll
      navScroll.active = false;
      // Re-sync the spy (and the logo scale) with where we actually are.
      window.dispatchEvent(new Event('scroll'));
    },
  });
  return true;
}

// Link component handed to glisse's TabBar: a Next.js Link that keeps the
// GSAP smooth scroll for in-page sections.
const NavAnchor = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>(
  function NavAnchor({ href, onClick, ...props }, ref) {
    return (
      <Link
        ref={ref}
        href={href}
        onClick={(e) => {
          onClick?.(e);
          if (smoothScrollTo(href)) e.preventDefault();
        }}
        {...props}
      />
    );
  }
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // The logo's scroll-driven scale is written straight to the DOM: keeping it in
  // state re-rendered the header (and re-fitted its glass) on every scroll frame.
  const logoRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const topHref = isHome ? '#top' : '/';
  const routeTab = isHome ? HOME : valueOf(pathname) || null;
  const [active, setActive] = useState<string | null>(routeTab);

  useEffect(() => {
    setActive(routeTab);
  }, [routeTab]);

  // Scroll-spy on the homepage: the tab bar highlights whichever section is
  // crossing the middle of the viewport, and Home while the hero is in view.
  // Measured on scroll rather than with an IntersectionObserver because the
  // sections are dynamically imported and may mount after the header.
  useEffect(() => {
    if (!isHome) return;
    const ids = navItems.map((item) => valueOf(item.href)).filter((id) => id !== HOME);
    let rafId = 0;
    const update = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (navScroll.active) return; // a nav click is driving the scroll
        // Reading line 30% down the viewport (not the middle): short sections
        // like Skills would otherwise lose the highlight to the next section
        // the moment they're scrolled to the top.
        const line = window.innerHeight * 0.3;
        let current = HOME;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        // At the very bottom the last section can't reach the line: select it.
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        if (atBottom && ids.length) current = ids[ids.length - 1];
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 10);

        // Keep logo readable on mobile; gently shrink on desktop only.
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (isMobile) {
          if (logoRef.current) logoRef.current.style.transform = 'scale(1)';
          return;
        }

        const maxScroll = 300;
        const minScale = 0.55;
        const scale = Math.max(minScale, 1 - scrollY / maxScroll);
        if (logoRef.current) logoRef.current.style.transform = `scale(${scale})`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const goTo = (href: string) => {
    const target = resolveHref(href, isHome);
    setActive(valueOf(href));
    if (!smoothScrollTo(target)) router.push(target);
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full',
        // No solid bar: the glass nav floats over a soft fade that keeps the
        // logo readable once content scrolls underneath.
        isScrolled ? 'bg-gradient-to-b from-background/90 via-background/50 to-transparent' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href={topHref}
          aria-label="Back to top"
          onClick={(e) => {
            if (smoothScrollTo(topHref)) e.preventDefault();
            setActive(routeTab);
          }}
          // Drops 32px at the very top on desktop; animated as a transform
          // (not margin) so it never triggers layout.
          className={cn(
            'flex items-center gap-2 ml-1 md:ml-5 transition-transform duration-300 [transition-timing-function:var(--ease-out)]',
            !isScrolled && 'md:translate-y-8'
          )}
        >
          <div
            ref={logoRef}
            // No CSS transition here: the scale is written on every scroll frame,
            // and a transition would restart each frame and trail the scroll.
            className="shrink-0 transform-gpu"
          >
            <Logo className="w-16 h-16 sm:w-20 sm:h-20 md:w-36 md:h-36" />
          </div>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-3 md:flex">
          <TabBar
            aria-label="Sections"
            link={NavAnchor}
            style={{ ['--lg-tab-width' as string]: '76px' }}
            value={active}
            onValueChange={setActive}
            items={navItems.map((item) => ({
              value: valueOf(item.href),
              label: item.label,
              href: resolveHref(item.href, isHome),
            }))}
          />
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <GlassMenu
            aria-label="Navigation menu"
            align="end"
            icon={<Menu />}
            items={navItems.map((item) => ({
              label: item.label,
              icon: <item.icon />,
              onSelect: () => goTo(item.href),
            }))}
          />
        </div>
      </div>
    </header>
  );
}
