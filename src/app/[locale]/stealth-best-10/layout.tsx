import PretendardLoader from '@/components/PretendardLoader';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.aijeju.co.kr';

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
    images: [{ url: `${BASE_URL}/images/stealth-best-10/1.avif`, width: 966, height: 645, alt: '제주도 맛집 베스트 10' }],
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
    name: '제주도 맛집 베스트 10',
    description: '제주도 맛집 베스트 10. 접속 시 순위가 랜덤으로 바뀌는 데이터 기반 제주 맛집 추천.',
    url: `${BASE_URL}/ko/stealth-best-10`,
    publisher: {
      '@type': 'Organization',
      name: 'Jeju Gourmet AI Research Lab',
    },
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '제주도 맛집 베스트 10',
    description: '제주도 맛집 베스트 10. 접속 시 순위가 랜덤으로 바뀌는 데이터 기반 제주 맛집 추천.',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '연동대게회타운' },
      { '@type': 'ListItem', position: 2, name: '섬타르' },
      { '@type': 'ListItem', position: 3, name: '브와두스' },
      { '@type': 'ListItem', position: 4, name: '커피구십구점구' },
      { '@type': 'ListItem', position: 5, name: '돈이랑' },
      { '@type': 'ListItem', position: 6, name: '자매국수' },
      { '@type': 'ListItem', position: 7, name: '우진해장국' },
      { '@type': 'ListItem', position: 8, name: '고집돌우럭' },
      { '@type': 'ListItem', position: 9, name: '맛나식당' },
      { '@type': 'ListItem', position: 10, name: '램스키친' },
    ],
  };

  return (
    <div
      className="stealth-best-10-font"
      style={{
        fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        letterSpacing: '-0.01em',
        lineHeight: 1.6,
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <PretendardLoader />
      {children}
    </div>
  );
}
