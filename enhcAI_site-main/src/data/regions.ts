// src/data/regions.ts
// Typed config for the region landing pages (/us, /europe, /middle-east).
// One source of truth so RegionLanding.tsx stays DRY — copy, CTAs, chips,
// FAQs, schema areaServed and per-page metadata all live here.

export type RegionSlug = 'us' | 'europe' | 'middle-east';

type Cta = { label: string; href: string };
type Faq = { q: string; a: string };
type AreaServed = { '@type': 'Country' | 'Place'; name: string };

export type RegionConfig = {
  slug: RegionSlug;
  /** Route path beginning with "/" — also the self-canonical. */
  path: string;
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  subhead: string;
  whyBullets: string[];
  complianceLine: string;
  timezoneLine: string;
  currencyLine: string;
  ctaPrimary: Cta;
  ctaSecondary: Cta;
  chips: string[];
  faqs: Faq[];
  /** schema.org areaServed nodes for the Service JSON-LD. */
  areaServed: AreaServed[];
  // ---- page metadata (fed to buildMetadata in each page.tsx) ----
  title: string;
  description: string;
  keywords: string[];
};

// Shared across every region.
const CTA_PRIMARY: Cta = { label: 'Start Your AI Project', href: '/startproject' };
const CTA_SECONDARY: Cta = { label: 'Book a Discovery Call', href: '/contact' };
const CHIPS = ['Timezone-aligned delivery', 'Senior AI engineers', 'Full IP ownership', 'NDA & secure'];

/** Services strip — links to the existing service routes (same for every region). */
export const REGION_SERVICES: { name: string; href: string }[] = [
  { name: 'Custom AI Solutions', href: '/custom-ai-solutions' },
  { name: 'AI Automation', href: '/AIautomation' },
  { name: 'Machine Learning', href: '/machinelearningmodel' },
  { name: 'Predictive Analytics', href: '/predictiveAnalytics' },
  { name: 'Web Development', href: '/web-development' },
  { name: 'App Development', href: '/app-development' },
];

export const REGIONS: Record<RegionSlug, RegionConfig> = {
  us: {
    slug: 'us',
    path: '/us',
    breadcrumbLabel: 'United States',
    eyebrow: 'AI Development Partner · United States',
    h1: 'AI development for US businesses — without the US agency price tag',
    subhead:
      'enhc is your senior AI engineering team: we build custom AI, automation and software for US startups and enterprises, with real ET/PT working-hour overlap and agency-grade quality at better economics.',
    whyBullets: [
      'Timezone overlap: dedicated hours across ET and PT, so standups, demos and reviews land inside your workday.',
      'Senior engineers, US-agency quality: machine learning, LLM, computer vision and full-stack product teams.',
      'Your IP, fully yours: NDA, MSA and complete IP assignment on every engagement.',
      'Security-first engineering: encryption, access control and IP protection as standard; SOC 2 / ISO 27001 alignment on our roadmap.',
      'Better economics: senior talent at a fraction of US agency rates, billed transparently in USD.',
    ],
    complianceLine:
      'Security-first delivery — encryption, access controls, NDAs, and SOC 2 / ISO 27001 alignment available on request.',
    timezoneLine: 'We work overlapping ET/PT hours with a dedicated project manager on your schedule.',
    currencyLine: 'Billed in USD.',
    ctaPrimary: CTA_PRIMARY,
    ctaSecondary: CTA_SECONDARY,
    chips: CHIPS,
    faqs: [
      {
        q: 'Do you work in US time zones?',
        a: 'Yes. We run overlapping ET/PT hours with a dedicated PM, so collaboration happens in your workday — not overnight.',
      },
      {
        q: 'Who owns the code and models you build?',
        a: 'You do. Full IP assignment is written into the MSA before work begins.',
      },
      {
        q: 'How do you handle data security?',
        a: 'Encryption, role-based access control and signed NDAs as standard, with SOC 2 / ISO 27001 alignment available on request.',
      },
      {
        q: 'How do you price projects?',
        a: 'Fixed-scope or monthly retainer, billed in USD, after a free discovery call to scope the work.',
      },
      {
        q: 'Can you integrate with our existing stack?',
        a: 'Yes — we integrate with your cloud (AWS/Azure/GCP), APIs and data sources rather than forcing a rebuild.',
      },
    ],
    areaServed: [{ '@type': 'Country', name: 'United States' }],
    title: 'AI Development Company for US Businesses',
    description:
      'enhc builds custom AI, automation and software for US startups and enterprises — senior engineers, ET/PT timezone overlap, full IP ownership, billed in USD.',
    keywords: [
      'AI development company USA',
      'hire AI developers US',
      'offshore AI development USA',
      'nearshore AI development',
      'custom AI software US',
      'AI automation company US',
      'machine learning development USA',
      'AI consulting US',
    ],
  },

  europe: {
    slug: 'europe',
    path: '/europe',
    breadcrumbLabel: 'Europe & UK',
    eyebrow: 'AI Development Partner · Europe & UK',
    h1: 'GDPR-ready AI development for European businesses',
    subhead:
      'enhc builds custom AI, automation and software for companies across the UK, DACH, the Nordics and wider Europe — with GDPR-compliant delivery, EU data-residency options, and working hours that overlap GMT/CET.',
    whyBullets: [
      'GDPR-compliant by design: a Data Processing Agreement, lawful data handling and EU data-residency options.',
      'Standards & security: encryption, access control and ISO 27001 alignment on our roadmap.',
      'Timezone overlap: working hours across GMT/CET for real-time collaboration.',
      'Senior engineering, precise delivery: ML, LLM, computer vision and full-stack teams with a transparent process.',
      'Your IP, protected: NDA, MSA and full IP assignment; billed in EUR or GBP.',
    ],
    complianceLine:
      'GDPR-compliant delivery with a DPA, lawful processing and EU data-residency options; ISO 27001 alignment on our roadmap.',
    timezoneLine: 'We work overlapping GMT/CET hours with a dedicated project manager.',
    currencyLine: 'Billed in EUR or GBP.',
    ctaPrimary: CTA_PRIMARY,
    ctaSecondary: CTA_SECONDARY,
    chips: CHIPS,
    faqs: [
      {
        q: 'Are you GDPR compliant?',
        a: 'Yes. We sign a Data Processing Agreement, process data lawfully, and offer EU data-residency options.',
      },
      {
        q: 'Where is our data stored and processed?',
        a: 'EU data-residency is available on request; we scope this with you before the project starts.',
      },
      {
        q: 'Do you overlap European working hours?',
        a: 'Yes — GMT/CET overlap with a dedicated PM for real-time collaboration.',
      },
      {
        q: 'Who owns the IP?',
        a: 'You do. Full IP assignment is written into the MSA.',
      },
      {
        q: 'What currencies do you bill in?',
        a: 'EUR or GBP, whichever suits your finance team.',
      },
    ],
    areaServed: [
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    title: 'GDPR-Compliant AI Development Company for Europe',
    description:
      'enhc builds custom AI, automation and software for UK & European businesses — GDPR-compliant delivery, EU data-residency options, GMT/CET overlap, billed in EUR/GBP.',
    keywords: [
      'AI development company Europe',
      'GDPR compliant AI development',
      'AI development company UK',
      'hire AI developers Europe',
      'custom AI software Europe',
      'machine learning company Europe',
      'AI automation Europe',
      'offshore AI development EU',
    ],
  },

  'middle-east': {
    slug: 'middle-east',
    path: '/middle-east',
    breadcrumbLabel: 'Middle East',
    eyebrow: 'AI Development Partner · Middle East',
    h1: 'AI development partner for the UAE, Saudi Arabia & the Gulf',
    subhead:
      'enhc helps enterprises, government-linked entities and startups across the UAE, KSA and Qatar build custom AI, automation and software — supporting Vision 2030 and national AI ambitions, with senior engineering and a full working-hours overlap.',
    whyBullets: [
      'Aligned to national AI agendas: a build partner for Saudi Vision 2030 and the UAE National AI Strategy 2031 digital-transformation goals.',
      'Full timezone overlap: GST working hours mean same-business-day, real-time collaboration.',
      'Relationship-first delivery: a dedicated account lead, with in-person and on-site engagement where it matters.',
      'Senior AI engineering: ML, LLM, computer vision, multilingual NLP and full-stack product teams.',
      'Secure and IP-safe: NDA, MSA and full IP assignment; billed in AED or SAR.',
    ],
    complianceLine:
      'Secure delivery with NDAs, full IP assignment, encryption and access controls; ISO 27001 alignment on our roadmap.',
    timezoneLine: 'We work full GST-overlapping hours — the same business day as your team.',
    currencyLine: 'Billed in AED or SAR.',
    ctaPrimary: CTA_PRIMARY,
    ctaSecondary: CTA_SECONDARY,
    chips: CHIPS,
    faqs: [
      {
        q: 'Do you work Gulf (GST) hours?',
        a: 'Yes — full same-business-day overlap with a dedicated account lead.',
      },
      {
        q: 'Can you support Vision 2030 or national AI projects?',
        a: 'Yes. We build AI and digital-transformation solutions aligned to Vision 2030 and the UAE National AI Strategy.',
      },
      {
        q: 'Do you meet in person?',
        a: "Yes — we support on-site, relationship-led engagement, and we're happy to meet at GITEX (Dubai) or LEAP (Riyadh).",
      },
      {
        q: 'Who owns the IP?',
        a: 'You do — full IP assignment in the MSA.',
      },
      {
        q: 'What currencies do you bill in?',
        a: 'AED or SAR.',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Qatar' },
    ],
    title: 'AI Development Partner for UAE, Saudi Arabia & the Gulf',
    description:
      'enhc builds custom AI, automation and software for the UAE, Saudi Arabia & Qatar — aligned to Vision 2030, full GST timezone overlap, senior engineers, billed in AED/SAR.',
    keywords: [
      'AI development company UAE',
      'AI development company Dubai',
      'AI development Saudi Arabia',
      'AI company Middle East',
      'hire AI developers Dubai',
      'custom AI software UAE',
      'AI automation Saudi Arabia',
      'Vision 2030 AI partner',
    ],
  },
};
