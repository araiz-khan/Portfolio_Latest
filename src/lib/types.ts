import type { StaticImageData } from 'next/image';

export type Service = {
  title: string;
  icon: string;
  description: string;
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
