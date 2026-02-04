/**
 * 블로그 카테고리 정의
 */

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  seoKeywords: string[];
}

export const blogCategories: BlogCategory[] = [
  {
    slug: 'insta-shortform',
    name: '인스타그램 마케팅 & 숏폼',
    description: '인스타그램 알고리즘 최적화와 숏폼 콘텐츠 제작 전략. 바이럴 확산을 위한 실전 노하우를 공유합니다.',
    seoKeywords: ['인스타그램 마케팅', '숏폼 제작', '인스타그램 알고리즘', '바이럴 마케팅', '숏폼 콘텐츠'],
  },
  {
    slug: 'dazhong-dianping',
    name: '따종디엔핑 공략',
    description: '중국 최대 리뷰 플랫폼 따종디엔핑(大众点评) 공략 전략. 중국 시장 진출을 위한 필수 가이드.',
    seoKeywords: ['따종디엔핑', '大众点评', '중국 마케팅', '중국 리뷰 플랫폼', '중국 시장 진출'],
  },
  {
    slug: 'xiaohongshu',
    name: '샤오홍슈 정복',
    description: '샤오홍슈(小红书) 알고리즘 분석과 콘텐츠 전략. 중국 젊은 세대 타겟팅 마케팅 노하우.',
    seoKeywords: ['샤오홍슈', '小红书', '중국 SNS', '중국 소셜미디어', '중국 인플루언서 마케팅'],
  },
  {
    slug: 'blog-marketing-truth',
    name: '블로그 광고의 진실',
    description: '블로그 광고의 본질과 효과적인 활용법. 광고주와 블로거 모두를 위한 투명한 가이드.',
    seoKeywords: ['블로그 광고', '블로그 마케팅', '인플루언서 마케팅', '콘텐츠 마케팅', '블로그 협찬'],
  },
  {
    slug: 'viral-knowhow',
    name: '체험단 운영 노하우',
    description: '체험단 운영의 A to Z. 효과적인 체험단 구성부터 후기 관리까지 실전 노하우 공개.',
    seoKeywords: ['체험단', '체험단 운영', '후기 마케팅', '리뷰 마케팅', '체험단 관리'],
  },
  {
    slug: 'place-master',
    name: '플레이스 교육: 본질과 매출',
    description: '네이버 플레이스, 구글 비즈니스 프로필 등 플레이스 최적화의 본질과 매출 증대 전략.',
    seoKeywords: ['네이버 플레이스', '플레이스 최적화', '로컬 SEO', '구글 비즈니스', '플레이스 마케팅'],
  },
  {
    slug: 'brand-concept',
    name: '광고 전 컨셉 점검',
    description: '광고 집행 전 반드시 점검해야 할 브랜드 컨셉과 메시지 전략. 효과적인 광고를 위한 필수 체크리스트.',
    seoKeywords: ['브랜드 컨셉', '광고 전략', '브랜드 메시지', '컨셉 개발', '브랜드 포지셔닝'],
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((cat) => cat.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return blogCategories.map((cat) => cat.slug);
}
