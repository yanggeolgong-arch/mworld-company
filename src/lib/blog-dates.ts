/**
 * 블로그 날짜 유틸리티 (SEO 스키마·표시용)
 * 서버에서만 사용하여 LCP/레이아웃 안정성 유지, new Date()로 오늘 날짜 자동 반영
 */

/** 오늘 날짜 ISO 8601 날짜만 (YYYY-MM-DD) - JSON-LD dateModified 등에 사용 */
export function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * JSON-LD BlogPosting용 datePublished / dateModified
 * dateModified는 항상 오늘로 갱신되어 SEO에 유리
 */
export function getSchemaDates(publishedDate: string): { datePublished: string; dateModified: string } {
  return {
    datePublished: publishedDate,
    dateModified: getTodayISO(),
  };
}

/**
 * 알고리즘 확산(SEO) 회복용: datePublished·dateModified를 모두 오늘 시각으로 동기화
 * 서버/빌드 시점의 new Date() 기반, LCP 유지
 */
export function getSchemaDatesSyncToToday(): { datePublished: string; dateModified: string } {
  const today = getTodayISO();
  return { datePublished: today, dateModified: today };
}

/** ko-KR 표시용 날짜 (예: 2026년 2월 5일) - 서버 렌더링, LCP 영향 없음 */
export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
