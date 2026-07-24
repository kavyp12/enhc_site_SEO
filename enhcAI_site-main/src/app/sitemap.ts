// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE_URL, toIso, clampLastmod } from '@/lib/seo';
import projectData from '@/data/projectData';
import { blogData } from '@/data/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static, indexable routes with priority hints.
  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/us', priority: 0.9, freq: 'monthly' },
    { path: '/europe', priority: 0.9, freq: 'monthly' },
    { path: '/middle-east', priority: 0.9, freq: 'monthly' },
    { path: '/industries', priority: 0.8, freq: 'monthly' },
    { path: '/custom-ai-solutions', priority: 0.8, freq: 'monthly' },
    { path: '/machinelearningmodel', priority: 0.8, freq: 'monthly' },
    { path: '/AIautomation', priority: 0.8, freq: 'monthly' },
    { path: '/predictiveAnalytics', priority: 0.8, freq: 'monthly' },
    { path: '/ai-strategy', priority: 0.8, freq: 'monthly' },
    { path: '/web-development', priority: 0.8, freq: 'monthly' },
    { path: '/app-development', priority: 0.8, freq: 'monthly' },
    { path: '/about', priority: 0.7, freq: 'monthly' },
    { path: '/company-overview', priority: 0.6, freq: 'monthly' },
    { path: '/project', priority: 0.8, freq: 'weekly' },
    { path: '/blogs', priority: 0.7, freq: 'weekly' },
    { path: '/contact', priority: 0.7, freq: 'yearly' },
    { path: '/book', priority: 0.8, freq: 'monthly' },
    { path: '/startproject', priority: 0.6, freq: 'yearly' },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  // Dynamic project case studies — lastmod derived from the project year, then
  // clamped to [launch, now] so a 2024 project can't claim a pre-launch date and
  // a 2026 project can't claim a future one (the raw Dec-31-of-year value did both).
  for (const project of projectData) {
    const year = Number(project.year);
    entries.push({
      url: `${SITE_URL}/project/${project.id}`,
      lastModified: year ? clampLastmod(new Date(Date.UTC(year, 11, 31)), now) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Dynamic blog posts — lastmod from each post's real publish date when known,
  // clamped to [launch, now] so a pre-launch publish date (or any future one)
  // never leaks into <lastmod> for a URL that didn't exist yet.
  for (const id of Object.keys(blogData)) {
    const iso = toIso(blogData[Number(id)]?.publishDate);
    entries.push({
      url: `${SITE_URL}/blogs/${id}`,
      lastModified: iso ? clampLastmod(new Date(iso), now) : now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  return entries;
}
