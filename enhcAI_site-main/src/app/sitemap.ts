// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE_URL, toIso } from '@/lib/seo';
import projectData from '@/data/projectData';
import { blogData } from '@/data/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static, indexable routes with priority hints.
  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/industries', priority: 0.8, freq: 'monthly' },
    { path: '/customeAIsolution', priority: 0.8, freq: 'monthly' },
    { path: '/machinelearningmodel', priority: 0.8, freq: 'monthly' },
    { path: '/AIautomation', priority: 0.8, freq: 'monthly' },
    { path: '/predictiveAnalytics', priority: 0.8, freq: 'monthly' },
    { path: '/AIstatergy', priority: 0.8, freq: 'monthly' },
    { path: '/web-development', priority: 0.8, freq: 'monthly' },
    { path: '/app-development', priority: 0.8, freq: 'monthly' },
    { path: '/about', priority: 0.7, freq: 'monthly' },
    { path: '/company-overview', priority: 0.6, freq: 'monthly' },
    { path: '/project', priority: 0.8, freq: 'weekly' },
    { path: '/blogs', priority: 0.7, freq: 'weekly' },
    { path: '/contact', priority: 0.7, freq: 'yearly' },
    { path: '/startproject', priority: 0.6, freq: 'yearly' },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  // Dynamic project case studies — lastmod from the project year (coarse but
  // stable across rebuilds) rather than the build timestamp.
  for (const project of projectData) {
    const year = Number(project.year);
    entries.push({
      url: `${SITE_URL}/project/${project.id}`,
      lastModified: year ? new Date(Date.UTC(year, 11, 31)) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Dynamic blog posts — lastmod from each post's real publish date when known,
  // so the lastmod signal is trustworthy instead of "everything changed at build".
  for (const id of Object.keys(blogData)) {
    const iso = toIso(blogData[Number(id)]?.publishDate);
    entries.push({
      url: `${SITE_URL}/blogs/${id}`,
      lastModified: iso ?? now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  return entries;
}
