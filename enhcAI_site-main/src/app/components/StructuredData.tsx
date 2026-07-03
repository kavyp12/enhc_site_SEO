// src/app/components/StructuredData.tsx
// Sitewide JSON-LD structured data. Rendered once in the root layout so that
// Organization, LocalBusiness (ProfessionalService) and WebSite schemas appear
// on every page, all cross-referenced by stable @id anchors.
import {
  SITE_URL,
  SITE_NAME,
  COMPANY,
  DEFAULT_OG_IMAGE,
  ORG_ID,
  WEBSITE_ID,
  LOCALBUSINESS_ID,
  AREA_SERVED,
} from '@/lib/seo';

export default function StructuredData() {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.street,
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.region,
    ...(COMPANY.postalCode ? { postalCode: COMPANY.postalCode } : {}),
    addressCountry: COMPANY.country,
  };

  const contactPoint = {
    '@type': 'ContactPoint',
    telephone: COMPANY.phone,
    email: COMPANY.email,
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  };

  const graph = [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: COMPANY.legalName,
      alternateName: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      foundingDate: COMPANY.founded,
      foundingLocation: { '@type': 'Place', name: `${COMPANY.city}, ${COMPANY.region}, India` },
      address,
      contactPoint,
      sameAs: COMPANY.social,
      description:
        'enhc (Enhc Tech LLP) is an AI-first IT solutions company in Ahmedabad, India, helping businesses build, automate, transform and scale with custom AI software, AI agents and automation, machine learning, predictive analytics, web and mobile apps, ERP, CRM, SaaS, cloud solutions and IT consulting.',
      slogan: 'An AI-first IT solutions company.',
      // Entity/topical signals — helps search + AI engines understand exactly
      // what enhc is an authority on (strengthens brand-entity association).
      knowsAbout: [
        'Artificial intelligence',
        'Machine learning',
        'Deep learning',
        'Computer vision',
        'Natural language processing',
        'Generative AI',
        'AI automation',
        'AI agents',
        'Predictive analytics',
        'MLOps',
        'Data science',
        'Web development',
        'Mobile app development',
        'Cloud computing',
        'ERP, CRM and SaaS development',
      ],
    },
    {
      // ProfessionalService is a LocalBusiness subtype — a better fit for a
      // service-based AI/IT firm than the bare LocalBusiness type.
      '@type': 'ProfessionalService',
      '@id': LOCALBUSINESS_ID,
      name: COMPANY.legalName,
      alternateName: SITE_NAME,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      url: SITE_URL,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      priceRange: '$$',
      parentOrganization: { '@id': ORG_ID },
      address,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COMPANY.geo.lat,
        longitude: COMPANY.geo.lng,
      },
      hasMap: `https://www.google.com/maps?q=${COMPANY.geo.lat},${COMPANY.geo.lng}`,
      areaServed: AREA_SERVED,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: COMPANY.openingHours.days,
        opens: COMPANY.openingHours.opens,
        closes: COMPANY.openingHours.closes,
      },
      sameAs: COMPANY.social,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'en',
      publisher: { '@id': ORG_ID },
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
