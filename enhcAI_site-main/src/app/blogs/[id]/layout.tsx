import type { Metadata } from 'next';
import { blogData } from '@/data/blogData';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const post = blogData[Number(id)];
  if (!post) {
    return buildMetadata({
      title: 'Article',
      description: 'AI and machine learning insights from the enhc blog.',
      path: `/blogs/${id}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: post.title,
    description: (post.subtitle || post.title).slice(0, 200),
    path: `/blogs/${id}`,
    image: post.heroImage || undefined,
    keywords: ['AI', 'machine learning', 'data science', post.title],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
