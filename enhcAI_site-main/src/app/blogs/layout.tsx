import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

// Note: this layout also wraps /blogs/[id] posts, so it only carries the
// listing's metadata. The CollectionPage + BreadcrumbList JSON-LD live in
// blogs/page.tsx so individual posts don't inherit a CollectionPage node.
export const metadata: Metadata = buildMetadata({
  title: 'AI & Software Insights Blog',
  description:
    'Insights, tutorials and industry perspective on artificial intelligence, machine learning, AI automation, data science and software engineering from the team at enhc in Ahmedabad, India.',
  path: '/blogs',
  keywords: [
    'AI blog',
    'machine learning blog',
    'AI automation insights',
    'data science articles',
    'enhc blog',
  ],
});

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
