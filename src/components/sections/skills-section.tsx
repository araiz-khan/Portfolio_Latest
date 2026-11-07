'use client';

import type { CSSProperties, ComponentType } from 'react';
import { skillCategories } from '@/lib/data';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiFirebase,
  SiMongodb,
  SiSqlite,
  SiPython,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { Globe, Sparkles, Bot, BrainCircuit } from 'lucide-react';
import { Glass } from 'glisse';
import { Reveal } from '../reveal';

// Both lucide and react-icons render `currentColor` SVGs that respect `className`
// for sizing, so they share one structural type.
type IconComponent = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;

// Brand logos (react-icons) with lucide fallbacks for skills that have no logo.
const iconMap: { [key: string]: IconComponent } = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  html5: SiHtml5,
  nodejs: SiNodedotjs,
  firebase: SiFirebase,
  mongodb: SiMongodb,
  sqlite: SiSqlite,
  rest: Globe,
  genai: Sparkles,
  llm: Bot,
  custommodel: BrainCircuit,
  python: SiPython,
  git: SiGit,
  github: SiGithub,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full bg-transparent py-12 md:py-16 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Tech Stack
        </h2>

        <div className="space-y-5">
          {skillCategories.map((category, i) => (
            <Reveal
              key={category.name}
              delay={i * 60}
              className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-4"
            >
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:w-28 sm:pt-1.5 sm:text-right">
                {category.name}
              </span>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon];
                  return (
                    <Glass
                      key={skill.name}
                      className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{ ['--brand']: skill.color } as CSSProperties}
                    >
                      {Icon && (
                        <Icon
                          aria-hidden
                          className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-[var(--brand)]"
                        />
                      )}
                      {skill.name}
                    </Glass>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
