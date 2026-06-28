import type { StaticImageData } from 'next/image';

export type Service = {
  title: string;
  icon: string;
  description: string;
};

export type Skill = {
  name: string;
  icon: string;   // key into the component's iconMap
  color: string;  // brand hex, used for the hover state
};

export type SkillCategory = {
  name: string;
  icon: string;   // key into the category iconMap (lucide)
  skills: Skill[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageHint: string;
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  industry: string;
};

export interface BentoCardData {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  technologies?: string[];
  imageUrl?: string;
  imageHint?: string;
  width?: number;
  height?: number;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
}
