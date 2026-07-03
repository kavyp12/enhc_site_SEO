import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Our Work — AI Projects & Case Studies',
  description:
    'Explore enhc\'s portfolio of AI, machine learning, automation, web and app development projects and the measurable results we delivered for our clients.',
  path: '/project',
  keywords: ['AI projects', 'case studies', 'AI portfolio', 'machine learning projects'],
});

// This layout also wraps /project/[id] case studies, so it only carries the
// listing's metadata. The CollectionPage + BreadcrumbList JSON-LD live in
// project/page.tsx so individual case studies don't inherit a CollectionPage
// node (which would misclassify a detail page as a listing).
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
