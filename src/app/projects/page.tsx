import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProjectsGrid from '@/components/projects/projects-grid';

const SITE_URL = 'https://www.araiz.dev';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Every project by Araiz Khan — AI virtual try-on, generative-AI apps, full-stack web platforms and cloud systems, built with Next.js, React, MongoDB and custom AI models.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/projects`,
    title: 'Projects — Araiz Khan',
    description:
      'Every project by Araiz Khan — full-stack & AI builds, with live demos and source code.',
  },
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Header />
      <div className="flex-1 pt-28 pb-24 md:pt-36 md:pb-32">
        <ProjectsGrid />
      </div>
      <Footer />
    </main>
  );
}
