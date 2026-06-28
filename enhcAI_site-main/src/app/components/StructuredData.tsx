// src/app/components/StructuredData.tsx
// Sitewide JSON-LD structured data. Rendered once in the root layout so that
// Organization, LocalBusiness and WebSite schemas appear on every page.
import { SITE_URL, SITE_NAME, COMPANY, DEFAULT_OG_IMAGE } from '@/lib/seo';

export default function StructuredData() {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: COMPANY.legalName,
      alternateName: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      foundingDate: COMPANY.founded,
      sameAs: COMPANY.social,
      description:
        'enhc (Enhc Tech LLP) is an AI-first IT solutions company in Ahmedabad, India, helping businesses build, automate, transform and scale with custom AI software, AI agents and automation, machine learning, predictive analytics, web and mobile apps, ERP, CRM, SaaS, cloud solutions and IT consulting.',
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: COMPANY.legalName,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      url: SITE_URL,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.street,
        addressLocality: COMPANY.city,
        addressRegion: COMPANY.region,
        addressCountry: COMPANY.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COMPANY.geo.lat,
        longitude: COMPANY.geo.lng,
      },
      areaServed: 'Worldwide',
      sameAs: COMPANY.social,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ];

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
