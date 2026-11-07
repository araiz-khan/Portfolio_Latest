'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Glass } from 'glisse';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { ProjectCard } from '@/components/projects/project-card';
import { bentoCardData } from '@/lib/data';
import './projects-gallery.css';

/**
 * Homepage "Featured Work", in the spirit of Apple's product galleries:
 * a horizontal row of tall cards on native scroll-snap (so trackpad flicks and
 * touch swipes get the platform's own momentum and deceleration), with glass
 * paddle buttons that step one card at a time. The last card leads to /projects.
 */
export default function ProjectsGallery() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Paddle state follows the live scroll position (rAF-throttled).
  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncEdges);
    };
    syncEdges();
    el.addEventListener('scroll', onScroll, { passive: true });
    const resize = new ResizeObserver(syncEdges);
    resize.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
      resize.disconnect();
    };
  }, [syncEdges]);

  // Step exactly one card (card width + gap). Native smooth scrolling on the
  // gallery itself: interruptible by the user at any moment, and it lands on a
  // snap point. Reduced motion jumps instead.
  const step = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>('.pg-item');
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="projects-gallery">
      <Reveal className="pg-head">
        <div>
          <p className="pg-kicker">Featured Work</p>
          <h2 className="pg-heading">Things I&apos;ve built.</h2>
          <p className="pg-lede">
            From AI virtual try-on to generative recipes, a few recent builds. Swipe through, or see them all.
          </p>
        </div>
        <Link href="/projects" className="pc-link">
          View all projects <ChevronRight aria-hidden />
        </Link>
      </Reveal>

      <Reveal delay={60}>
        <ul
          ref={scrollerRef}
          className="pg-scroller"
          aria-label="Featured projects"
          tabIndex={0}
        >
          {bentoCardData.map((p, i) => (
            <li key={p.title} className="pg-item">
              <ProjectCard project={p} index={i} media="top" />
            </li>
          ))}

          <li className="pg-item pg-item--end">
            <Link href="/projects" className="pg-endcard">
              <Glass className="pc-card pg-card--end">
                <span className="pg-end-icon" aria-hidden>
                  <ArrowRight />
                </span>
                <p className="pc-title">All Projects</p>
                <p className="pc-desc">Every build in one place.</p>
                <span className="pc-link pc-link--small">
                  See all <ChevronRight aria-hidden />
                </span>
              </Glass>
            </Link>
          </li>
        </ul>
      </Reveal>

      <div className="pg-paddles">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous projects"
          disabled={atStart}
          onClick={() => step(-1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next projects"
          disabled={atEnd}
          onClick={() => step(1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
