import { buildMetadata, webPageJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Company Overview — enhc AI & Software, Ahmedabad',
  description:
    'A closer look at enhc (Enhc Tech LLP): who we are, what we build and how our AI, web and app development work helps businesses grow.',
  path: '/company-overview',
  keywords: ['company overview', 'Enhc Tech LLP', 'AI company profile', 'AI company Ahmedabad'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            type: 'AboutPage',
            name: 'enhc Company Overview',
            path: '/company-overview',
            description:
              'Company overview of enhc (Enhc Tech LLP), an AI-first IT solutions company in Ahmedabad, India.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Company Overview', path: '/company-overview' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
