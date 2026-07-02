import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Predictive Analytics Services in India',
  description:
    'Turn historical data into accurate forecasts. enhc builds predictive analytics that surface trends, anticipate behaviour and power better, data-driven decisions.',
  path: '/predictiveAnalytics',
  keywords: ['predictive analytics', 'data analytics', 'forecasting', 'data-driven decisions', 'business intelligence'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'Predictive Analytics',
            name: 'Predictive Analytics',
            path: '/predictiveAnalytics',
            description:
              'Predictive analytics and forecasting models that turn historical data into actionable, data-driven decisions, built by enhc.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'Predictive Analytics', path: '/predictiveAnalytics' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
