import { buildMetadata, COMPANY } from '@/lib/seo';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import CalendlyInline from '@/app/components/CalendlyInline';

export const metadata = buildMetadata({
  title: 'Book a Discovery Call',
  description:
    'Book a free 30-minute discovery call with enhc — an AI development partner for the US, Europe & the Middle East. Times shown in your local timezone.',
  path: '/book',
});

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen">
        <section className="pt-32 pb-8 px-6 md:px-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Book a discovery call</h1>
          <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed">
            Pick a time that works for you — shown automatically in your timezone. Prefer email?{' '}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-[var(--brand-accent)] font-medium hover:underline"
            >
              {COMPANY.email}
            </a>
          </p>
        </section>
        <section className="px-4 md:px-12 pb-24 max-w-4xl mx-auto">
          <CalendlyInline location="book-page" />
        </section>
      </main>
      <Footer />
    </>
  );
}
