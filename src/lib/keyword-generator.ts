/**
 * SEO 최적화: 키워드 스터핑 방지
 * 각 포스트의 내용에 맞게 자연스럽게 키워드를 생성합니다.
 */

/**
 * 포스트 내용에서 키워드를 자연스럽게 추출
 * 키워드 스터핑을 방지하기 위해 최대 5개까지만 반환
 */
export function generateKeywords(
  title: string,
  categories: Array<{ name: string; slug: string }>,
  content?: string
): string {
  // 카테고리 이름을 기본 키워드로 사용
  const categoryKeywords = categories.map((cat) => cat.name).slice(0, 3);

  // 제목에서 주요 키워드 추출 (2-3개 단어)
  const titleWords = title
    .replace(/[^\w\s가-힣]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1)
    .slice(0, 2);

  // 내용에서 키워드 추출 (있는 경우)
  let contentKeywords: string[] = [];
  if (content) {
    const cleanContent = content.replace(/<[^>]*>/g, ' ');
    const words = cleanContent
      .split(/\s+/)
      .filter((word) => word.length > 2)
      .slice(0, 2);
    contentKeywords = words;
  }

  // 중복 제거 및 최대 5개로 제한
  const allKeywords = [...new Set([...categoryKeywords, ...titleWords, ...contentKeywords])].slice(0, 5);

  // 자연스러운 키워드 문자열 생성
  return allKeywords.join(', ') || '엠월드컴퍼니';
}

/**
 * 정적 포스트용 키워드 생성
 */
export function generateStaticPostKeywords(
  title: string,
  category: string,
  description?: string
): string {
  const categoryKeyword = category;
  const titleWords = title
    .replace(/[^\w\s가-힣]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1)
    .slice(0, 2);

  let descKeywords: string[] = [];
  if (description) {
    const words = description
      .replace(/[^\w\s가-힣]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2)
      .slice(0, 2);
    descKeywords = words;
  }

  const allKeywords = [...new Set([categoryKeyword, ...titleWords, ...descKeywords])].slice(0, 5);
  return allKeywords.join(', ') || '엠월드컴퍼니';
}
