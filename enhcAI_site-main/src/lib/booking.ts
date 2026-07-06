// src/lib/booking.ts
// Single source of truth for the Calendly booking link. Never hardcode the URL
// in components — always import CALENDLY_URL / buildCalendlyUrl from here.
// Pure (no DOM), so it is safe to import from server or client components.

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/enhc-tech/30min';

export type CalendlyUtm = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

/**
 * Append UTM params so we can attribute which CTA drove a booking.
 * NOTE: we deliberately do NOT append `hide_gdpr_banner` — we sell into the EU
 * and must keep Calendly's GDPR banner enabled.
 */
export function buildCalendlyUrl({
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
}: CalendlyUtm = {}): string {
  const url = new URL(CALENDLY_URL);
  if (utmSource) url.searchParams.set('utm_source', utmSource);
  if (utmMedium) url.searchParams.set('utm_medium', utmMedium);
  if (utmCampaign) url.searchParams.set('utm_campaign', utmCampaign);
  if (utmContent) url.searchParams.set('utm_content', utmContent);
  return url.toString();
}
