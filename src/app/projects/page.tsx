import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProjectsTimeline from '@/components/sections/projects-timeline';

const SITE_URL = 'https://www.araiz.dev';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A complete timeline of projects by Araiz Khan — AI virtual try-on, generative-AI apps, full-stack web platforms and cloud systems, built with Next.js, React, MongoDB and custom AI models.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/projects`,
    title: 'Projects — Araiz Khan',
    description:
      'A complete timeline of projects by Araiz Khan — full-stack & AI builds, milestone by milestone.',
  },
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1 pt-28 md:pt-32">
        <ProjectsTimeline />
      </div>
      <Footer />
    </main>
  );
}
