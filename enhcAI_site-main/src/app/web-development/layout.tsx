import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Web Development Company in Ahmedabad — Next.js & React',
  description:
    'enhc builds fast, modern, SEO-friendly websites and web applications. Responsive sites, web apps, e-commerce and headless CMS using React, Next.js and TypeScript.',
  path: '/web-development',
  keywords: ['web development company', 'website development Ahmedabad', 'Next.js development', 'React development', 'web app development', 'e-commerce development'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'Web Development',
            name: 'Web Development',
            path: '/web-development',
            description:
              'Responsive websites, web applications, e-commerce stores and headless CMS builds with strong performance and SEO foundations, built by enhc.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'Web Development', path: '/web-development' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
