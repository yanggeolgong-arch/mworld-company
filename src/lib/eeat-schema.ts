/**
 * E-E-A-T 강화용 JSON-LD 스키마
 * Person(분석가), AnalysisNewsArticle, Review 타입
 */

export const ARNAR_PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '공양걸',
  jobTitle: '공양걸AI연구소 수석 데이터 분석가 | Google SEO Specialist',
  url: 'https://www.aijeju.co.kr',
  description: '구글 SEO 로직 및 데이터 사이언스 전문가. 2026 베트남 다낭 맛집 전문 분석. 1,000개 이상의 키워드 상위 노출 전략 설계.',
};

export function createAnalysisNewsArticleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  keywords?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AnalysisNewsArticle',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: {
      '@type': 'Person',
      name: '공양걸',
      jobTitle: '공양걸AI연구소 수석 데이터 분석가 | Google SEO Specialist',
      url: 'https://www.aijeju.co.kr',
      description: '구글 SEO 로직 및 데이터 사이언스 전문가. 2026 베트남 다낭 맛집 전문 분석. 1,000개 이상의 키워드 상위 노출 전략 설계.',
    },
    publisher: {
      '@type': 'Organization',
      name: '공양걸AI연구소',
      logo: { '@type': 'ImageObject', url: 'https://www.aijeju.co.kr/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    ...(opts.image && { image: opts.image }),
    ...(opts.keywords && { keywords: opts.keywords }),
  };
}

/** 다낭맛집 5곳 추천에 대한 Review 스키마 */
export function createDanangReviewSchema(opts: {
  name: string;
  url: string;
  datePublished: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: opts.name,
    url: opts.url,
    datePublished: opts.datePublished,
    author: {
      '@type': 'Person',
      name: opts.authorName,
      jobTitle: '공양걸AI연구소 수석 데이터 분석가 | Google SEO Specialist',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    itemReviewed: {
      '@type': 'Place',
      name: '2026 베트남 다낭 맛집 추천 5곳 (목 식당·반미프엉·냐벱·포박 63·피자 4P\'s)',
      address: { '@type': 'PostalAddress', addressLocality: 'Da Nang', addressCountry: 'VN' },
    },
  };
}
