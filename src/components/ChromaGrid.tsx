import { useRef } from 'react';
import './ChromaGrid.css';

import { Button } from './ui/button';
import { Github, Globe, Download } from 'lucide-react';

interface ChromaGridItem {
  image?: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
}

interface ChromaGridProps {
  items?: ChromaGridItem[];
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

export const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  // kept for compatibility with existing usage
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}: ChromaGridProps) => {
  void damping;
  void fadeOut;
  void ease;

  const demo: ChromaGridItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg, #4F46E5, #000)',
      githubUrl: 'https://github.com/'
    },
    // ... other demo items
  ];
  const data = items?.length ? items : demo;

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--mouse-x', `50%`);
    card.style.setProperty('--mouse-y', `50%`);
  };

  const CardContent = ({ c }: { c: ChromaGridItem }) => (
    <>
      <div className="chroma-img-wrapper">
        {c.image ? <img src={c.image} alt={c.title} loading="lazy" /> : null}
      </div>
      <footer className="chroma-info">
        <div className="chroma-meta">
          <h3 className="name text-lg font-bold">{c.title}</h3>
          {c.handle ? (
            <span className="handle text-xs uppercase tracking-wider opacity-75">{c.handle}</span>
          ) : null}
          <p className="role mt-2 text-sm line-clamp-2">{c.subtitle}</p>
        </div>
      </footer>
    </>
  );

  const CardActions = ({ c }: { c: ChromaGridItem }) => (
    <div className="chroma-actions chroma-actions-overlay flex flex-wrap gap-2 pointer-events-auto">
      {c.downloadUrl && c.downloadUrl !== '#' ? (
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-border bg-background/40 text-foreground hover:bg-accent hover:text-accent-foreground"
          asChild
        >
          <a href={c.downloadUrl} target="_blank" rel="noopener noreferrer">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download
          </a>
        </Button>
      ) : c.liveUrl && c.liveUrl !== '#' ? (
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-border bg-background/40 text-foreground hover:bg-accent hover:text-accent-foreground"
          asChild
        >
          <a href={c.liveUrl} target="_blank" rel="noopener noreferrer">
            <Globe className="mr-1.5 h-3.5 w-3.5" />
            Live Demo
          </a>
        </Button>
      ) : null}

      {c.githubUrl && c.githubUrl !== '#' ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-foreground hover:bg-accent hover:text-accent-foreground"
          asChild
        >
          <a href={c.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-1.5 h-3.5 w-3.5" />
            Source
          </a>
        </Button>
      ) : null}
    </div>
  );

  return (
    <div
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      } as React.CSSProperties}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onMouseLeave={handleCardLeave}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: 'default'
          } as React.CSSProperties}
        >
          <div className="chroma-card-base">
            <CardContent c={c} />
          </div>

          {/* Visual-only color reveal layer (masked circle) */}
          <div className="chroma-card-reveal" aria-hidden="true">
            <CardContent c={c} />
          </div>

          {/* Keep actions above the reveal layer so they never get visually covered */}
          <CardActions c={c} />
        </article>
      ))}
    </div>
  );
};


export default ChromaGrid;
