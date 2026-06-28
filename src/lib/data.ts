import type { Project, Service, BentoCardData, SkillCategory } from './types';

export const services: Service[] = [
  {
    title: 'Web App Development',
    icon: 'LayoutTemplate',
    description: 'Building robust and scalable web applications tailored to your needs.',
  },
  {
    title: 'AI Development',
    icon: 'Cpu',
    description: 'Designing and integrating AI-driven features and generative models to enhance and automate workflows.',
  },
  {
    title: 'Custom Development',
    icon: 'Code',
    description: 'Tailoring software solutions to meet your specific business needs and requirements.',
  },
  {
    title: 'SEO Optimization',
    icon: 'Rocket',
    description: 'Improving your website\'s visibility on search engines to attract more organic traffic.',
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: 'frontend',
    skills: [
      { name: 'React', icon: 'react', color: '#61DAFB' },
      { name: 'Next.js', icon: 'nextjs', color: '#6E7681' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
      { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: 'tailwind', color: '#06B6D4' },
      { name: 'HTML5', icon: 'html5', color: '#E34F26' },
    ],
  },
  {
    name: 'Backend',
    icon: 'backend',
    skills: [
      { name: 'Node.js', icon: 'nodejs', color: '#5FA04E' },
      { name: 'Firebase', icon: 'firebase', color: '#FFCA28' },
      { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
      { name: 'SQLite', icon: 'sqlite', color: '#3E8FD0' },
      { name: 'REST APIs', icon: 'rest', color: '#0EA5E9' },
    ],
  },
  {
    name: 'AI & Tools',
    icon: 'aitools',
    skills: [
      { name: 'Generative AI', icon: 'genai', color: '#8B5CF6' },
      { name: 'LLM', icon: 'llm', color: '#10A37F' },
      { name: 'Custom Model', icon: 'custommodel', color: '#7C3AED' },
      { name: 'Python', icon: 'python', color: '#3776AB' },
      { name: 'Git', icon: 'git', color: '#F05032' },
      { name: 'GitHub', icon: 'github', color: '#6E7681' },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'AI-Powered Recipe Generator',
    description: 'A web app that detects ingredients and generate recipe according to the picture provided by user, using generative AI.',
    technologies: ['Next.js', 'TypeScript', 'Firebase'],
    imageUrl: 'https://res.cloudinary.com/dah7ditf3/image/upload/f_auto,q_auto/portfolio/projects/snaprecipe',
    imageHint: 'recipe application',
    liveUrl: 'https://snaprecipe-ai.netlify.app/',
    industry: 'Food Tech',
  },
];

export const bentoCardData: BentoCardData[] = [
  {
    color: '#060010',
    title: 'Fashion Frenzy',
    description: 'A full-stack AI virtual try-on web app integrating a Diffusion-based (D-VTON) pipeline — Next.js frontend with a MongoDB backend, with AI generation optimized to 11–14 seconds.',
    label: 'Virtual Try-On',
    technologies: ['Next.js', 'MongoDB', 'Diffusion AI'],
    imageUrl: 'https://res.cloudinary.com/dah7ditf3/image/upload/f_auto,q_auto/portfolio/projects/fashion-frenzy',
    imageHint: 'AI virtual try-on fashion app',
    liveUrl: 'https://fashionfr.netlify.app/',
    githubUrl: 'https://github.com/araiz-khan/Fashion-Frenzy',
  },
  {
    color: '#060010',
    title: 'AI Recipe Generator',
    description: 'Generates unique recipes from ingredients you have at home using generative AI.',
    label: 'GenAI',
    technologies: ['Next.js', 'TypeScript', 'Firebase'],
    imageUrl: 'https://res.cloudinary.com/dah7ditf3/image/upload/f_auto,q_auto/portfolio/projects/snaprecipe',
    imageHint: 'AI web application interface',
    liveUrl: 'https://snaprecipe-ai.netlify.app/',
    githubUrl: 'https://github.com/araiz-khan/SnapRecipe',
    width: 1200,
    height: 700,
  },
  {
    color: '#060010',
    title: 'Interactive Travel Planner',
    description: 'A web platform for planning trips with collaborative itineraries and map integrations.',
    label: 'Travel',
    technologies: ['React', 'Maps API', 'Collaboration'],
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center',
    imageHint: 'travel planning map',
    liveUrl: 'https://interactravelapp.netlify.app/',
    githubUrl: 'https://github.com/araiz-khan/Travel-Planner',
  },
  {
    color: '#060010',
    title: 'Customer Support Chatbot',
    description: 'An AI-powered chatbot to automate customer service and answer FAQs on e-commerce sites.',
    label: 'AI Chatbot',
    technologies: ['LLM', 'NLP', 'Integrations'],
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&crop=center',
    imageHint: 'AI chatbot interface',
    githubUrl: '#',
  },
  {
    color: '#060010',
    title: 'Serverless Video Processor',
    description: 'A cloud-native solution for automatically transcoding and watermarking uploaded videos.',
    label: 'Cloud',
    technologies: ['Serverless', 'Cloud', 'FFmpeg'],
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
    imageHint: 'video processing cloud',
  }
];
