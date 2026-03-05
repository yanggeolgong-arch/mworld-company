import { initialShops, buildRestaurantSchema, getYoutubeVideoId, BASE_URL } from '@/data/stealth-best-10';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '제주도 맛집 베스트 10 | Jeju Gourmet AI Research Lab',
  description: '제주도 맛집 베스트 10. 접속 시 순위가 랜덤으로 바뀌는 데이터 기반 제주 맛집 추천. Data-Driven Culinary Intelligence.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: `${BASE_URL}/ko/stealth-best-10`,
  },
  openGraph: {
    title: '제주도 맛집 베스트 10 | Jeju Gourmet AI Research Lab',
    description: '제주도 맛집 베스트 10. 접속 시 순위가 랜덤으로 바뀌는 데이터 기반 제주 맛집 추천.',
    url: `${BASE_URL}/ko/stealth-best-10`,
    type: 'website',
    siteName: 'Jeju Gourmet AI Research Lab',
    images: [{ url: `${BASE_URL}/images/stealth-best-10/1.avif`, width: 966, height: 645, alt: '제주도 맛집 베스트 10 - 연동대게회타운 대게회' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '제주도 맛집 베스트 10 | Jeju Gourmet AI Research Lab',
    description: '제주도 맛집 베스트 10. 접속 시 순위가 랜덤으로 바뀌는 데이터 기반 제주 맛집 추천.',
    images: [`${BASE_URL}/images/stealth-best-10/1.avif`],
  },
};

export default function StealthBest10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/ko/stealth-best-10#webpage`,
    name: '제주도 맛집 베스트 10',
    description: '제주도 맛집 베스트 10. 접속 시 순위가 랜덤으로 바뀌는 데이터 기반 제주 맛집 추천. 네이버 플레이스, 구글 플레이스 연동.',
    url: `${BASE_URL}/ko/stealth-best-10`,
    inLanguage: 'ko',
    publisher: {
      '@type': 'Organization',
      name: 'Jeju Gourmet AI Research Lab',
      url: BASE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      name: '제주도 맛집 베스트 10',
      description: '제주도 추천 맛집 10선. 대게, 흑돼지, 양갈비, 국수, 해산물 등.',
      numberOfItems: 10,
      itemListElement: initialShops.map((shop, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: buildRestaurantSchema(shop),
      })),
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '제주도 맛집 베스트 10', item: `${BASE_URL}/ko/stealth-best-10` },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '제주도 맛집 베스트 10은 어떻게 선정되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '데이터 기반으로 제주도 인기 맛집 10곳을 선정했습니다. 네이버 플레이스, 구글 플레이스 리뷰와 평점을 참고합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '제주 공항에서 맛집까지 어떻게 가나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '각 맛집마다 공항에서 차로 소요 시간과 버스 노선(100번, 200번, 202번, 600번 등) 정보를 제공합니다. 네이버 지도, 구글 지도 링크로 경로를 확인할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '맛집 메뉴 가격은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '각 맛집 상세 페이지에 대표 메뉴와 가격(예: 대게세트 180,000원~, 흑돼지 15,000원~)을 안내합니다. 정확한 가격은 방문 전 전화 문의를 권장합니다.',
        },
      },
    ],
  };

  const videoObjects = initialShops
    .filter((s) => getYoutubeVideoId(s.youtubeUrl))
    .map((shop) => {
      const videoId = getYoutubeVideoId(shop.youtubeUrl)!;
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: `${shop.name} 제주 맛집 후기`,
        description: shop.story,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        uploadDate: '2024-06-01',
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
        isFamilyFriendly: true,
        publisher: {
          '@type': 'Organization',
          name: 'Jeju Gourmet AI Research Lab',
        },
      };
    });

  return (
    <div
      className="stealth-best-10-font"
      style={{
        fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        letterSpacing: '-0.01em',
        lineHeight: 1.6,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
.stealth-card-container{display:grid;gap:20px}
.stealth-image-wrapper{width:100%;aspect-ratio:4/3;background:#f0f0f0;border-radius:12px;overflow:hidden}
.stealth-card{contain:content}
#stealth-best-10-header{contain:layout}
`,
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {videoObjects.map((vo, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vo) }} />
      ))}
      {children}
    </div>
  );
}
