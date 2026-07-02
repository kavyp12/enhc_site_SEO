import { buildMetadata, webPageJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Services — AI, Automation, Software, Web, Mobile & Cloud',
  description:
    'enhc is an AI-first IT solutions company. Explore our full range of services: custom AI software, AI agents and chatbots, automation, machine learning, predictive analytics, web and mobile apps, ERP, CRM, SaaS, cloud and IT consulting.',
  path: '/services',
  keywords: ['AI software development', 'IT solutions company', 'custom software development', 'AI automation services', 'ERP development', 'CRM development', 'SaaS development', 'web and app development', 'AI consulting'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            type: 'CollectionPage',
            name: 'enhc Services',
            path: '/services',
            description:
              'The full range of AI, automation, software, web, mobile and cloud services offered by enhc.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
