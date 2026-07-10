import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';
import { SERVICE_FAQS } from '@/data/serviceFaqs';

export const metadata = buildMetadata({
  // GSC (3-mo): every high-impression non-branded query for this page contains
  // "roadmap consulting" (ai strategy roadmap consulting usa / ai roadmap
  // consulting / ai implementation roadmap consultant — ~115 impressions at
  // pos 50-67). Title now matches that exact demand.
  title: 'AI Strategy & Roadmap Consulting',
  description:
    'AI strategy and roadmap consulting for US, European and global businesses. enhc assesses your data and AI readiness, ranks use cases by ROI, and delivers a phased AI implementation roadmap you can execute with confidence.',
  path: '/AIstatergy',
  keywords: ['AI strategy roadmap consulting', 'AI roadmap consulting', 'AI implementation roadmap', 'AI consulting', 'AI readiness assessment', 'AI transformation'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'AI Strategy & Roadmap Consulting',
            name: 'AI Strategy & Roadmap Consulting',
            path: '/AIstatergy',
            description:
              'AI strategy and roadmap consulting — readiness assessment, use cases ranked by ROI, and a phased AI implementation roadmap — to help organisations adopt AI with confidence.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'AI Strategy & Roadmap Consulting', path: '/AIstatergy' },
          ]),
          faqJsonLd(SERVICE_FAQS['AIstatergy'].faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      {children}
    </>
  );
}
