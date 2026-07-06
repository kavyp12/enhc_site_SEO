// src/lib/calendly-events.ts
// Client-only helpers for the Calendly integration:
//  - lazy-load the Calendly assets on demand (never on page load)
//  - a single, ref-counted window "message" listener that fires a
//    `book_call_scheduled` analytics event when a booking completes.
// Imported only by client components (BookCallButton, CalendlyInline).
import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget?: (options: { url: string; parentElement: HTMLElement }) => void;
    };
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CAL_JS = 'https://assets.calendly.com/assets/external/widget.js';
const CAL_CSS = 'https://assets.calendly.com/assets/external/widget.css';

let loadPromise: Promise<void> | null = null;

/**
 * Inject Calendly's widget.js + widget.css once, on demand. Resolves when the
 * script is ready. Safe to call many times (deduped). Never called at module
 * load, so it never touches the homepage's critical path.
 */
export function loadCalendlyAssets(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve) => {
    if (!document.querySelector(`link[href="${CAL_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CAL_CSS;
      document.head.appendChild(link);
    }
    const existing = document.querySelector(`script[src="${CAL_JS}"]`) as HTMLScriptElement | null;
    if (existing) {
      if (window.Calendly) resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = CAL_JS;
    script.async = true;
    script.addEventListener('load', () => resolve(), { once: true });
    // Don't hang forever if the script is blocked (CSP) or fails to load —
    // reset so a later interaction can retry.
    script.addEventListener('error', () => {
      loadPromise = null;
      resolve();
    }, { once: true });
    document.body.appendChild(script);
  });
  return loadPromise;
}

// ---- Analytics: fire once per completed booking, attributed to the CTA ----

let activeLocation = 'unknown';

/** Record which CTA opened the scheduler so the completion event is attributed. */
export function setActiveBookingLocation(location?: string): void {
  activeLocation = location || 'unknown';
}

let refCount = 0;
let handler: ((e: MessageEvent) => void) | null = null;

function isCalendlyEvent(e: MessageEvent): e is MessageEvent<{ event: string }> {
  return (
    !!e.data &&
    typeof e.data === 'object' &&
    typeof (e.data as { event?: unknown }).event === 'string' &&
    (e.data as { event: string }).event.indexOf('calendly.') === 0
  );
}

/**
 * Attach a single shared "message" listener (ref-counted across mounts, so
 * multiple booking buttons on a page never double-fire the analytics event).
 */
export function attachCalendlyTracking(): void {
  if (typeof window === 'undefined') return;
  refCount += 1;
  if (refCount > 1) return; // already attached by another mount

  handler = (e: MessageEvent) => {
    if (!isCalendlyEvent(e)) return;
    if (e.data.event !== 'calendly.event_scheduled') return;
    const params = {
      booking_location: activeLocation,
      utm_source: 'website',
      utm_medium: 'cta',
      utm_campaign: 'discovery_call',
      utm_content: activeLocation,
    };
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'book_call_scheduled', params);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'book_call_scheduled', ...params });
  };
  window.addEventListener('message', handler);
}

export function detachCalendlyTracking(): void {
  if (typeof window === 'undefined') return;
  refCount = Math.max(0, refCount - 1);
  if (refCount === 0 && handler) {
    window.removeEventListener('message', handler);
    handler = null;
  }
}

/** Hook: attach the shared tracker on mount, detach on unmount. */
export function useCalendlyTracking(): void {
  useEffect(() => {
    attachCalendlyTracking();
    return () => detachCalendlyTracking();
  }, []);
}
