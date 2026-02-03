import type { MetadataRoute } from 'next';
import { getAllStaticPosts } from '@/lib/static-posts';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.aijeju.co.kr';

/** 주요 정적 경로 */
const STATIC_ROUTES = [
  '',
  '/strategy',
  '/growth-engine',
  '/success-cases',
  '/insights',
  '/partnership',
  '/blog',
] as const;

/** src/content/blog 내 MDX 파일에서 슬러그 목록 추출 (빌드 시점) */
function getMdxSlugs(): string[] {
  try {
    const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');
    if (!fs.existsSync(contentDir)) return [];
    const files = fs.readdirSync(contentDir);
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/i, ''));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route ? `${BASE_URL}${route}` : BASE_URL + '/',
    lastModified: now,
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : 0.9,
  }));

  const staticPosts = getAllStaticPosts();
  const blogFromStaticPosts: MetadataRoute.Sitemap = staticPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const mdxSlugs = getMdxSlugs();
  const existingSlugs = new Set(staticPosts.map((p) => p.slug));
  const blogFromMdx: MetadataRoute.Sitemap = mdxSlugs
    .filter((slug) => !existingSlugs.has(slug))
    .map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [...staticEntries, ...blogFromStaticPosts, ...blogFromMdx];
}
