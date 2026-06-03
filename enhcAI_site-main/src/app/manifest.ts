// src/app/manifest.ts
import type { MetadataRoute } from 'next';
import { SITE_NAME, LEGAL_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — AI Solutions Company (${LEGAL_NAME})`,
    short_name: SITE_NAME,
    description:
      'AI tools, AI automation, AI workflows, web development and app development from Ahmedabad, India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: '/enhc_logo.jpg', sizes: '192x192', type: 'image/jpeg' },
      { src: '/enhc_logo.jpg', sizes: '512x512', type: 'image/jpeg' },
    ],
  };
}
