import { buildMetadata, webPageJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Our Work — AI Projects & Case Studies',
  description:
    'Explore enhc\'s portfolio of AI, machine learning, automation, web and app development projects and the measurable results we delivered for our clients.',
  path: '/project',
  keywords: ['AI projects', 'case studies', 'AI portfolio', 'machine learning projects'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            type: 'CollectionPage',
            name: 'enhc Work — AI Projects & Case Studies',
            path: '/project',
            description:
              'Portfolio of AI, machine learning, automation, web and app development case studies by enhc.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/project' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
