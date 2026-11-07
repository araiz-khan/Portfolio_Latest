'use client';

import { services } from '@/lib/data';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import TiltedCard from '../TiltedCard';
import { Glass } from 'glisse';
import { Reveal } from '../reveal';

// A map to dynamically render icons
import { LayoutTemplate, Cpu, Code, Rocket } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  LayoutTemplate,
  Cpu,
  Code,
  Rocket,
};

const iconColors = [
  'text-chart-1',
  'text-chart-2',
  'text-chart-3',
  'text-chart-4',
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full bg-transparent pt-12 pb-20 md:pt-16 md:pb-32 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div>
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What I Offer
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.title} delay={i * 60}>
                <TiltedCard
                  containerHeight='100%'
                  cardHeight='100%'
                  cardWidth='100%'
                  captionText={service.title}
                  showTooltip={false}
                  className="h-full text-center"
                  scaleOnHover={1.05}
                  rotateAmplitude={6}
                >
                  <Glass className="flex h-full w-full flex-col items-center justify-center rounded-3xl p-6 text-center">
                    {Icon && <Icon className={cn('h-12 w-12 mb-4', iconColors[i % iconColors.length])} />}
                    <h3 className="text-2xl font-headline mt-4 mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </Glass>
                </TiltedCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
