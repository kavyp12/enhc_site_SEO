// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import GoogleAnalytics from './components/GoogleAnalytics';
import StructuredData from './components/StructuredData';
import SmoothScroll from './components/SmoothScroll';
import { SITE_URL, SITE_NAME, LEGAL_NAME, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'enhc | AI Solutions, Automation & Software Development Company in Ahmedabad',
    template: '%s | enhc',
  },
  description:
    'enhc (Enhc Tech LLP) is an AI solutions company in Ahmedabad, India. We build custom AI tools, AI automation and workflows, machine learning models, predictive analytics, web development and app development that transform businesses.',
  applicationName: SITE_NAME,
  authors: [{ name: LEGAL_NAME, url: SITE_URL }],
  creator: LEGAL_NAME,
  publisher: LEGAL_NAME,
  keywords: [
    'AI company Ahmedabad',
    'AI solutions',
    'AI tools',
    'AI transformation',
    'AI workflows',
    'AI automation',
    'machine learning models',
    'predictive analytics',
    'custom AI development',
    'web development company',
    'app development company',
    'Enhc Tech LLP',
    'enhc',
  ],
  alternates: { canonical: SITE_URL },
  icons: { icon: '/enhc_logo.jpg', apple: '/enhc_logo.jpg' },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'enhc | AI Solutions, Automation & Software Development Company',
    description:
      'AI tools, AI transformation, AI workflows, web development and app development from Ahmedabad, India.',
    locale: 'en_US',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'enhc — AI Solutions Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    title: 'enhc | AI Solutions, Automation & Software Development Company',
    description:
      'AI tools, AI transformation, AI workflows, web development and app development from Ahmedabad, India.',
    images: [DEFAULT_OG_IMAGE],
  },
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga_id = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white overflow-x-clip">
        <SmoothScroll />
        <StructuredData />
        {ga_id && <GoogleAnalytics ga_id={ga_id} />}
        <main className="w-full max-w-full overflow-x-clip">
          {children}
        </main>
      </body>
    </html>
  );
}
