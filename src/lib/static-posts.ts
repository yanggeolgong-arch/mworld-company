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
    slug: 'jeju-restaurant-concept',
    title: '제주맛집 성공의 비밀, 컨셉이 없으면 아무리 맛있어도 망합니다',
    description: '제주맛집 사장님의 진짜 고민과 해결책. 컨셉 없이 광고만 하는 맛집이 왜 망하는지, 10년 이상 실행 업무 전문가가 초등학생도 이해할 수 있게 설명합니다.',
    date: '2026-02-04',
    category: '광고 전 컨셉 점검',
    categorySlug: 'brand-concept',
    excerpt: '제주맛집이 성공하려면 맛만 좋다고 되는 게 아닙니다. 컨셉이 있어야 합니다. 컨셉이 없으면 아무리 맛있어도 손님이 안 오고, 광고비만 낭비됩니다. 컨셉이 있으면 손님이 3초 안에 이해하고, 기억하고, 추천하고, 다시 옵니다.',
  },
  {
    slug: 'insta-shortform',
    title: '제주맛집 인스타그램 마케팅 - 당신의 숏폼이 조회수 0인 진짜 이유',
    description: '제주맛집 인스타그램·숏폼이 조회수 0인 이유와 해결책. 릴스 20개 촬영·제작·배포 등 실제 매출로 검증된 성공 사례 노하우를 적용한 인스타 마케팅 전략.',
    date: '2026-02-05',
    category: '인스타그램 마케팅 & 숏폼',
    categorySlug: 'insta-shortform',
    excerpt: '당신의 숏폼이 조회수 0인 이유는 알고리즘이 원하는 훅·흐름·가치를 주지 않았기 때문입니다. 성공 사례 1번(릴스 20개 촬영+제작+배포) 노하우를 그대로 적용해 드립니다.',
  },
  {
    slug: 'brand-concept',
    title: '구글 상위 노출의 시작, 광고 전 \'컨셉 점검\'이 필수인 진짜 이유',
    description: '광고 집행 전 브랜드 컨셉 점검의 중요성과 구글 상위 노출을 위한 필수 체크리스트. 10년 이상 실행 업무 전문가가 공개하는 컨셉 개발의 본질.',
    date: '2026-02-04',
    category: '광고 전 컨셉 점검',
    categorySlug: 'brand-concept',
    excerpt: '컨셉이 명확하지 않은 상태에서 광고를 집행하는 것은 지도 없이 길을 나서는 것과 같습니다. 구글 상위 노출을 위한 컨셉 점검 체크리스트와 시맨틱 DNA 설계의 기초를 공개합니다.',
  },
  {
    slug: '1인-기업-알고리즘-확산-시장-장악-로드맵',
    title: '1인 기업의 알고리즘 확산 점유 로드맵',
    description: '네이버 플레이스 컨디션 진단법부터 AI 자동화 파이프라인 구축까지, 1인 기업이 대행사를 압도하는 기술적 SEO 전략을 공개합니다.',
    date: '2026-02-04',
    category: '플레이스 알고리즘',
    categorySlug: 'place-algorithm',
    excerpt: '네이버 플레이스 컨디션 판단 5가지 핵심 지표, AI 기반 하루 1시간 알고리즘 데이터 분석 프로세스, 매체사 트래픽 단가 할인 및 실행사 직거래 원가 절감 메커니즘을 상세히 공개합니다.',
  },
  {
    slug: 'ai-1인-기업-10명-대행사-압도',
    title: 'AI로 무장한 1인 기업이 10명 규모의 대행사를 압도하는 법',
    description: '일손은 부족하고 매출은 정체된 1인 대표의 고충을 해결하는 AI 자동화 파이프라인 구축 전략. 10년 이상 실행 업무 노하우와 AI 기술을 결합한 1:1 비공개 마스터 클래스.',
    date: '2026-02-05',
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
