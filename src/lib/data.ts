import type { Project, Service, BentoCardData } from './types';

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

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'AI-Powered Recipe Generator',
    description: 'A web app that detects ingredients and generate recipe according to the picture provided by user, using generative AI.',
    technologies: ['Next.js', 'TypeScript', 'Firebase'],
    imageUrl: 'images/Projects/Snaprecipe.jpeg',
    imageHint: 'recipe application',
    liveUrl: 'https://snaprecipe-ai.netlify.app/',
    industry: 'Food Tech',
  },
  {
    id: 'project-2',
    title: 'Hotel Reservation App',
    description: 'A user-friendly Android application for hotel reservations, allowing users to browse hotels, check availability, make bookings, and manage reservations seamlessly.',
    technologies: ['Android', 'Java', 'SQLite', 'Firebase'],
    imageUrl: 'images/Projects/Alpha Hotels.png',
    imageHint: 'hotel reservation application',
    liveUrl: '#',
    githubUrl: 'https://github.com/araiz-khan/Alpha-Hotels',
    downloadUrl: 'https://github.com/araiz-khan/Alpha-Hotels/releases/download/App_Release/Alpha_Hotels_2.23.apk',
    industry: 'Hospitality',
  },
  {
    id: 'project-3',
    title: 'Fitness Tracker Mobile App',
    description: 'A cross-platform mobile app for tracking workouts, setting fitness goals, and visualizing progress over time. Includes social features to connect with friends.',
    technologies: ['React Native', 'GraphQL', 'PostgreSQL'],
    imageUrl: 'https://picsum.photos/seed/fitness-app/600/400',
    imageHint: 'fitness application',
    liveUrl: '#',
    githubUrl: 'https://github.com/araiz-khan/Pulse-Fitness-App/tree/main',
    downloadUrl: 'https://github.com/araiz-khan/Pulse-Fitness-App/releases/download/Repo_Owner/Pulse.Fitness.apk',
    industry: 'Health & Fitness',
  },
];

export const bentoCardData: BentoCardData[] = [
  {
    color: '#060010',
    title: 'AI Recipe Generator',
    description: 'Generates unique recipes from ingredients you have at home using generative AI.',
    label: 'GenAI',
    imageUrl: '/images/Projects/Snaprecipe.jpeg',
    imageHint: 'AI web application interface',
    liveUrl: 'https://snaprecipe-ai.netlify.app/',
    githubUrl: 'https://github.com/araiz-khan/SnapRecipe',
    width: 1200,
    height: 700,
  },
  {
    color: '#060010',
    title: 'Hotel Reservation App',
    description: 'User-friendly hotel booking app with seamless reservation management and real-time availability.',
    label: 'Android App',
    imageUrl: '/images/Projects/Alpha Hotels.png',
    imageHint: 'hotel reservation mobile app',
    liveUrl: '#',
    githubUrl: 'https://github.com/araiz-khan/Alpha-Hotels',
    downloadUrl: 'https://github.com/araiz-khan/Alpha-Hotels/releases/download/App_Release/Alpha_Hotels_2.23.apk',
  },
  {
    color: '#060010',
    title: 'Fitness Tracker App',
    description: 'A mobile app to log workouts, track progress, and connect with a fitness community.',
    label: 'Android App',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    imageHint: 'fitness workout tracking',
    liveUrl: '#',
    githubUrl: 'https://github.com/araiz-khan/Pulse-Fitness-App/tree/main',
    downloadUrl: 'https://github.com/araiz-khan/Pulse-Fitness-App/releases/download/Repo_Owner/Pulse.Fitness.apk',
  },
  {
    color: '#060010',
    title: 'Interactive Travel Planner',
    description: 'A web platform for planning trips with collaborative itineraries and map integrations.',
    label: 'Travel',
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
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&crop=center',
    imageHint: 'AI chatbot interface',
    githubUrl: '#',
  },
  {
    color: '#060010',
    title: 'Serverless Video Processor',
    description: 'A cloud-native solution for automatically transcoding and watermarking uploaded videos.',
    label: 'Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
    imageHint: 'video processing cloud',
  }
];
