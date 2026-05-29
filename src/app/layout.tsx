import type { Metadata, Viewport } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Lora } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fontLora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://araiz-khan.vercel.app'),
  title: {
    default: 'Araiz Khan - Full Stack Developer & AI Developer',
    template: '%s | Araiz Khan',
  },
  description: 'Experienced Full Stack Developer specializing in Web & AI Development, AI integration, and custom software solutions. Portfolio showcasing Next.js, React, Android, and AI-powered projects.',
  keywords: ['Araiz Khan', 'Full Stack Developer', 'AI Developer', 'Web Developer', 'Next.js', 'React', 'Android Developer', 'AI Developer', 'Software Engineer', 'Portfolio'],
  authors: [{ name: 'Araiz Khan' }],
  creator: 'Araiz Khan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://araiz-khan.vercel.app',
    title: 'Araiz Khan - Full Stack Developer & Mobile App Developer',
    description: 'Experienced Full Stack Developer specializing in Web & Mobile App Development, AI integration, and custom software solutions.',
    siteName: 'Araiz Khan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Araiz Khan - Full Stack Developer',
    description: 'Full Stack Developer specializing in Web & Mobile App Development',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn('font-body antialiased', fontInter.variable, fontLora.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
