<div align="center">
  <h1>✨ Araiz Khan - Portfolio Website ✨</h1>
  <p>A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

  [Live Demo](https://araizkhan.com) • [Report Bug](https://github.com/araiz-khan/Portfolio_Next/issues) • [Request Feature](https://github.com/araiz-khan/Portfolio_Next/issues)
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

A cutting-edge portfolio website showcasing my work as a Full Stack Developer. Built with the latest web technologies, featuring smooth animations, interactive components, and a modern design system. The site includes sections for projects, services, about me, and a contact form with Firebase integration.

## ✨ Features

- **🎨 Modern UI/UX** - Clean, professional design with smooth animations using Framer Motion and GSAP
- **🌓 Dark/Light Mode** - Toggle between themes with persistent preferences
- **📱 Fully Responsive** - Optimized for all devices from mobile to desktop
- **🎭 Interactive Components** - Animated cursor, particle backgrounds, and tilted cards
- **🚀 Performance Optimized** - Built with Next.js 15 and Turbopack for blazing-fast load times
- **♿ Accessibility** - WCAG compliant with proper semantic HTML and ARIA labels
- **📧 Contact Form** - Integrated with Firebase for message storage
- **🎨 Bento Grid Layout** - Modern project showcase with interactive cards
- **📊 Type Safety** - Full TypeScript implementation for robust code
- **🎯 SEO Optimized** - Meta tags and structured data for better search engine visibility

## 🛠 Tech Stack

### Core Framework
- **[Next.js 15.3.3](https://nextjs.org/)** - React framework with App Router
- **[React 18.3](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities
- **[class-variance-authority](https://cva.style/)** - Component variants
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[Recharts](https://recharts.org/)** - Chart library

### Animations & Effects
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[GSAP](https://greensock.com/gsap/)** - Professional animation platform
- **[react-animated-cursor](https://www.npmjs.com/package/react-animated-cursor)** - Custom animated cursor
- **[OGL](https://oframe.github.io/ogl/)** - WebGL library for particle effects

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form library
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation resolvers

### Backend Services
- **[Firebase](https://firebase.google.com/)** - Backend-as-a-Service for contact form

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Turbopack](https://turbo.build/pack)** - Next-gen bundler

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/araiz-khan/Portfolio_Next.git
   cd Portfolio_Next
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   
   > Note: Using `--legacy-peer-deps` resolves peer dependency conflicts between Next.js 15 and ESLint versions.

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration (if using contact form)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

The app uses **Turbopack** for faster builds and hot module replacement.

### Build

Build the production-ready application:

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
Portfolio_Next/
├── public/
│   └── images/                 # Static images and assets
│       └── ChronoZen/
├── src/
│   ├── app/
│   │   ├── actions.ts         # Server actions
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── about-section.tsx
│   │   │   ├── contact-section.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   └── services-section.tsx
│   │   ├── ui/                # Reusable UI components (Radix + Tailwind)
│   │   ├── header.tsx         # Navigation header
│   │   ├── footer.tsx         # Footer component
│   │   ├── theme-provider.tsx # Dark/light theme provider
│   │   ├── theme-toggle.tsx   # Theme switcher
│   │   ├── animated-cursor.tsx
│   │   ├── particle-background.tsx
│   │   ├── magic-bento.tsx    # Bento grid layout
│   │   └── ...                # Other components
│   ├── hooks/
│   │   ├── use-mobile.tsx     # Mobile detection hook
│   │   └── use-toast.ts       # Toast notifications
│   ├── lib/
│   │   ├── data.ts            # Static data (projects, services)
│   │   ├── types.ts           # TypeScript type definitions
│   │   └── utils.ts           # Utility functions
├── docs/
│   └── blueprint.md           # Project documentation
├── components.json            # shadcn/ui configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## ⚙️ Configuration

### Customizing Content

1. **Personal Information**: Edit [`src/lib/data.ts`](src/lib/data.ts) to update:
   - Services offered
   - Project showcase
   - Bento card data

2. **Theme Colors**: Modify [`tailwind.config.ts`](tailwind.config.ts) to customize:
   - Color palette
   - Dark/light mode colors
   - Border radius and spacing

3. **Metadata**: Update [`src/app/layout.tsx`](src/app/layout.tsx) for:
   - Page title and description
   - OpenGraph metadata
   - Twitter card metadata

### Firebase Setup

To enable the contact form:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Add your Firebase config to `.env.local`
4. Update Firebase rules in your console

## 🎨 Customization

### Adding New Projects

Edit [`src/lib/data.ts`](src/lib/data.ts):

```typescript
export const projects: Project[] = [
  {
    id: 'your-project-id',
    title: 'Your Project Name',
    description: 'Project description',
    technologies: ['Next.js', 'TypeScript'],
    imageUrl: '/images/your-project.png',
    imageHint: 'descriptive text',
    liveUrl: 'https://yourproject.com',
    githubUrl: 'https://github.com/yourusername/repo',
    industry: 'Industry Type',
  },
  // ... more projects
];
```

### Modifying Styles

- **Global styles**: [`src/app/globals.css`](src/app/globals.css)
- **Component styles**: Inline Tailwind classes or separate CSS modules
- **Theme variables**: CSS variables in globals.css

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/araiz-khan/Portfolio_Next)

1. Push your code to GitHub
2. Import your repo in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

- **Netlify**: Connect your repo and deploy
- **AWS Amplify**: Use the Amplify console
- **Custom Server**: Build and host with `npm run build && npm run start`

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your PR adheres to the following guidelines:
- Follow the existing code style
- Update documentation if needed
- Add tests if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

**Araiz Khan**

- Portfolio: [araizkhan.com](https://araizkhan.com)
- GitHub: [@araiz-khan](https://github.com/araiz-khan)
- LinkedIn: [Araiz Khan](https://linkedin.com/in/araiz-khan)
- Email: contact@araizkhan.com

---

<div align="center">
  <p>If you found this project helpful, please consider giving it a ⭐!</p>
  <p>Made with ❤️ by Araiz Khan</p>
</div>
