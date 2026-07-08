// src/app/components/ServiceFaq.tsx
// Reusable, SERVER-rendered FAQ block for service pages. Native <details> so the
// questions AND answers ship in the initial HTML — crawlable by Google and
// directly citable by AI answer engines (ChatGPT / Perplexity / AI Overviews)
// without any client JS.
//
// IMPORTANT: the `faqs` passed here MUST be the SAME array used to build the
// FAQPage JSON-LD in the page's layout.tsx (Google requires the visible FAQ
// content to match the structured data). Both read from src/data/serviceFaqs.ts.
import type { ServiceFaqContent } from '@/data/serviceFaqs';

const CARD = 'bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl p-6';

export default function ServiceFaq({
  intro,
  faqs,
  heading = 'Frequently asked questions',
}: ServiceFaqContent & { heading?: string }) {
  if (!faqs?.length) return null;
  return (
    <section className="bg-[var(--bg-main)] text-[var(--text-main)] px-6 md:px-12 py-20 lg:py-28 border-t border-[var(--border-main)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{heading}</h2>
        {intro ? (
          <p className="mt-4 text-[var(--text-muted)] text-lg leading-relaxed">{intro}</p>
        ) : null}
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className={`${CARD} group`}>
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold [&::-webkit-details-marker]:hidden">
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
    </section>
  );
}
