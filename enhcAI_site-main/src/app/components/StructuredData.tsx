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
  GLOBAL_AREA_SERVED,
  LEADERS,
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
    telephone: COMPANY.phoneE164,
    email: COMPANY.email,
    contactType: 'sales',
    areaServed: 'Worldwide',
    availableLanguage: ['en', 'hi'],
  };

  const graph = [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: COMPANY.legalName,
      alternateName: SITE_NAME,
      url: SITE_URL,
      // Dedicated clean logo (used in the knowledge panel + as the publisher
      // logo on every BlogPosting). The 1200x630 og-image is the separate
      // representative `image` below — it is a text-heavy card, not a logo.
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/enhc_logo.jpg`,
        contentUrl: `${SITE_URL}/enhc_logo.jpg`,
        width: 648,
        height: 454,
        caption: COMPANY.legalName,
      },
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      email: COMPANY.email,
      telephone: COMPANY.phoneE164,
      foundingDate: COMPANY.founded,
      foundingLocation: { '@type': 'Place', name: `${COMPANY.city}, ${COMPANY.region}, India` },
      address,
      contactPoint,
      sameAs: COMPANY.social,
      // enhc delivers remotely to these markets — declare the entity's true
      // global service area (not just the Ahmedabad HQ) so search + AI engines
      // understand the company operates worldwide. The real HQ address/
      // foundingLocation below stay (they are factual and help local queries).
      areaServed: GLOBAL_AREA_SERVED,
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
      // Named founders as Person references — the full Person entities are
      // emitted below in the same @graph and reused as blog-author identities.
      founder: LEADERS.map((l) => ({ '@id': l.id })),
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
      telephone: COMPANY.phoneE164,
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
    // Real, named leadership as Person entities (E-E-A-T). The same @id is
    // reused by blog author bylines so each byline resolves to one credentialed
    // human who is also a founder of #organization.
    ...LEADERS.map((l) => ({
      '@type': 'Person',
      '@id': l.id,
      name: l.name,
      jobTitle: l.jobTitle,
      worksFor: { '@id': ORG_ID },
      ...(l.sameAs.length ? { sameAs: l.sameAs } : {}),
    })),
  ];

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
