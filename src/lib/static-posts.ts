/**
 * 정적 블로그 포스트 목록
 * MDX 파일이나 정적 페이지로 만든 포스트들을 관리
 */

export interface StaticPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  categorySlug: string;
  featuredImage?: string;
  excerpt?: string;
}

/**
 * 정적 블로그 포스트 목록
 */
/** 정적 포스트: 블로그 리스트 노출용. 1person-agency-algorithm-spread.mdx 스키마와 대응 */
export const staticPosts: StaticPost[] = [
  {
    slug: '1인-기업-알고리즘-확산-시장-장악-로드맵',
    title: '1인 기업의 알고리즘 확산 점유 로드맵',
    description: '네이버 플레이스 컨디션 진단법부터 AI 자동화 파이프라인 구축까지, 1인 기업이 대행사를 압도하는 기술적 SEO 전략을 공개합니다.',
    date: '2026-01-27',
    category: '플레이스 알고리즘',
    categorySlug: 'place-algorithm',
    excerpt: '네이버 플레이스 컨디션 판단 5가지 핵심 지표, AI 기반 하루 1시간 알고리즘 데이터 분석 프로세스, 매체사 트래픽 단가 할인 및 실행사 직거래 원가 절감 메커니즘을 상세히 공개합니다.',
  },
  {
    slug: 'ai-1인-기업-10명-대행사-압도',
    title: 'AI로 무장한 1인 기업이 10명 규모의 대행사를 압도하는 법',
    description: '일손은 부족하고 매출은 정체된 1인 대표의 고충을 해결하는 AI 자동화 파이프라인 구축 전략. 10년 이상 실행 업무 노하우와 AI 기술을 결합한 1:1 비공개 마스터 클래스.',
    date: '2026-01-27',
    category: '광고대행사 창업',
    categorySlug: 'ad-agency-startup',
    excerpt: 'AI 자동화 파이프라인을 통해 1인 기업이 10명 규모의 대행사를 압도하는 전략을 공개합니다. StoryBrand, Cialdini, Berger의 마스터 지침을 적용한 실전 로드맵.',
  },
];

/**
 * 모든 정적 포스트 가져오기
 */
export function getAllStaticPosts(): StaticPost[] {
  return staticPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 카테고리별 정적 포스트 가져오기
 */
export function getStaticPostsByCategory(categorySlug: string): StaticPost[] {
  return staticPosts
    .filter((post) => post.categorySlug === categorySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 슬러그로 정적 포스트 가져오기
 */
export function getStaticPostBySlug(slug: string): StaticPost | undefined {
  return staticPosts.find((post) => post.slug === slug);
}
