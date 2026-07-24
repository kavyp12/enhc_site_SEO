// src/lib/seo.ts
// Central SEO configuration for Enhc Tech LLP.
// Update SITE_URL here (or via NEXT_PUBLIC_SITE_URL) if the production domain changes.
import type { Metadata } from 'next';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://enhc.tech'
).replace(/\/$/, '');

export const SITE_NAME = 'enhc';
export const LEGAL_NAME = 'Enhc Tech LLP';

// Approximate production launch of this Next.js site — the earliest date any URL
// on it could plausibly have been modified. GSC shows no data before ~mid-Dec
// 2025 and the property is ~7 months old (per the 24 Jul 2026 audit), so the
// site went live around Dec 2025. Used to FLOOR sitemap <lastmod> values so no
// URL ever claims a pre-launch date; the build timestamp is the upper cap so
// none claims a future date. Adjust this one constant if the real launch differs.
export const SITE_LAUNCH = new Date('2025-12-01T00:00:00Z');

/** Clamp a date into [SITE_LAUNCH, now] so sitemap lastmods are never pre-launch or future. */
export function clampLastmod(date: Date, now: Date = new Date()): Date {
  const t = Math.min(Math.max(date.getTime(), SITE_LAUNCH.getTime()), now.getTime());
  return new Date(t);
}
// 1200x630 branded social card (generated). Falls back gracefully if absent.
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const TWITTER_HANDLE = '@enhctech';

// Company facts reused across metadata and structured data.
// Keep NAP (name / address / phone) here identical to the footer + Google
// Business Profile — NAP consistency is a top local-ranking signal.
export const COMPANY = {
  legalName: LEGAL_NAME,
  brand: SITE_NAME,
  founded: '2022',
  email: 'contact@enhc.tech',
  phone: '+91 9313153036',
  // Digits-only form for tel: links / schema (E.164).
  phoneE164: '+919313153036',
  street: 'Shivalik Shilp',
  city: 'Ahmedabad',
  region: 'Gujarat',
  // PIN code — keep identical to the Google Business Profile + site footer for
  // NAP consistency. Flows into the LocalBusiness/Organization PostalAddress.
  postalCode: '382330',
  country: 'IN',
  geo: { lat: 23.027206768268236, lng: 72.50625586930879 },
  // Service-area for a primarily service-based (SAB) AI/IT firm.
  areaServed: ['Ahmedabad', 'Gujarat', 'India'],
  // TODO(enhc): confirm real business hours (used for local "open now" ranking).
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '19:00',
  },
  // sameAs (below) must identify the ORGANISATION entity, so this lists only
  // brand-owned profiles. x.com/enhctech matches TWITTER_HANDLE. The CTO's
  // personal GitHub lives on his Person node in StructuredData.tsx, not here.
  social: [
    'https://www.linkedin.com/company/enhctech/',
    'https://www.instagram.com/enhancemodel.ai',
    'https://x.com/enhctech',
  ],
};

// Stable @id anchors so every JSON-LD node references ONE organization / website
// / local-business entity across the whole site (entity consolidation).
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;

// Typed schema.org areaServed nodes derived from COMPANY.areaServed.
export const AREA_SERVED = [
  { '@type': 'City', name: 'Ahmedabad' },
  { '@type': 'AdministrativeArea', name: 'Gujarat' },
  { '@type': 'Country', name: 'India' },
];

// enhc delivers remotely to these markets. Used as the DEFAULT areaServed for
// the #organization entity and every Service node so the declared service area
// matches the US / Europe / worldwide positioning (the on-site homepage/title
// were already globalized; this aligns the machine-readable layer). The
// India-only AREA_SERVED above is kept for any genuinely India-local node.
export const GLOBAL_AREA_SERVED = [
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Germany' },
  { '@type': 'Place', name: 'Europe' },
  { '@type': 'Country', name: 'United Arab Emirates' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Country', name: 'Australia' },
  { '@type': 'Country', name: 'India' },
];

// Real, named leadership. Emitted once as Person nodes in the sitewide JSON-LD
// @graph (founders of #organization) and reused as blog-author identities so a
// byline and the founder resolve to ONE Person entity. Only genuine profile
// URLs go in sameAs — never invent a profile.
export const LEADERS: { id: string; name: string; jobTitle: string; sameAs: string[] }[] = [
  { id: `${SITE_URL}/#harsh-gajera`, name: 'Harsh Gajera', jobTitle: 'Chief Executive Officer', sameAs: [] },
  { id: `${SITE_URL}/#kavy-patel`, name: 'Kavy Patel', jobTitle: 'Chief Technology Officer', sameAs: ['https://github.com/kavyp12'] },
];

/** Map an author's display name to their stable Person @id, when a known leader. */
export const AUTHOR_ID_BY_NAME: Record<string, string> = Object.fromEntries(
  LEADERS.map((l) => [l.name, l.id]),
);

// Shared human-date -> ISO parser (used by the blog layout and the sitemap so
// lastmod reflects real publish dates rather than build time).
const MONTHS: Record<string, string> = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

/** Parse a human date ("Updated on 17 Jul 2025") into ISO "2025-07-17". */
export function toIso(input?: string): string | undefined {
  if (!input) return undefined;
  const m = input.match(/(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})/);
  if (!m) return undefined;
  const mm = MONTHS[m[2].slice(0, 3).toLowerCase()];
  if (!mm) return undefined;
  return `${m[3]}-${mm}-${m[1].padStart(2, '0')}`;
}

/** Resolve a site-relative path to an absolute URL on the canonical host. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path === '/' ? '' : path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Trim a long string into a clean meta-description: collapse whitespace and cut
 * at a WORD boundary (never mid-word) under `max` chars, adding an ellipsis.
 * Used for auto-generated snippets (e.g. project case studies) so the SERP
 * description isn't chopped mid-word like "...secure user authenticati".
 */
export function clampDescription(text?: string, max = 155): string {
  if (!text) return '';
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:–—-]+$/, '') + '…';
}

type PageSeo = {
  title: string;
  description: string;
  /** Path beginning with "/" e.g. "/contact" */
  path: string;
  keywords?: string[];
  image?: string;
  /** Set true for thin/utility pages that should not be indexed */
  noindex?: boolean;
  /** og:type — 'article' for blog posts / case studies, otherwise 'website'. */
  ogType?: 'website' | 'article';
  /** ISO 8601 times, only emitted when ogType === 'article'. */
  publishedTime?: string;
  modifiedTime?: string;
  /** Author name(s) for article Open Graph tags. */
  authors?: string[];
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
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  // Only the default social card is verified 1200x630. For custom per-page
  // images (blog heroes, project screenshots of varied aspect) omit width/height
  // so crawlers read the intrinsic size instead of a false declared ratio.
  const ogImage =
    image === DEFAULT_OG_IMAGE
      ? { url: image, width: 1200, height: 630, alt: title }
      : { url: image, alt: title };

  const openGraph: Metadata['openGraph'] =
    ogType === 'article'
      ? {
          type: 'article',
          url,
          siteName: SITE_NAME,
          title,
          description,
          locale: 'en_US',
          images: [ogImage],
          ...(publishedTime ? { publishedTime } : {}),
          ...(modifiedTime ? { modifiedTime } : {}),
          ...(authors && authors.length ? { authors } : {}),
        }
      : {
          type: 'website',
          url,
          siteName: SITE_NAME,
          title,
          description,
          locale: 'en_US',
          images: [ogImage],
        };

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
    openGraph,
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title,
      description,
      images: [image],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD builders                                                          */
/*  Each returns a plain schema.org node WITHOUT @context — wrap for output   */
/*  with the <JsonLd> component, which adds @context (and @graph for arrays). */
/* -------------------------------------------------------------------------- */

type ServiceSeo = {
  serviceType: string;
  name: string;
  /** Path beginning with "/" e.g. "/machinelearningmodel" */
  path: string;
  description: string;
  /** Markets this service is offered in. Defaults to enhc's global reach. */
  areaServed?: typeof GLOBAL_AREA_SERVED;
};

/** Service offered by enhc, tied to the single #organization provider. */
export function serviceJsonLd({ serviceType, name, path, description, areaServed = GLOBAL_AREA_SERVED }: ServiceSeo) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    serviceType,
    name,
    url: absoluteUrl(path),
    provider: { '@id': ORG_ID },
    areaServed,
    description,
  };
}

/** BreadcrumbList from an ordered list of { name, path } crumbs. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

type BlogPostingSeo = {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  authorName: string;
  authorRole?: string;
  /** ISO 8601 date, e.g. "2025-07-17". Omitted from output when falsy. */
  datePublished?: string;
  dateModified?: string;
};

/** BlogPosting node for a single article, publisher = #organization. */
export function blogPostingJsonLd({
  id,
  title,
  description,
  image,
  authorName,
  authorRole,
  datePublished,
  dateModified,
}: BlogPostingSeo) {
  const url = absoluteUrl(`/blogs/${id}`);
  const node: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: title,
    description,
    image: [image ? absoluteUrl(image) : absoluteUrl(DEFAULT_OG_IMAGE)],
    author: {
      '@type': 'Person',
      // Resolve a known leader's byline to their stable Person @id so the author
      // and the #organization founder merge into ONE entity (E-E-A-T signal).
      ...(AUTHOR_ID_BY_NAME[authorName] ? { '@id': AUTHOR_ID_BY_NAME[authorName] } : {}),
      name: authorName,
      ...(authorRole ? { jobTitle: authorRole } : {}),
      // Tie the (real) author to the single #organization entity — an E-E-A-T
      // signal that the byline is a genuine member of the company.
      worksFor: { '@id': ORG_ID },
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': url },
    inLanguage: 'en',
  };
  if (datePublished) node.datePublished = datePublished;
  if (datePublished || dateModified) node.dateModified = dateModified || datePublished;
  return node;
}

type CreativeWorkSeo = {
  id: string;
  name: string;
  description: string;
  category?: string;
  year?: number | string;
  image?: string;
  client?: string;
};

/** CreativeWork node for a project case study, creator = #organization. */
export function creativeWorkJsonLd({ id, name, description, category, year, image, client }: CreativeWorkSeo) {
  const url = absoluteUrl(`/project/${id}`);
  const node: Record<string, unknown> = {
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    name,
    url,
    description,
    creator: { '@id': ORG_ID },
  };
  if (category) node.about = category;
  if (year) node.datePublished = String(year);
  if (image) node.image = absoluteUrl(image);
  if (client) node.sourceOrganization = { '@type': 'Organization', name: client };
  return node;
}

/** WebPage subtype (AboutPage / ContactPage / CollectionPage / WebPage). */
export function webPageJsonLd({
  type,
  name,
  path,
  description,
}: {
  type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  name: string;
  path: string;
  description: string;
}) {
  return {
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

/** FAQPage from question/answer pairs (kept for AI-answer citability). */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}
