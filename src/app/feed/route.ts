import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.aijeju.co.kr';

/** Reports 기반 RSS 피드 - Blog 제거 */
export async function GET() {
  const reports = [
    {
      title: 'Jeju Best 10',
      slug: 'jeju-best-10',
      description: 'AI-analyzed top 10 restaurants in Jeju Island. Data-driven culinary intelligence.',
      date: '2026-02-21',
    },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jeju Gourmet AI Research Lab - Research Reports</title>
    <link>${BASE_URL}/reports</link>
    <description>Data-Driven Culinary Intelligence for Jeju Island. We don't blog. We analyze.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed" rel="self" type="application/rss+xml"/>
    ${reports
      .map(
        (r) => `    <item>
      <title><![CDATA[${r.title}]]></title>
      <link>${BASE_URL}/reports/${r.slug}</link>
      <description><![CDATA[${r.description}]]></description>
      <pubDate>${new Date(r.date + 'T00:00:00').toUTCString()}</pubDate>
      <guid isPermaLink="true">${BASE_URL}/reports/${r.slug}</guid>
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
