import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';
import { SERVICE_FAQS } from '@/data/serviceFaqs';

export const metadata = buildMetadata({
  title: 'AI Consulting & Strategy Services | enhc',
  description:
    'Strategic guidance for AI transformation. enhc helps organisations worldwide identify high-value AI opportunities and build a clear roadmap to adopt AI with confidence — global delivery from our Ahmedabad, India HQ.',
  path: '/AIstatergy',
  keywords: ['AI strategy', 'AI consulting', 'AI transformation', 'AI roadmap', 'digital transformation'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'AI Consulting',
            name: 'AI Strategy & Consulting',
            path: '/AIstatergy',
            description:
              'AI strategy and consulting — opportunity assessment, roadmap and adoption planning — to help organisations adopt AI with confidence.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'AI Strategy & Consulting', path: '/AIstatergy' },
          ]),
          faqJsonLd(SERVICE_FAQS['AIstatergy'].faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      {children}
    </>
  );
}
