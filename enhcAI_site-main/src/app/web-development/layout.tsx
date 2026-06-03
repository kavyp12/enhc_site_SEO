import { buildMetadata, SITE_URL, LEGAL_NAME } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Web Development Company',
  description:
    'enhc builds fast, modern, SEO-friendly websites and web applications. Responsive sites, web apps, e-commerce and headless CMS using React, Next.js and TypeScript.',
  path: '/web-development',
  keywords: ['web development company', 'website development Ahmedabad', 'Next.js development', 'React development', 'web app development', 'e-commerce development'],
});

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Development',
  name: 'Web Development',
  url: `${SITE_URL}/web-development`,
  provider: { '@type': 'Organization', name: LEGAL_NAME, url: SITE_URL },
  areaServed: 'Worldwide',
  description:
    'Responsive websites, web applications, e-commerce stores and headless CMS builds with strong performance and SEO foundations.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {children}
    </>
  );
}
