'use client';

import ProjectsTimeline from './projects-timeline';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="projects-section w-full bg-[var(--projects-bg)] py-20 md:py-28 transition-colors duration-300"
    >
      <ProjectsTimeline variant="home" />
    </section>
  );
}
