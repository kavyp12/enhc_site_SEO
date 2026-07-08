import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';
import { SERVICE_FAQS } from '@/data/serviceFaqs';

export const metadata = buildMetadata({
  title: 'AI Automation Services | enhc',
  description:
    'Streamline operations with intelligent automation. enhc designs AI workflows that cut manual work, reduce errors and scale your processes — global delivery from our Ahmedabad, India HQ.',
  path: '/AIautomation',
  keywords: ['AI automation', 'AI workflows', 'business process automation', 'intelligent automation', 'workflow automation'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'AI Automation',
            name: 'AI Automation & Intelligent Workflows',
            path: '/AIautomation',
            description:
              'Intelligent process automation and AI agents that remove repetitive manual work and scale business workflows, built by enhc.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'AI Automation', path: '/AIautomation' },
          ]),
          faqJsonLd(SERVICE_FAQS['AIautomation'].faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      {children}
    </>
  );
}
