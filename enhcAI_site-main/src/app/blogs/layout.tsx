import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'Blog — AI, Machine Learning & Data Insights',
  description:
    'Insights, tutorials and industry news on artificial intelligence, machine learning, data science and AI ethics from the team at enhc.',
  path: '/blogs',
  keywords: ['AI blog', 'machine learning blog', 'data science articles', 'AI insights'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
