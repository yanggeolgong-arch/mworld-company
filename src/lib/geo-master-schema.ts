/**
 * GEO Master 전략 스키마 마크업 생성
 * 지역 비즈니스 및 위치 기반 SEO 최적화
 */

export interface GeoMasterSchemaOptions {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
  keywords?: string[];
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    latitude: string;
    longitude: string;
  };
}

export function generateGeoMasterSchema(options: GeoMasterSchemaOptions) {
  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: options.name,
    description: options.description,
    url: options.url,
  };

  if (options.image) {
    baseSchema.image = options.image;
  }

  if (options.address) {
    baseSchema.address = {
      '@type': 'PostalAddress',
      streetAddress: options.address.streetAddress || '',
      addressLocality: options.address.addressLocality,
      addressRegion: options.address.addressRegion || '',
      postalCode: options.address.postalCode || '',
      addressCountry: options.address.addressCountry,
    };
  }

  if (options.geo) {
    baseSchema.geo = {
      '@type': 'GeoCoordinates',
      latitude: options.geo.latitude,
      longitude: options.geo.longitude,
    };
  }

  if (options.category) {
    baseSchema.category = options.category;
  }

  if (options.keywords && options.keywords.length > 0) {
    baseSchema.keywords = options.keywords.join(', ');
  }

  return baseSchema;
}

export function generateCategoryPageSchema(
  categoryName: string,
  categorySlug: string,
  description: string,
  keywords: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    description,
    url: `https://www.aijeju.co.kr/blog/category/${categorySlug}`,
    keywords: keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: '공양걸AI연구소',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.aijeju.co.kr/logo.png',
      },
    },
  };
}
