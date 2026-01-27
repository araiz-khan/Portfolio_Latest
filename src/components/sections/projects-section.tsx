'use client';

import ChromaGrid from '@/components/ChromaGrid';
import { bentoCardData } from '@/lib/data';

const gradients = [
  'linear-gradient(145deg, #4F46E5, var(--projects-bg, hsl(var(--background))))',
  'linear-gradient(210deg, #10B981, var(--projects-bg, hsl(var(--background))))',
  'linear-gradient(165deg, #F59E0B, var(--projects-bg, hsl(var(--background))))',
  'linear-gradient(195deg, #EF4444, var(--projects-bg, hsl(var(--background))))',
  'linear-gradient(225deg, #8B5CF6, var(--projects-bg, hsl(var(--background))))',
  'linear-gradient(135deg, #06B6D4, var(--projects-bg, hsl(var(--background))))',
];

const borderColors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function ProjectsSection() {
  const chromaItems = bentoCardData.map((project, index) => ({
    image: project.imageUrl ?? '',
    title: project.title ?? 'Project',
    subtitle: project.description ?? '',
    handle: project.label ?? '',
    borderColor: borderColors[index % borderColors.length],
    gradient: gradients[index % gradients.length],
    downloadUrl: project.downloadUrl,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
  }));

  return (
    // Replaced bg-secondary with bg-background to avoid blue tint and improved section styling
    <section
      id="projects"
      className="projects-section w-full bg-[var(--projects-bg)] py-20 md:py-32 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A selection of my work.
          </p>
        </div>
        <div style={{ minHeight: '800px', position: 'relative' }}>
          <ChromaGrid 
            items={chromaItems}
            radius={350}
            columns={3}
            rows={2}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>
    </section>
  );
}
