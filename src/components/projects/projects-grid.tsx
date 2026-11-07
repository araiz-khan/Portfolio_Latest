'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { bentoCardData } from '@/lib/data';
import { ProjectCard } from './project-card';
// Shares the section header type (kicker / display heading / lede) with the
// homepage gallery.
import '../sections/projects-gallery.css';
import './projects-grid.css';

/**
 * /projects — every project, Apple-store style: the flagship as one wide
 * feature tile, the rest in an even two-up grid of the same cards used on the
 * homepage (screenshot first), and a closing nudge to get in touch. Everything
 * is visible immediately; no scroll-triggered reveals on this page.
 */
export default function ProjectsGrid() {
  const [flagship, ...rest] = bentoCardData;

  return (
    <div className="projects-page container mx-auto max-w-7xl px-4 md:px-6">
      <div className="pg-head">
        <div>
          <p className="pg-kicker">Projects</p>
          <h1 className="pg-heading">Everything I&apos;ve shipped.</h1>
          <p className="pg-lede">
            From AI virtual try-on to cloud video pipelines, every project in one place, with live demos and
            source code where they&apos;re public.
          </p>
        </div>
      </div>

      {flagship && (
        <ProjectCard
          project={flagship}
          index={0}
          layout="feature"
          media="top"
          priority
          imageSizes="(min-width: 900px) 720px, 92vw"
        />
      )}

      <ul className="pp-grid" aria-label="More projects">
        {rest.map((p, i) => (
          <li key={p.title}>
            <ProjectCard
              project={p}
              index={i + 1}
              media="top"
              imageSizes="(min-width: 768px) 620px, 92vw"
            />
          </li>
        ))}
      </ul>

      <section className="pp-cta" aria-label="Contact">
        <h2 className="pp-cta-title">Have a project in mind?</h2>
        <p className="pg-lede">I&apos;d love to hear about it.</p>
        <Link href="/#contact" className="pc-link">
          Get in touch <ChevronRight aria-hidden />
        </Link>
      </section>
    </div>
  );
}
