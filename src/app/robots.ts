import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.aijeju.co.kr';

/** 공양걸AI연구소 | Gong Yang-geol AI Lab - 동적 robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
