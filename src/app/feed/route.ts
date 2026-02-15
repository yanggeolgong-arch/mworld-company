import { NextResponse } from 'next/server';
import { getAllStaticPosts } from '@/lib/static-posts';

const BASE_URL = 'https://www.aijeju.co.kr';

/** 블로그 포스트 업데이트 시 RSS 피드 자동 생성 - 구글/네이버 뉴스 봇 수집용 */
export async function GET() {
  const posts = getAllStaticPosts();
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>공양걸AI연구소 알고리즘 확산 블로그</title>
    <link>${BASE_URL}/blog</link>
    <description>2026 베트남 다낭 맛집, 광고대행사 창업, 알고리즘 확산 실전 노하우</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed" rel="self" type="application/rss+xml"/>
    ${posts
      .slice(0, 20)
      .map(
        (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt || post.description}]]></description>
      <pubDate>${new Date(post.date + 'T00:00:00').toUTCString()}</pubDate>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
