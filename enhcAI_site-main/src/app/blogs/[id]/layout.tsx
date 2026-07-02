import type { Metadata } from 'next';
import { blogData } from '@/data/blogData';
import { buildMetadata, blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

// Only the known posts are valid; any other /blogs/<id> returns a real 404
// instead of a thin, indexable soft-404 (200) that self-canonicalizes.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(blogData).map((id) => ({ id }));
}

const MONTHS: Record<string, string> = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

/** Parse a human date ("Updated on 17 Jul 2025") into ISO "2025-07-17". */
function toIso(input?: string): string | undefined {
  if (!input) return undefined;
  const m = input.match(/(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})/);
  if (!m) return undefined;
  const mm = MONTHS[m[2].slice(0, 3).toLowerCase()];
  if (!mm) return undefined;
  return `${m[3]}-${mm}-${m[1].padStart(2, '0')}`;
}

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
  return buildMetadata({
    title: postTitle(post),
    description: postTitle(post).slice(0, 200),
    path: `/blogs/${id}`,
    image: post.heroImage || undefined,
    keywords: ['AI', 'machine learning', 'data science', post.title],
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
