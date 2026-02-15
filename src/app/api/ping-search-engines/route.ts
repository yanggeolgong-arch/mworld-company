import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.aijeju.co.kr';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

const PING_URLS = [
  `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  `https://searchadvisor.naver.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
];

/** 배포 직후 Bing/Google/Naver에 sitemap 핑 전송. Deploy Hook 또는 cron에서 호출 */
export async function GET() {
  const results: Record<string, number> = {};
  for (const url of PING_URLS) {
    try {
      const res = await fetch(url, { method: 'GET', cache: 'no-store' });
      results[url] = res.status;
    } catch (e) {
      results[url] = 0;
    }
  }

  return NextResponse.json({
    message: 'Ping sent to search engines',
    sitemap: SITEMAP_URL,
    results,
  });
}
