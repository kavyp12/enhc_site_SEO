'use client';

import { useCallback } from 'react';
import { buildCalendlyUrl } from '@/lib/booking';
import { loadCalendlyAssets, setActiveBookingLocation, useCalendlyTracking } from '@/lib/calendly-events';

type Variant = 'glass' | 'primary' | 'dark' | 'outline';

// Reuses the exact button base + variants from hero.tsx so it matches the
// design system.
const BASE =
  'group relative overflow-hidden inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50';
const DEFAULT_SIZE = 'gap-3 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base';
const VARIANTS: Record<Variant, string> = {
  glass:
    'bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 hover:border-black/30 dark:hover:border-white/30 hover:shadow-lg',
  primary:
    'bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] hover:shadow-lg hover:shadow-[var(--brand-primary)]/30 border border-[var(--brand-primary)]',
  dark: 'bg-black/80 text-white border border-white/20 hover:bg-black hover:border-white/40 hover:shadow-lg',
  outline:
    'bg-transparent text-[var(--brand-primary)] border-2 border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-lg hover:shadow-[var(--brand-primary)]/30',
};

interface Props {
  children: React.ReactNode;
  /** Design-system variant (used when no `className` override is passed). */
  variant?: Variant;
  /** When set, fully controls the look (variant + default size are skipped). */
  className?: string;
  /** UTM attribution tag, e.g. "hero", "navbar", "region-us". */
  location?: string;
  /** Extra side-effect to run on click (e.g. close the mobile menu). */
  onClick?: () => void;
}

/**
 * Opens the Calendly scheduling POPUP. Calendly auto-detects the visitor's
 * timezone. Assets are lazy-loaded on first hover/focus/click, so this button
 * adds nothing to the homepage's critical path until a user interacts with it.
 */
export default function BookCallButton({ children, variant = 'primary', className, location = 'unknown', onClick }: Props) {
  useCalendlyTracking();

  const prefetch = useCallback(() => {
    void loadCalendlyAssets();
  }, []);

  const openPopup = useCallback(async () => {
    onClick?.();
    setActiveBookingLocation(location);
    await loadCalendlyAssets();
    const url = buildCalendlyUrl({
      utmSource: 'website',
      utmMedium: 'cta',
      utmCampaign: 'discovery_call',
      utmContent: location,
    });
    window.Calendly?.initPopupWidget({ url });
  }, [location, onClick]);

  const cls = className ? `${BASE} ${className}` : `${BASE} ${DEFAULT_SIZE} ${VARIANTS[variant]}`;

  return (
    <button
      type="button"
      onClick={openPopup}
      onMouseEnter={prefetch}
      onFocus={prefetch}
      aria-label="Book a discovery call"
      className={cls}
    >
      <span className="relative z-10">{children}</span>
      <svg
        className="w-4 h-4 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7h-7m7 0v7" />
      </svg>
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        aria-hidden="true"
      />
    </button>
  );
}
