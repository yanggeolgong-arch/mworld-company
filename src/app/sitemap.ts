import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.aijeju.co.kr';

/** 주요 정적 경로 - Blog 제거, Reports 추가 */
const STATIC_ROUTES = [
  '',
  '/reports',
  '/reports/jeju-best-10',
  '/strategy',
  '/growth-engine',
  '/success-cases',
  '/insights',
  '/partnership',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return STATIC_ROUTES.map((route) => {
    const changeFreq: 'daily' | 'weekly' = route === '' ? 'daily' : 'weekly';
    return {
      url: route ? `${BASE_URL}${route}` : BASE_URL + '/',
      lastModified: now,
      changeFrequency: changeFreq,
      priority: route === '' ? 1 : 0.9,
    };
  });
}
