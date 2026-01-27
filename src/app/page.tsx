"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import Preloader from "../components/Preloader";
import Header from "../components/header";
import Footer from '@/components/footer';

const HeroSection = dynamic(() => import('@/components/sections/hero-section'), { ssr: true });
const AboutSection = dynamic(() => import('@/components/sections/about-section'), { ssr: true });
const ServicesSection = dynamic(() => import('@/components/sections/services-section'), { ssr: true });
const ProjectsSection = dynamic(() => import('@/components/sections/projects-section'), { ssr: true });
const ContactSection = dynamic(() => import('@/components/sections/contact-section'), { ssr: true });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="flex min-h-screen flex-col">
           {/* When Preloader unmounts, Header mounts.
               The Logo detects it exists in both and "flies" to the new position. */}
           <Header />
           <main className="flex-1">
             <HeroSection />
             <AboutSection />
             <ServicesSection />
             <ProjectsSection />
             <ContactSection />
           </main>
           <Footer />
        </div>
      )}
    </main>
  );
}
