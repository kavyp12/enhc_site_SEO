// src/lib/seo.ts
// Central SEO configuration for Enhc Tech LLP.
// Update SITE_URL here (or via NEXT_PUBLIC_SITE_URL) if the production domain changes.
import type { Metadata } from 'next';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://enhc.tech'
).replace(/\/$/, '');

export const SITE_NAME = 'enhc';
export const LEGAL_NAME = 'Enhc Tech LLP';
export const DEFAULT_OG_IMAGE = '/enhc_logo.jpg';
export const TWITTER_HANDLE = '@enhctech';

// Company facts reused across metadata and structured data.
export const COMPANY = {
  legalName: LEGAL_NAME,
  brand: SITE_NAME,
  founded: '2022',
  email: 'contact@enhc.tech',
  phone: '+91 9313153036',
  street: 'Shivalik Shilp',
  city: 'Ahmedabad',
  region: 'Gujarat',
  country: 'IN',
  geo: { lat: 23.027206768268236, lng: 72.50625586930879 },
  social: [
    'https://www.linkedin.com/company/enhctech/',
    'https://www.instagram.com/enhancemodel.ai',
    'https://github.com/kavyp12',
  ],
};

type PageSeo = {
  title: string;
  description: string;
  /** Path beginning with "/" e.g. "/contact" */
  path: string;
  keywords?: string[];
  image?: string;
  /** Set true for thin/utility pages that should not be indexed */
  noindex?: boolean;
};

/**
 * Build a full Metadata object for a page, keeping titles, canonical URLs,
 * Open Graph and Twitter cards consistent across the whole site.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
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
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title,
      description,
      images: [image],
    },
  };
}
