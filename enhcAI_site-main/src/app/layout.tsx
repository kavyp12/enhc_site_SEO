// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import GoogleAnalytics from './components/GoogleAnalytics';
import StructuredData from './components/StructuredData';
import SmoothScroll from './components/SmoothScroll';
import { SITE_URL, SITE_NAME, LEGAL_NAME, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from '@/lib/seo';
import { Poppins } from 'next/font/google';

// Site-wide brand typeface (Poppins). Self-hosted by next/font — no external
// request, no layout shift. Exposed as the --font-poppins CSS variable and
// applied to <html>, so every element renders in Poppins — the per-component
// font declarations were all rewritten to reference this same variable.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'enhc | AI, Automation & Software Company in Ahmedabad',
    template: '%s | enhc',
  },
  description:
    'enhc (Enhc Tech LLP) is an AI solutions company in Ahmedabad building custom AI tools, automation, machine learning and predictive analytics for businesses.',
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
  // Google Search Console HTML-tag verification. Set GOOGLE_SITE_VERIFICATION
  // (the token from GSC's "HTML tag" method) in .env.local + Vercel to emit the
  // <meta name="google-site-verification"> tag. Left unset it renders nothing —
  // in that case verify GSC via the already-installed GA4 property instead.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  icons: {
    // Browser-tab favicon = the enhc wordmark only (no tile). icon.svg adapts to
    // the tab theme (navy on light, white on dark); favicon.ico is the fallback.
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    // Apple touch icon stays the opaque tile — iOS home screens ignore
    // transparency (a bare logo would render on a black square).
    apple: [{ url: '/icon-192.png', sizes: '180x180' }],
  },
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
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-gray-900 text-white overflow-x-clip">
        {/* Warm up the connections the pages actually use (remote hero/blog
            imagery + analytics) so their TLS handshake isn't on the critical
            path. React 19 hoists these <link> tags into <head>. */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
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
