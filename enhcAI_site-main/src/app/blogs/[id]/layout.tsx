import type { Metadata } from 'next';
import { blogData } from '@/data/blogData';
import { buildMetadata, blogPostingJsonLd, breadcrumbJsonLd, toIso } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

// Only the known posts are valid; any other /blogs/<id> returns a real 404
// instead of a thin, indexable soft-404 (200) that self-canonicalizes.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(blogData).map((id) => ({ id }));
}

// toIso (human date -> ISO) is imported from '@/lib/seo', shared with sitemap.ts.

function postTitle(post: (typeof blogData)[number]): string {
  return [post.title, post.subtitle].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}

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
  const date = toIso(post.publishDate);
  return buildMetadata({
    title: postTitle(post),
    description: postTitle(post).slice(0, 200),
    path: `/blogs/${id}`,
    image: post.heroImage || undefined,
    keywords: ['AI', 'machine learning', 'data science', post.title],
    ogType: 'article',
    publishedTime: date,
    modifiedTime: date,
    authors: post.author?.name ? [post.author.name] : undefined,
  });
}

export default async function BlogPostLayout(
  { children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = blogData[Number(id)];
  if (!post) return <>{children}</>;

  const date = toIso(post.publishDate);

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd({
            id,
            title: postTitle(post),
            description: postTitle(post).slice(0, 200),
            image: post.heroImage,
            authorName: post.author?.name,
            authorRole: post.author?.role,
            datePublished: date,
            dateModified: date,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blogs' },
            { name: post.title, path: `/blogs/${id}` },
          ]),
        ]}
      />
      {children}
    </>
  );
}
