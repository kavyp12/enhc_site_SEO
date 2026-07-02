import { buildMetadata, webPageJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';
import { contactFaq } from './faqData';

export const metadata = buildMetadata({
  title: 'Contact enhc — AI Studio in Ahmedabad',
  description:
    'Get in touch with enhc. Visit our Ahmedabad studio at Shivalik Shilp, email contact@enhc.tech or call +91 9313153036 to discuss your AI, web or app project.',
  path: '/contact',
  keywords: ['contact enhc', 'AI company contact', 'Ahmedabad AI studio'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            type: 'ContactPage',
            name: 'Contact enhc',
            path: '/contact',
            description:
              'Contact enhc (Enhc Tech LLP), an AI-first IT solutions company in Ahmedabad, India.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          faqJsonLd(contactFaq),
        ]}
      />
      {children}
    </>
  );
}
