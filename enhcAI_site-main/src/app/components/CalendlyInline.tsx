'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { buildCalendlyUrl } from '@/lib/booking';
import { setActiveBookingLocation, useCalendlyTracking } from '@/lib/calendly-events';

/**
 * Calendly INLINE embed for the /book page. Loading widget.js here (afterInteractive)
 * is fine because scheduling IS the page's purpose. Calendly auto-detects the
 * visitor's local timezone.
 */
export default function CalendlyInline({ location = 'book-page' }: { location?: string }) {
  useCalendlyTracking();

  useEffect(() => {
    setActiveBookingLocation(location);
  }, [location]);

  const url = buildCalendlyUrl({
    utmSource: 'website',
    utmMedium: 'inline',
    utmCampaign: 'discovery_call',
    utmContent: location,
  });

  return (
    <>
      {/* React 19 hoists this <link> into <head>. */}
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <div
        className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
        data-url={url}
        style={{ minWidth: '320px', minHeight: '700px', height: '72vh' }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </>
  );
}
