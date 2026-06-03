import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'Predictive Analytics Services',
  description:
    'Turn historical data into accurate forecasts. enhc builds predictive analytics that surface trends, anticipate behaviour and power better, data-driven decisions.',
  path: '/predictiveAnalytics',
  keywords: ['predictive analytics', 'data analytics', 'forecasting', 'data-driven decisions', 'business intelligence'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
