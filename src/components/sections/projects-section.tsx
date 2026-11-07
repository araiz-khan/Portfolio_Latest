'use client';

import ProjectsGallery from './projects-gallery';

// Homepage "Featured Work": an Apple-style horizontal gallery. Every project
// is on /projects (components/projects/projects-grid.tsx).
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="projects-section w-full bg-[var(--projects-bg)] py-20 md:py-28 transition-colors duration-300"
    >
      <ProjectsGallery />
    </section>
  );
}
