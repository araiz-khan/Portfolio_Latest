'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bentoCardData } from '@/lib/data';
import './projects-timeline.css';

// Per-project signature gradient/accent (presentation only — kept out of the data layer)
const ACCENTS = [
  { grad: 'linear-gradient(140deg,#8B5CF6,#EC4899)', accent: '#8B5CF6' },
  { grad: 'linear-gradient(140deg,#F59E0B,#10B981)', accent: '#F59E0B' },
  { grad: 'linear-gradient(140deg,#06B6D4,#3B82F6)', accent: '#06B6D4' },
  { grad: 'linear-gradient(140deg,#4F46E5,#06B6D4)', accent: '#4F46E5' },
  { grad: 'linear-gradient(140deg,#EF4444,#F59E0B)', accent: '#EF4444' },
];

type Variant = 'page' | 'home';

export default function ProjectsTimeline({ variant = 'page' }: { variant?: Variant }) {
  const isHome = variant === 'home';
  const items = isHome ? bentoCardData.slice(0, 2) : bentoCardData;
  const total = items.length;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timeline = root.querySelector<HTMLElement>('.asc-timeline');
    const spine = root.querySelector<HTMLElement>('.asc-spine');
    const spineFill = root.querySelector<HTMLElement>('.asc-spine-fill');
    const comet = root.querySelector<HTMLElement>('.asc-comet');
    const terminus = root.querySelector<HTMLElement>('.asc-terminus');
    const endEl = root.querySelector<HTMLElement>('.asc-end');
    const arc = root.querySelector<SVGCircleElement>('.asc-progress-arc');
    const curEl = root.querySelector<HTMLElement>('.asc-progress-cur');
    if (!timeline || !spine || !spineFill || !comet) return;

    const miles = Array.from(root.querySelectorAll<HTMLElement>('.asc-mile'));
    const nodes = miles.map((m) => m.querySelector<HTMLElement>('.asc-node'));

    // The spine stops just ABOVE the closing element (tagline or button), never under it.
    const endOffset = () => {
      const tRect = timeline.getBoundingClientRect();
      const endTop = endEl ? endEl.getBoundingClientRect().top : tRect.bottom;
      return Math.max(1, endTop - tRect.top - 14);
    };

    // progress ring geometry (page variant only)
    const R = 15.5;
    const C = 2 * Math.PI * R;
    if (arc) {
      arc.style.strokeDasharray = C.toFixed(2);
      arc.style.strokeDashoffset = C.toFixed(2);
    }

    const setProgress = (n: number) => {
      if (!arc || !curEl) return;
      const frac = total ? n / total : 0;
      arc.style.strokeDashoffset = (C * (1 - frac)).toFixed(2);
      if (curEl.textContent !== String(n)) curEl.textContent = String(n);
    };

    // ---- reveal milestones (fade + slide) ----
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // toggle (not one-time) so cards fade/slide back out when scrolled away
          e.target.classList.toggle('asc-revealed', e.isIntersecting);
        });
      },
      { root: null, threshold: 0.28, rootMargin: '0px 0px -8% 0px' }
    );

    if (reduce) {
      miles.forEach((m) => m.classList.add('asc-revealed', 'asc-lit'));
      spine.style.bottom = 'auto';
      spine.style.height = `${endOffset()}px`;
      spineFill.style.height = '100%';
      comet.style.display = 'none';
      terminus?.classList.add('is-lit');
      endEl?.classList.add('is-lit');
      setProgress(total);
      return;
    }

    miles.forEach((m) => revealObs.observe(m));

    // ---- spine fill driven by scroll position within the SECTION ----
    let ticking = false;
    let running = false;
    let litCount = 0;

    const computeFill = () => {
      const tRect = timeline.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // spine ends just above the closing element; recompute each frame for resizes
      const endY = endOffset();
      spine.style.bottom = 'auto';
      spine.style.height = `${endY}px`;

      // Section-relative progress: 0 when the timeline top is low in the viewport,
      // 1 once its end (the terminus) rises to the read line. Works whether this
      // is a standalone page or one section among many on the homepage.
      const readLine = vh * 0.72;
      let frac = (readLine - tRect.top) / endY;
      // also guarantee completion at the literal bottom of the document
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) frac = 1;
      frac = Math.max(0, Math.min(1, frac));

      const fillH = endY * frac;
      spineFill.style.height = `${fillH}px`;

      // comet rides the fill head, then hands off to the terminus dot at the end
      if (frac > 0.001 && frac < 0.985) {
        comet.style.opacity = '1';
        comet.style.transform = `translate(-50%, ${fillH}px)`;
      } else {
        comet.style.opacity = '0';
      }

      let lit = 0;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node) continue;
        const nodeY = node.getBoundingClientRect().top + node.offsetHeight / 2 - tRect.top;
        // toggle (not just add) so nodes/numbers go hollow again when you scroll back up
        const isLit = fillH >= nodeY;
        miles[i].classList.toggle('asc-lit', isLit);
        if (isLit) lit++;
      }
      if (lit !== litCount) {
        litCount = lit;
        setProgress(lit);
      }

      // glow only when the fill actually reaches the terminus dot (or the page bottom)
      const done = atBottom || fillH >= endY - 4;
      if (terminus) terminus.classList.toggle('is-lit', done);
      if (endEl) endEl.classList.toggle('is-lit', done);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeFill();
        ticking = false;
      });
    };

    // gate scroll work on section visibility
    const visObs = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        if (vis && !running) {
          running = true;
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll, { passive: true });
          computeFill();
        } else if (!vis && running) {
          running = false;
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      },
      { root: null, threshold: 0 }
    );

    visObs.observe(root);
    requestAnimationFrame(computeFill);

    return () => {
      revealObs.disconnect();
      visObs.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [total]);

  return (
    <div className="projects-timeline" data-variant={variant} ref={rootRef}>
      <header className="asc-head">
        <div className="asc-head-lead">
          <span className="eyebrow">{isHome ? 'Featured Work' : 'Selected Work'}</span>
          {isHome ? (
            <h2 className="asc-title">
              A glimpse of <span className="em">the climb</span>.
            </h2>
          ) : (
            <h1 className="asc-title">
              A climb through the work, <span className="em">milestone by milestone</span>.
            </h1>
          )}
          <p className="asc-sub">
            {isHome
              ? 'A couple of recent builds — follow the line down, then see the full ascent.'
              : "Every project I've shipped, ordered as a journey. Follow the spine as it lights — each node marks a build that moved the craft forward, from first shipped surface to the systems running in production today."}
          </p>
        </div>
        <div className="asc-meta">
          <span className="asc-meta-em">{isHome ? 'Featured' : 'Selected work'}</span>
          <span>
            {isHome ? `${total} of ${bentoCardData.length} projects` : `${total} projects`}
          </span>
          <span>{isHome ? 'Scroll down' : 'Scroll to ascend'}</span>
        </div>
      </header>

      <div className="asc-timeline">
        <div className="asc-spine">
          <div className="asc-spine-track" />
          <div className="asc-spine-fill" />
          <div className="asc-comet" />
          <div className="asc-terminus" aria-hidden="true" />
        </div>

        <div>
          {items.map((p, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            const idx = String(i + 1).padStart(2, '0');
            const hasGithub = p.githubUrl && p.githubUrl !== '#';
            const style = { '--asc-grad': a.grad, '--asc-accent': a.accent } as CSSProperties;

            return (
              <article
                key={p.title ?? idx}
                className={`asc-mile${i % 2 === 1 ? ' asc-right' : ''}`}
                style={style}
              >
                <span className="asc-node" aria-hidden="true" />
                <span className="asc-connector" aria-hidden="true" />
                <span className="asc-index" aria-hidden="true">
                  {idx}
                </span>

                <div className="asc-card">
                  <div className="asc-shot">
                    {i === 0 && <span className="asc-flagtag">Flagship</span>}
                    <Image
                      src={p.imageUrl ?? ''}
                      alt={p.imageHint ?? p.title ?? 'Project'}
                      fill
                      sizes="(max-width: 760px) 90vw, 460px"
                    />
                  </div>

                  <div className="asc-body">
                    <div className="asc-kicker">
                      <span>{p.label}</span>
                    </div>
                    <h3 className="asc-card-title">{p.title}</h3>
                    <p className="asc-desc">{p.description}</p>

                    {p.technologies && p.technologies.length > 0 && (
                      <div className="asc-tags">
                        {p.technologies.map((t) => (
                          <span className="asc-tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {(p.liveUrl || hasGithub) && (
                      <div className="asc-actions">
                        {p.liveUrl && (
                          <Button asChild size="sm">
                            <Link href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                              Live <ArrowUpRight />
                            </Link>
                          </Button>
                        )}
                        {hasGithub && (
                          <Button asChild size="sm" variant="outline">
                            <Link href={p.githubUrl!} target="_blank" rel="noopener noreferrer">
                              Code <Github />
                            </Link>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {isHome ? (
          <div className="asc-end asc-cta">
            <Link href="/projects" className="asc-cta-btn">
              View All Projects <ArrowRight />
            </Link>
          </div>
        ) : (
          <div className="asc-end asc-coda">
            <p className="asc-coda-text">The climb continues — next milestone in progress.</p>
          </div>
        )}
      </div>
    </div>
  );
}
