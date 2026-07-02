import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'AI Strategy & Consulting Services in India',
  description:
    'Strategic guidance for AI transformation. enhc helps you identify high-value AI opportunities and build a clear roadmap to adopt AI across your organisation.',
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
        ]}
      />
      {children}
    </>
  );
}
