import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.aijeju.co.kr';

/** Jeju Gourmet AI Research Lab */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/stealth-best-3'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/stealth-best-3'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/stealth-best-3'],
      },
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/stealth-best-3'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
