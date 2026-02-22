import type { MetadataRoute } from 'next';
import { REPORTS } from '@/lib/reports';

const BASE_URL = 'https://www.aijeju.co.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  const reportEntries: MetadataRoute.Sitemap = REPORTS.map((r) => ({
    url: BASE_URL + `/reports/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const enReportEntries: MetadataRoute.Sitemap = [
    'gourmet',
    'cafe',
    'stay',
  ].map((slug) => ({
    url: BASE_URL + `/en/reports/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = [
    { slug: 'haedong-yonggungsa-global-data-guide', priority: 0.7 },
  ].map(({ slug, priority }) => ({
    url: BASE_URL + `/en/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }));

  return [
    {
      url: BASE_URL + '/',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: BASE_URL + '/reports',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...reportEntries,
    ...enReportEntries,
    ...blogEntries,
  ];
}
