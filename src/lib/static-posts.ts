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
    slug: 'global-payment-dazhong-dianping',
    title: '제주맛집 글로벌 결제 & 따종디엔핑 전략 - 중국 관광객 현금을 거부하면 안 되는 진짜 이유',
    description: '중국 관광객에게 현금은 소비가 아니라 투자 자본이다. 알리페이·위챗 수용과 따종디엔핑 등록으로 제주맛집 매출을 높이는 10년 차 전문가 전략.',
    date: '2026-02-01',
    category: '따종디엔핑 공략',
    categorySlug: 'dazhong-dianping',
    excerpt: '알리페이를 거부하는 것은 그들의 투자 기회를 박탈하는 것. ICB·QRick 도입과 따종디엔핑 등록으로 중국인 손님과 재방문을 늘립니다.',
  },
  {
    slug: 'insta-shortform',
    title: '제주맛집 인스타그램 마케팅 - 당신의 숏폼이 조회수 0인 진짜 이유',
    description: '제주맛집 인스타그램·숏폼이 조회수 0인 이유와 해결책. 릴스 20개 촬영·제작·배포 등 실제 매출로 검증된 성공 사례 노하우를 적용한 인스타 마케팅 전략.',
    date: '2026-02-02',
    category: '인스타그램 마케팅 & 숏폼',
    categorySlug: 'insta-shortform',
    excerpt: '당신의 숏폼이 조회수 0인 이유는 알고리즘이 원하는 훅·흐름·가치를 주지 않았기 때문입니다. 성공 사례 1번(릴스 20개 촬영+제작+배포) 노하우를 그대로 적용해 드립니다.',
  },
  {
    slug: 'brand-concept',
    title: '구글 상위 노출의 시작, 광고 전 \'컨셉 점검\'이 필수인 진짜 이유',
    description: '광고 집행 전 브랜드 컨셉 점검의 중요성과 구글 상위 노출을 위한 필수 체크리스트. 10년 이상 실행 업무 전문가가 공개하는 컨셉 개발의 본질.',
    date: '2026-02-03',
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
  {
    slug: 'xiaohongshu-alipay-strategy',
    title: '제주맛집 샤오홍슈·알리페이 전략 - 10년 차 현장이 말하는 보조배터리와 로고 배치',
    description: '샤오홍슈 노트와 알리페이 수용으로 중화권 손님을 끌어오는 제주맛집 실전 전략. 보조배터리·로고 배치 팁을 10년 현장 인사이트로 전달합니다.',
    date: '2026-02-06',
    category: '샤오홍슈 & 알리페이',
    categorySlug: 'xiaohongshu-alipay',
    excerpt: '小红书·支付宝 수용과 보조배터리(充电宝)·로고 배치로 체류 시간과 UGC를 늘리는 10년 차 현장 노하우.',
  },
  {
    slug: 'google-maps-xiaohongshu-synergy',
    title: '구글 지도와 샤오홍슈 시너지 - [구글리뷰 대행사]가 말하는 리뷰 연동 전략',
    description: '구글 지도 리뷰와 샤오홍슈 打卡를 묶는 [구글리뷰 대행사] 자동화 전략. 지오펜싱·위치 기반 노출로 제주맛집 상위노출을 만드는 10년 실행 노하우.',
    date: '2026-02-06',
    category: '구글 지도 & 샤오홍슈',
    categorySlug: 'google-synergy',
    excerpt: '[구글리뷰 대행사]가 설계한 구글 지도·샤오홍슈 리뷰 연동 자동화와 지오펜싱 기반 노출 전략.',
  },
  {
    slug: 'agency-startup-master-class-secrets',
    title: '대행사 창업 마스터 클래스 비밀 - AI로 1인 기업이 대행사를 압도하는 15가지 시각',
    description: '대행사 창업의 본질을 10년 차 실행 실무 전문가가 15장의 AI 시각과 함께 해부한다. 레거시 대행사 비효율부터 무인 자동화, 압도적 수익 그래프까지.',
    date: '2026-01-27',
    category: '대행사 창업',
    categorySlug: 'ad-agency-startup',
    excerpt: '직원 없이, 임대료 없이 AI 지능형 엔진 하나로 수익 한계를 깨는 시스템. 마스터 클래스 15가지 시각을 글로 공개합니다.',
  },
  {
    slug: 'no-agency-marketing-01',
    title: '현저하게 줄어든 블로그 클릭률, 1인 AI 광고대행사가 되면 해결된다',
    description: '블로그 CTR 저하를 1인 AI 광고대행사 전략과 릴스 20개 패키지로 돌파하는 방법. 10년 실행 실무 전문가의 알고리즘 확산 노하우.',
    date: '2026-01-27',
    category: '알고리즘 확산',
    categorySlug: 'algorithm-spread',
    excerpt: '현저하게 줄어든 블로그 클릭률을 1인 AI 광고대행사 구조와 릴스 20개 패키지로 해소하는 실전 가이드.',
  },
  {
    slug: 'danang-restaurant-recommendation',
    title: '다낭 맛집 추천: 광고 대행사가 데이터 로직으로 분석한 실패 없는 5곳',
    description: '광고 대행사가 다낭 현지 데이터와 구글 랭킹 로직을 대조하여 분석한 다낭맛집 추천 5곳. 검증된 신뢰 보고서.',
    date: '2026-02-15',
    category: '다낭 맛집',
    categorySlug: 'danang-restaurant',
    excerpt: '목 식당·반미 푸·미케·콩카페·라우. 구글 맵 트래픽과 리뷰 품질을 데이터로 검증한 다낭맛집 추천 리포트.',
  },
  {
    slug: 'agency-recommendation',
    title: '제주 마케팅 대행사 추천 - 10년 실행 전문가가 고른 라이프스타일 마케팅',
    description: '제주 지역 맞춤 마케팅 대행사 추천과 라이프스타일 브랜딩 전략. 15장의 고품질 이미지와 함께 검증된 대행사 선정 기준을 공개합니다.',
    date: '2026-02-05',
    category: '대행사 창업',
    categorySlug: 'ad-agency-startup',
    excerpt: '제주 마케팅 대행사 추천과 라이프스타일 마케팅 전략을 15장의 최적화 이미지로 소개합니다.',
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
