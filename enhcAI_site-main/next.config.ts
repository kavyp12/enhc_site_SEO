import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

// Content-Security-Policy: whitelists exactly the origins this site uses today.
// Anything else — e.g. an injected crypto-miner script or its mining-pool
// connection — is blocked by the browser. `connect-src` is the key control: even
// if a miner script were somehow injected, it cannot reach its pool.
//
// In development we relax it ('unsafe-eval' + ws:) so Next.js Fast Refresh works.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://assets.calendly.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://calendly.com https://*.calendly.com${isDev ? ' ws: wss:' : ''}`,
  "worker-src 'self' blob:",
  // Calendly renders its scheduler inside an iframe from calendly.com.
  "frame-src 'self' https://calendly.com",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Next's built-in image optimizer is ON (unoptimized:true removed). It serves
    // modern formats (AVIF then WebP) at the right size via /_next/image, and runs
    // on Vercel out of the box. NOTE: only <Image> from next/image is optimized —
    // raw <img> tags are untouched, so migrate hot images (hero LCP is done; blog
    // cards + logos are the next candidates) to <Image> to actually benefit.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  // Enforce a single canonical host: 301 www.enhc.tech -> apex enhc.tech so the
  // two hosts never serve duplicate 200s (canonical/sitemap/robots all use apex).
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.enhc.tech' }],
        destination: 'https://enhc.tech/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
