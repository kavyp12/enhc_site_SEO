import type { Metadata } from 'next';
import projectData from '@/data/projectData';
import { buildMetadata, creativeWorkJsonLd, breadcrumbJsonLd, clampDescription } from '@/lib/seo';
import JsonLd from '@/app/components/JsonLd';

// Only real case-study ids are valid; unknown /project/<id> returns a 404
// instead of a thin, indexable soft-404 (200).
export const dynamicParams = false;

export function generateStaticParams() {
  return projectData.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const project = projectData.find((p) => p.id === id);
  if (!project) {
    return buildMetadata({
      title: 'Project',
      description: 'An AI, web or app development case study by enhc.',
      path: `/project/${id}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${project.title} — ${project.client}`,
    description:
      clampDescription(project.description) ||
      `${project.title}: a ${project.category} project delivered by enhc for ${project.client}.`,
    path: `/project/${project.id}`,
    image: project.images?.main || undefined,
    keywords: [project.category, project.client, 'case study', 'AI project'],
    ogType: 'article',
  });
}

export default async function ProjectLayout(
  { children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = projectData.find((p) => p.id === id);
  if (!project) return <>{children}</>;

  return (
    <>
      <JsonLd
        data={[
          creativeWorkJsonLd({
            id: project.id,
            name: project.title,
            description: project.description,
            category: project.category,
            year: project.year,
            image: project.images?.main,
            client: project.client,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/project' },
            { name: project.title, path: `/project/${project.id}` },
          ]),
        ]}
      />
      {children}
    </>
  );
}
