import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'Machine Learning Model Development',
  description:
    'Advanced machine learning models that learn and adapt to your data. enhc builds, trains, deploys and maintains production-grade ML systems tailored to your business goals.',
  path: '/machinelearningmodel',
  keywords: ['machine learning models', 'ML development', 'model training', 'MLOps', 'deep learning'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
