/**
 * BreadcrumbList 스키마 생성 유틸리티
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * BreadcrumbList 스키마 생성
 * @param items - Breadcrumb 항목 배열
 * @returns JSON-LD 형식의 BreadcrumbList 스키마
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://www.aijeju.co.kr${item.url}`,
    })),
  };
}

/**
 * 블로그 포스트용 Breadcrumb 생성
 * @param slug - 포스트 slug
 * @param title - 포스트 제목
 * @param category - 카테고리 이름 (선택)
 * @returns Breadcrumb 항목 배열
 */
export function generateBlogBreadcrumbs(slug: string, title: string, category?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: '홈', url: '/' },
    { name: '알고리즘 확산 블로그', url: '/blog' },
  ];

  if (category) {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    items.push({
      name: category,
      url: `/blog/${categorySlug}`,
    });
  }

  items.push({
    name: title,
    url: `/blog/${slug}`,
  });

  return items;
}
