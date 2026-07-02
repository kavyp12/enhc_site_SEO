// src/app/robots.ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Only block the API. The utility routes (/allinfo /room /analytic /ROI)
  // are intentionally noindex via their layout metadata — they must stay
  // crawlable so search engines can actually READ that noindex tag (a
  // Disallow would hide the tag and risk a URL-only index entry instead).
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
