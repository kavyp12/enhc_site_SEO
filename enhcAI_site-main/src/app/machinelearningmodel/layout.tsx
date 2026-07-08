import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';
import { SERVICE_FAQS } from '@/data/serviceFaqs';

export const metadata = buildMetadata({
  title: 'Machine Learning Development Services | enhc',
  description:
    'Advanced machine learning models that learn and adapt to your data. enhc builds, trains, deploys and maintains production-grade ML systems for clients worldwide, with global delivery from our Ahmedabad, India HQ.',
  path: '/machinelearningmodel',
  keywords: ['machine learning models', 'ML development company', 'model training', 'MLOps', 'deep learning', 'machine learning development services'],
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
          faqJsonLd(SERVICE_FAQS['machinelearningmodel'].faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      {children}
    </>
  );
}
