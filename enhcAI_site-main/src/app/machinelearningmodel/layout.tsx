import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

export const metadata = buildMetadata({
  title: 'Machine Learning Development Company in India',
  description:
    'Advanced machine learning models that learn and adapt to your data. enhc builds, trains, deploys and maintains production-grade ML systems tailored to your business goals.',
  path: '/machinelearningmodel',
  keywords: ['machine learning models', 'ML development company', 'model training', 'MLOps', 'deep learning', 'machine learning company India'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            serviceType: 'Machine Learning Development',
            name: 'Machine Learning Model Development',
            path: '/machinelearningmodel',
            description:
              'Custom machine learning models — data preparation, training, deployment and MLOps — built and maintained by enhc for production use.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'Machine Learning Development', path: '/machinelearningmodel' },
          ]),
        ]}
      />
      {children}
    </>
  );
}
