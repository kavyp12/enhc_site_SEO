// src/app/components/GlobalReach.tsx
// SERVER component (no "use client"): renders the homepage's internal links to
// the region + machine-learning pages. These were the audit's orphan pages —
// "URL is unknown to Google" because nothing linked to them. Being a server
// component, every <a> here ships in the server-rendered HTML (not injected
// after hydration), so a crawler reading the raw homepage source finds all four.
// Descriptive anchor text (not "click here") passes topical context to each page.
import Link from 'next/link';

const LINKS = [
  {
    href: '/us',
    anchor: 'AI development for US businesses',
    blurb: 'Senior AI engineering with ET/PT timezone overlap and full IP ownership.',
  },
  {
    href: '/europe',
    anchor: 'GDPR-ready AI development for Europe & the UK',
    blurb: 'GDPR-compliant delivery with EU data-residency options and GMT/CET overlap.',
  },
  {
    href: '/middle-east',
    anchor: 'AI development for the UAE, Saudi Arabia & the Gulf',
    blurb: 'Vision 2030-aligned builds with full GST working-hours overlap.',
  },
  {
    href: '/machinelearningmodel',
    anchor: 'Custom machine learning model development',
    blurb: 'Production-grade ML — data prep, training, deployment and MLOps.',
  },
];

export default function GlobalReach() {
  return (
    <section
      aria-labelledby="global-reach-heading"
      className="px-6 md:px-12 py-16 md:py-24 border-t border-[var(--border-main)] bg-[var(--bg-main)]"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="global-reach-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-main)]"
        >
          Where we work
        </h2>
        <p className="mt-3 text-[var(--text-muted)] max-w-2xl">
          enhc is an AI development partner for teams worldwide. Explore how we deliver in your region,
          or dive straight into our machine learning capability.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2 mt-10">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group block h-full rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-6 transition-colors hover:border-[var(--brand-primary)]/60 hover:bg-[var(--bg-card-secondary)]"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-[var(--text-main)]">{l.anchor}</span>
                  <span
                    aria-hidden="true"
                    className="text-[var(--brand-accent)] transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
                <span className="mt-2 block text-sm text-[var(--text-muted)] leading-relaxed">
                  {l.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
