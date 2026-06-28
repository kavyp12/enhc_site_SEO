import { buildMetadata, SITE_URL, LEGAL_NAME } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Industries We Serve — AI & Software Solutions by Sector',
  description:
    'enhc delivers AI-first IT solutions tailored to your industry — healthcare, real estate, education, transportation & logistics, and accounting & finance. See how our AI and software solve real business problems in your sector.',
  path: '/industries',
  keywords: [
    'AI solutions by industry',
    'healthcare AI software',
    'real estate AI solutions',
    'education technology development',
    'logistics AI automation',
    'fintech software development',
    'industry specific software',
  ],
});

const industriesLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Industry AI & Software Solutions',
  name: 'Industry Solutions',
  url: `${SITE_URL}/industries`,
  provider: { '@type': 'Organization', name: LEGAL_NAME, url: SITE_URL },
  areaServed: 'Worldwide',
  description:
    'AI-first IT solutions tailored to specific industries including healthcare, real estate, education, transportation & logistics, and accounting & finance.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(industriesLd) }} />
      {children}
    </>
  );
}
