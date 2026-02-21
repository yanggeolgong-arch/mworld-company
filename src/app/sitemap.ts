import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.aijeju.co.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL + '/',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];
}
