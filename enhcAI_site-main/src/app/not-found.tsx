import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

// Server component — App Router serves this with a real HTTP 404 status.
export default function NotFound() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/project', label: 'Our work' },
    { href: '/blogs', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
        This page could not be found.
      </h1>
      <p className="mt-4 max-w-md text-[var(--text-muted)] leading-relaxed">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Try one of these instead:
      </p>
      <nav className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className={
              i === 0
                ? 'rounded-full bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-bold text-white transition-transform duration-300 hover:scale-105'
                : 'rounded-full border border-[var(--border-main)] px-5 py-2.5 text-sm font-bold transition-colors hover:bg-[var(--bg-card)]'
            }
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
