'use client';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './particle-background.css';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 50,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setIsMobile(mobile);
    const finalParticleCount = mobile ? Math.max(8, Math.floor(particleCount / 3)) : particleCount;

    const newParticles: Particle[] = [];
    for (let i = 0; i < finalParticleCount; i++) {
      newParticles.push({
        id: i,
        size: gsap.utils.random(2, 8),
        x: gsap.utils.random(0, 100),
        y: gsap.utils.random(0, 100),
      });
    }
    setParticles(newParticles);
  }, [particleCount]);

  useEffect(() => {
    if (particles.length > 0 && containerRef.current) {
      setIsLoaded(true);
      const particleElements = containerRef.current.children;
      gsap.to(containerRef.current, { opacity: 1, duration: 0.5, delay: 0.2 });
      
      const tl = gsap.timeline();
      tl.to(particleElements, { opacity: 1, duration: 0.6, stagger: 0.01 });
      
      particles.forEach((particle, i) => {
        const pEl = particleElements[i] as HTMLElement;
        if (pEl) {
          const duration = isMobile ? gsap.utils.random(16, 28) : gsap.utils.random(10, 30);
          const delay = isMobile ? gsap.utils.random(0, 8) : gsap.utils.random(0, 15);
          const movement = isMobile ? 3 : 5;
          
          tl.to(pEl, {
            x: () => `${gsap.utils.random(particle.x - movement, particle.x + movement)}vw`,
            y: () => `${gsap.utils.random(particle.y - movement, particle.y + movement)}vh`,
            opacity: () => gsap.utils.random(0.1, 0.6),
            duration: duration,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
          }, delay);
        }
      });

      return () => {
        tl.kill();
      };
    }
  }, [particles, isMobile]);

  useEffect(() => {
    if (!containerRef.current || !isLoaded) return;
    
    // Use a short timeout to ensure CSS variables have been applied after theme change
    const timeoutId = setTimeout(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--primary').trim();
      const foregroundColor = computedStyle.getPropertyValue('--foreground').trim();
      const newColor = theme === 'dark' ? `hsl(${primaryColor})` : `hsl(${foregroundColor})`;
      const particleNodes = containerRef.current?.querySelectorAll('.particle') ?? [];
      
      gsap.to(particleNodes, { 
        backgroundColor: newColor, 
        boxShadow: isMobile ? `0 0 6px ${newColor}` : `0 0 10px ${newColor}, 0 0 15px ${newColor}`,
        duration: 0.5 
      });
    }, 50);

    return () => clearTimeout(timeoutId);

  }, [theme, isLoaded, isMobile]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'particle-background',
        isLoaded && 'particle-background--loaded',
        className
      )}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
