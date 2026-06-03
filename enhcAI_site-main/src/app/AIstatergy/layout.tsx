import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: 'AI Strategy & Consulting',
  description:
    'Strategic guidance for AI transformation. enhc helps you identify high-value AI opportunities and build a clear roadmap to adopt AI across your organisation.',
  path: '/AIstatergy',
  keywords: ['AI strategy', 'AI consulting', 'AI transformation', 'AI roadmap', 'digital transformation'],
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
