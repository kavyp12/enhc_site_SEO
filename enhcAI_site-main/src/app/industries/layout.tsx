import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Industries We Serve — AI & Software Solutions by Sector',
  description:
    'enhc builds AI-first IT solutions for healthcare, real estate, education, logistics and finance — see how our AI and software solve problems in your sector.',
  path: '/industries',
  keywords: [
    'AI solutions by industry',
    'healthcare AI software',
    'real estate AI solutions',
    'education technology development',
    'logistics AI automation',
    'fintech software development',
    'industry specific software',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'Industry AI & Software Solutions',
            name: 'Industry Solutions',
            path: '/industries',
            description:
              'AI-first IT solutions tailored to specific industries including healthcare, real estate, education, transportation & logistics, and accounting & finance.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
