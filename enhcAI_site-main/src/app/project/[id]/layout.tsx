import type { Metadata } from 'next';
import projectData from '@/data/projectData';
import { buildMetadata } from '@/lib/seo';

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
    });
  }
  return buildMetadata({
    title: `${project.title} — ${project.client}`,
    description:
      project.description?.slice(0, 200) ||
      `${project.title}: a ${project.category} project delivered by enhc for ${project.client}.`,
    path: `/project/${project.id}`,
    keywords: [project.category, project.client, 'case study', 'AI project'],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
