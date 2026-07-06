// src/app/components/RegionLanding.tsx
// SERVER component (no "use client"): renders a region landing page from the
// typed config in src/data/regions.ts. Uses next/link (not useRouter) so it can
// stay a server component; reuses Navbar, Footer, Reveal, JsonLd and the design
// tokens (var(--brand-primary) etc.) from the rest of the site.
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import Reveal from '@/app/components/Reveal';
import JsonLd from '@/app/components/JsonLd';
import BookCallButton from '@/app/components/BookCallButton';
import { ORG_ID, absoluteUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { REGIONS, REGION_SERVICES, type RegionSlug } from '@/data/regions';

const BTN_BASE =
  'group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base';
const BTN_PRIMARY = `${BTN_BASE} bg-[var(--brand-primary)] text-white border border-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] hover:shadow-lg hover:shadow-[var(--brand-primary)]/30`;
const BTN_SECONDARY = `${BTN_BASE} bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-main)] hover:border-[var(--brand-primary)]/60 hover:bg-[var(--bg-card-secondary)]`;
const PILL =
  'text-xs sm:text-sm font-medium tracking-wide text-[var(--text-main)] bg-[var(--bg-card)] px-3 py-1.5 rounded-full border border-[var(--brand-primary)]/30';
const CARD = 'bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl p-6';
const SECTION = 'px-6 md:px-12 py-16 md:py-20 border-t border-[var(--border-main)]';
const H2 = 'text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-main)]';

function ArrowUpRight() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7h-7m7 0v7" />
    </svg>
  );
}

export default function RegionLanding({ slug }: { slug: RegionSlug }) {
  const r = REGIONS[slug];

  // BreadcrumbList + FAQPage + Service (provider references the single #organization).
  const jsonLd: Record<string, unknown>[] = [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: r.breadcrumbLabel, path: r.path },
    ]),
    faqJsonLd(r.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    {
      '@type': 'Service',
      '@id': `${absoluteUrl(r.path)}#service`,
      serviceType: 'AI development',
      name: 'AI Development',
      url: absoluteUrl(r.path),
      provider: { '@id': ORG_ID },
      areaServed: r.areaServed,
      description: r.subhead,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-main)] text-[var(--text-main)]">
        {/* HERO — the single <h1> for the page */}
        <section className="pt-32 pb-16 md:pb-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center md:text-left space-y-8">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="w-2.5 h-2.5 bg-[var(--brand-primary)] rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[var(--text-muted)] bg-[var(--bg-card)] px-4 py-2 rounded-full border border-[var(--brand-primary)]/30">
                {r.eyebrow}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main)] via-[var(--brand-accent)] to-[var(--text-main)]">
                {r.h1}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-3xl mx-auto md:mx-0">
              {r.subhead}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
              <Link href={r.ctaPrimary.href} className={BTN_PRIMARY}>
                {r.ctaPrimary.label}
                <ArrowUpRight />
              </Link>
              <BookCallButton location={`region-${slug}`} className={BTN_SECONDARY}>
                {r.ctaSecondary.label}
              </BookCallButton>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start pt-2">
              {r.chips.map((chip) => (
                <span key={chip} className={PILL}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* WHY enhc for [region] */}
        <Reveal as="section" className={SECTION}>
          <div className="max-w-6xl mx-auto">
            <h2 className={H2}>Why enhc for {r.breadcrumbLabel}</h2>
            <ul className="grid gap-5 md:grid-cols-2 mt-10">
              {r.whyBullets.map((b) => (
                <li key={b} className={`${CARD} flex gap-4`}>
                  <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-[var(--brand-accent)]" aria-hidden="true" />
                  <span className="text-[var(--text-main)]/90 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* SERVICES strip — links to the existing service routes */}
        <Reveal as="section" className={SECTION}>
          <div className="max-w-6xl mx-auto">
            <h2 className={H2}>AI services for {r.breadcrumbLabel} teams</h2>
            <p className="mt-3 text-[var(--text-muted)] max-w-2xl">
              Senior AI engineering across the stack — pick a capability or scope a full build.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
              {REGION_SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={`${CARD} flex items-center justify-between hover:border-[var(--brand-primary)]/60 transition-colors group`}
                >
                  <span className="font-semibold text-[var(--text-main)]">{s.name}</span>
                  <span className="text-[var(--brand-accent)] transition-transform group-hover:translate-x-1">
                    <ArrowUpRight />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/project" className="inline-flex items-center gap-2 text-[var(--brand-accent)] font-medium hover:underline">
                See our selected work
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* COMPLIANCE / TIMEZONE / CURRENCY band */}
        <Reveal as="section" className={SECTION}>
          <div className="max-w-6xl mx-auto">
            <h2 className={H2}>How we work with {r.breadcrumbLabel} teams</h2>
            <div className="grid gap-6 md:grid-cols-3 mt-10">
              <div className={CARD}>
                <h3 className="font-semibold text-lg text-[var(--text-main)]">Security &amp; compliance</h3>
                <p className="mt-3 text-[var(--text-muted)] leading-relaxed">{r.complianceLine}</p>
              </div>
              <div className={CARD}>
                <h3 className="font-semibold text-lg text-[var(--text-main)]">Timezone overlap</h3>
                <p className="mt-3 text-[var(--text-muted)] leading-relaxed">{r.timezoneLine}</p>
              </div>
              <div className={CARD}>
                <h3 className="font-semibold text-lg text-[var(--text-main)]">Transparent pricing</h3>
                <p className="mt-3 text-[var(--text-muted)] leading-relaxed">{r.currencyLine}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* FAQ — native <details> so it works without client JS and answers ship in HTML */}
        <Reveal as="section" className={SECTION}>
          <div className="max-w-3xl mx-auto">
            <h2 className={H2}>Frequently asked questions</h2>
            <div className="mt-10 space-y-4">
              {r.faqs.map((f) => (
                <details key={f.q} className={`${CARD} group`}>
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[var(--text-main)] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="shrink-0 text-xl leading-none text-[var(--brand-accent)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-[var(--text-muted)] leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>

        {/* FINAL CTA band */}
        <Reveal as="section" className="px-6 md:px-12 py-16 md:py-24 border-t border-[var(--border-main)]">
          <div className="max-w-4xl mx-auto text-center bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl p-10 md:p-14">
            <h2 className={H2}>Ready to build with a senior AI team?</h2>
            <p className="mt-4 text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              Tell us what you&rsquo;re building — we&rsquo;ll scope it on a free discovery call and map out delivery, security and pricing for your region.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link href={r.ctaPrimary.href} className={BTN_PRIMARY}>
                {r.ctaPrimary.label}
                <ArrowUpRight />
              </Link>
              <BookCallButton location={`region-${slug}`} className={BTN_SECONDARY}>
                {r.ctaSecondary.label}
              </BookCallButton>
            </div>
            <p className="mt-6 text-sm text-[var(--text-muted)]">
              {r.timezoneLine} · {r.currencyLine}
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
      <JsonLd data={jsonLd} />
    </>
  );
}
