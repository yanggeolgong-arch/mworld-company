/**
 * GEO SEO URL 최적화 유틸리티
 * 포스팅 제목을 SEO 친화적인 URL로 변환
 */

// 한국어 키워드 매핑 (영어 키워드로 변환)
const keywordMapping: Record<string, string> = {
  '광고대행사': 'ad-agency',
  '창업': 'startup',
  '숏폼': 'shortform',
  '마케팅': 'marketing',
  '실무': 'practice',
  '플레이스': 'place',
  '알고리즘': 'algorithm',
  '확산': 'diffusion',
  '최적화': 'optimization',
  '네이버': 'naver',
  'AI': 'ai',
  '자동화': 'automation',
  '1인': 'solo',
  '기업': 'business',
  '대행사': 'agency',
  '압도': 'dominate',
};

/**
 * 제목을 SEO 친화적인 URL slug로 변환
 * @param title - 원본 제목
 * @returns 최적화된 slug
 */
export function optimizeSlug(title: string): string {
  // 1. 특수문자 제거 및 공백을 하이픈으로 변환
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s가-힣-]/g, '') // 특수문자 제거 (하이픈 제외)
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/-+/g, '-') // 연속된 하이픈을 하나로
    .replace(/^-|-$/g, ''); // 앞뒤 하이픈 제거

  // 2. 한국어 키워드를 영어로 변환
  Object.entries(keywordMapping).forEach(([korean, english]) => {
    const regex = new RegExp(korean, 'gi');
    slug = slug.replace(regex, english);
  });

  // 3. 의미 없는 숫자 제거 (단, 의미 있는 숫자는 유지)
  // 예: "2026년" -> "2026" 유지, "12345" -> 제거
  slug = slug.replace(/\b\d{5,}\b/g, ''); // 5자리 이상 숫자 제거
  slug = slug.replace(/\b0+\d+\b/g, ''); // 앞에 0이 붙은 숫자 제거

  // 4. 연속된 하이픈 정리
  slug = slug.replace(/-+/g, '-').replace(/^-|-$/g, '');

  // 5. 최대 길이 제한 (SEO 최적화)
  if (slug.length > 100) {
    slug = slug.substring(0, 100).replace(/-[^-]*$/, '');
  }

  // 6. 빈 문자열 처리
  if (!slug || slug.length === 0) {
    slug = 'post';
  }

  return slug;
}

/**
 * 카테고리 기반 URL 생성
 * @param slug - 최적화된 slug
 * @param title - 원본 제목
 * @param category - 카테고리 이름
 * @returns 최적화된 URL 경로
 */
export function generateOptimizedUrl(slug: string, title: string, category?: string): string {
  const optimizedSlug = optimizeSlug(slug || title);
  
  // 카테고리 기반 URL 구조
  if (category) {
    const categorySlug = optimizeSlug(category);
    return `/blog/${categorySlug}/${optimizedSlug}`;
  }

  // 키워드 기반 자동 분류
  const titleLower = title.toLowerCase();
  if (titleLower.includes('창업') || titleLower.includes('대행사') || titleLower.includes('startup') || titleLower.includes('agency')) {
    return `/blog/ad-agency-startup/${optimizedSlug}`;
  }
  if (titleLower.includes('숏폼') || titleLower.includes('마케팅') || titleLower.includes('shortform') || titleLower.includes('marketing')) {
    return `/blog/shortform-marketing-practice/${optimizedSlug}`;
  }
  if (titleLower.includes('플레이스') || titleLower.includes('알고리즘') || titleLower.includes('place') || titleLower.includes('algorithm')) {
    return `/blog/place-algorithm/${optimizedSlug}`;
  }

  // 기본 URL
  return `/blog/${optimizedSlug}`;
}

/**
 * Canonical URL 생성
 * @param path - 현재 경로
 * @returns Canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = 'https://www.aijeju.co.kr';
  
  // 쿼리 파라미터 제거
  const cleanPath = path.split('?')[0];
  
  // 중복 슬래시 제거
  const normalizedPath = cleanPath.replace(/\/+/g, '/');
  
  return `${baseUrl}${normalizedPath}`;
}
