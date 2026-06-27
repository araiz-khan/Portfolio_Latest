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

const SITE_URL = 'https://araiz-khan.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Araiz Khan — Full Stack & AI Developer',
    template: '%s | Araiz Khan',
  },
  description:
    'Araiz Khan is a Full Stack & AI Developer based in Lahore, Pakistan, building modern web applications with Next.js, React, MongoDB, and custom AI models. Explore his portfolio, projects, and skills.',
  keywords: [
    'Araiz',
    'who is Araiz',
    'Araiz developer',
    'Araiz portfolio',
    'Araiz Khan',
    'who is Araiz Khan',
    'Araiz Khan developer',
    'Araiz Khan portfolio',
    'Araiz Khan Lahore',
    'Araiz Khan Full Stack Developer',
    'Araiz Khan AI Developer',
    'Full Stack Developer',
    'AI Developer',
    'Next.js Developer',
    'React Developer',
    'Software Engineer Pakistan',
  ],
  authors: [{ name: 'Araiz Khan', url: SITE_URL }],
  creator: 'Araiz Khan',
  publisher: 'Araiz Khan',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Araiz Khan — Full Stack & AI Developer',
    description:
      'Full Stack & AI Developer based in Lahore, Pakistan — building modern web apps with Next.js, React, MongoDB, and custom AI models.',
    siteName: 'Araiz Khan',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 1200,
        alt: 'Araiz Khan — Full Stack & AI Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Araiz Khan — Full Stack & AI Developer',
    description:
      'Full Stack & AI Developer based in Lahore, Pakistan — building modern web apps with Next.js, React, MongoDB, and custom AI models.',
    creator: '@araiz_exe',
    images: ['/og-image.jpg'],
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
  // Google Search Console: paste your verification code here, e.g.
  // verification: { google: 'your-google-site-verification-code' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Structured data so search engines recognize "Araiz Khan" as a person entity
// and connect this site to his social profiles (helps name-based search & rich results).
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#araiz-khan`,
      name: 'Araiz Khan',
      alternateName: 'Araiz',
      givenName: 'Araiz',
      familyName: 'Khan',
      url: SITE_URL,
      image: `${SITE_URL}/og-image.jpg`,
      jobTitle: 'Full Stack & AI Developer',
      description:
        'Full Stack & AI Developer based in Lahore, Pakistan, specializing in Next.js, React, MongoDB, Python, and custom AI models.',
      email: 'araizkhaan@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lahore',
        addressCountry: 'PK',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Superior University, Lahore',
      },
      knowsAbout: [
        'Full Stack Development',
        'Artificial Intelligence',
        'Next.js',
        'React',
        'MongoDB',
        'Python',
        'Computer Vision',
        'Generative AI',
      ],
      sameAs: [
        'https://github.com/araiz-khan',
        'https://www.linkedin.com/in/araiz-khan/',
        'https://x.com/araiz_exe',
        'https://stackoverflow.com/users/21872928/araiz-khan',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Araiz Khan',
      description: 'Portfolio of Araiz Khan — Full Stack & AI Developer.',
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#araiz-khan` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Araiz Khan — Full Stack & AI Developer',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#araiz-khan` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn('font-body antialiased', fontInter.variable, fontLora.variable)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
