'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Glass } from 'glisse';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BentoCardData } from '@/lib/types';
import './project-card.css';

// Per-project accent for the eyebrow label (presentation only).
const ACCENTS = ['#8B5CF6', '#F59E0B', '#06B6D4', '#4F46E5', '#EF4444'];

/**
 * One project, Apple product-tile style: a glass card with the story and
 * actions up top and the screenshot inset at the bottom (concentric corners).
 * `feature` lays it out side by side on wide screens, for the flagship.
 * `media="top"` puts the screenshot above the text (homepage gallery).
 */
export function ProjectCard({
  project: p,
  index,
  layout = 'tile',
  imageSizes = '(max-width: 640px) 82vw, 400px',
  priority = false,
  media = 'bottom',
}: {
  project: BentoCardData;
  index: number;
  layout?: 'tile' | 'feature';
  imageSizes?: string;
  priority?: boolean;
  /** Where the screenshot sits in a tile. The DOM keeps text first either way. */
  media?: 'top' | 'bottom';
}) {
  const hasGithub = Boolean(p.githubUrl && p.githubUrl !== '#');
  const Heading = layout === 'feature' ? 'h2' : 'h3';

  return (
    <Glass
      className={cn(
        'pc-card',
        layout === 'feature' && 'pc-card--feature',
        media === 'top' && 'pc-card--media-top'
      )}
    >
      <div className="pc-copy">
        <p className="pc-eyebrow" style={{ color: ACCENTS[index % ACCENTS.length] }}>
          {p.label}
          {index === 0 && <span className="pc-flag">Flagship</span>}
        </p>
        <Heading className="pc-title">{p.title}</Heading>
        <p className="pc-desc">{p.description}</p>
        {p.technologies && p.technologies.length > 0 && (
          <p className="pc-tech">{p.technologies.join(' · ')}</p>
        )}

        {(p.liveUrl || hasGithub) && (
          <div className="pc-actions">
            {p.liveUrl && (
              <Button asChild size="sm">
                <Link href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit site <ArrowUpRight aria-hidden />
                </Link>
              </Button>
            )}
            {hasGithub && (
              <Link
                href={p.githubUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="pc-link pc-link--small"
              >
                Source code <ChevronRight aria-hidden />
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="pc-shot">
        <Image
          src={p.imageUrl ?? ''}
          alt={p.imageHint ?? p.title ?? 'Project screenshot'}
          fill
          sizes={imageSizes}
          priority={priority}
        />
      </div>
    </Glass>
  );
}
