/**
 * 제주도 맛집 베스트 10 - 공유 데이터
 * layout(JSON-LD), component에서 사용
 */
const IMG_BASE = '/images/stealth-best-10';
const BASE_URL = 'https://www.aijeju.co.kr';

export type Shop = {
  id: number;
  name: string;
  img: string;
  rating: number;
  reviewCount: number;
  brief: string;
  teaser: string;
  story: string;
  query: string;
  address: string;
  phone: string;
  hours: string;
  parking: string;
  menuPrice: string;
  carMinutesFromAirport: number;
  busRoutesFromAirport: string;
  mapX: number;
  mapY: number;
  /** WGS84 위도 (OSM iframe용) */
  lat: number;
  /** WGS84 경도 (OSM iframe용) */
  lng: number;
  youtubeUrl: string;
  naverPlaceUrl: string;
  googlePlaceUrl: string;
  imgAlt: string;
  cuisine: string;
  /** 주소 스키마용 */
  postalCode: string;
  addressLocality: string;
  /** 평점·리뷰 출처 */
  ratingSource: string;
};

/** 최정예 7개 (우진해장국, 맛나식당, 고집돌우럭 제외) - 조사 기준: 다이닝코드 2025.3, 네이버 플레이스·구글 참고 */
export const initialShops: Shop[] = [
  { id: 1, name: '연동대게회타운', img: `${IMG_BASE}/1.avif`, rating: 4.5, reviewCount: 720, ratingSource: '다이닝코드·네이버 플레이스 참고', brief: '제주 대게의 정점', teaser: '신선한 대게 회와 볶음밥', story: '제주 연동에서 대게 전문으로 운영하는 맛집입니다.', query: '제주 연동대게회타운', address: '제주특별자치도 제주시 서해안로 638', phone: '064-747-9289', hours: '10:00 ~ 22:00', parking: '가능', menuPrice: '대게세트 2인 180,000원~, 회세트 1인 50,000원~', carMinutesFromAirport: 12, busRoutesFromAirport: '100번, 200번 (연동정류장 하차 후 도보)', mapX: 30, mapY: 22, lat: 33.499, lng: 126.512, youtubeUrl: 'https://www.youtube.com/shorts/GY5YA2WraCc', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+연동대게회타운', googlePlaceUrl: 'https://www.google.com/maps/search/제주+연동대게회타운', imgAlt: '제주 연동대게회타운 대게회와 볶음밥 - 제주도 맛집 베스트', cuisine: '한식, 해산물', postalCode: '63126', addressLocality: '제주시 연동' },
  { id: 2, name: '섬타르', img: `${IMG_BASE}/2.avif`, rating: 3.9, reviewCount: 185, ratingSource: '다이닝코드 2025.3', brief: '제주 로컬 타르트', teaser: '구좌 당근, 우도 땅콩 타르트', story: '제주 원재료를 담은 달콤한 타르트 전문점입니다.', query: '제주 섬타르', address: '제주특별자치도 제주시 노형동 1280-1 (다랑곶1길 9)', phone: '064-744-4467', hours: '09:30 ~ 22:30', parking: '불가(인근 주차)', menuPrice: '에그타르트 4,500원~, 구좌당근타르트', carMinutesFromAirport: 10, busRoutesFromAirport: '100번, 200번 (노형·드림타워 인근)', mapX: 38, mapY: 28, lat: 33.4877, lng: 126.4782, youtubeUrl: 'https://www.youtube.com/shorts/e-94iwTxuDk', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+섬타르', googlePlaceUrl: 'https://www.google.com/maps/search/제주+섬타르', imgAlt: '제주 섬타르 구좌당근타르트 - 제주 노형동 카페 베스트', cuisine: '카페, 베이커리', postalCode: '63085', addressLocality: '제주시 노형동' },
  { id: 3, name: '브와두스', img: `${IMG_BASE}/3.avif`, rating: 4.2, reviewCount: 248, ratingSource: '다이닝코드·네이버 플레이스 참고', brief: '베이커리 카페', teaser: '갓 구운 빵과 커피', story: '매일 아침 갓 구운 빵이 반기는 베이커리 카페입니다.', query: '제주 브와두스', address: '제주특별자치도 제주시 연동 261-21', phone: '064-799-7717', hours: '08:00 ~ 20:00', parking: '가능(공영주차장 30분 무료)', menuPrice: '크루아상 4,500원~, 홀케이크', carMinutesFromAirport: 8, busRoutesFromAirport: '100번, 200번 (연동정류장 하차)', mapX: 32, mapY: 24, lat: 33.493, lng: 126.499, youtubeUrl: 'https://www.youtube.com/shorts/ZaOsu9VlM2A', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+브와두스', googlePlaceUrl: 'https://www.google.com/maps/search/제주+브와두스', imgAlt: '제주 브와두스 크루아상 베이커리 - 연동 맛집', cuisine: '카페, 베이커리', postalCode: '63126', addressLocality: '제주시 연동' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.avif`, rating: 4.4, reviewCount: 392, ratingSource: '네이버 플레이스·구글 참고', brief: '바리스타의 철학', teaser: '99.9% 완벽한 커피', story: '직접 로스팅한 원두의 깊은 향미를 느껴보세요.', query: '제주 커피구십구점구', address: '제주특별자치도 제주시 한림읍 한림로 585', phone: '064-796-9099', hours: '10:00 ~ 19:00', parking: '가능', menuPrice: '아메리카노 5,000원~', carMinutesFromAirport: 42, busRoutesFromAirport: '202번 (한림 방면, 한림정류장 하차)', mapX: 14, mapY: 56, lat: 33.430, lng: 126.274, youtubeUrl: 'https://www.youtube.com/shorts/UdV2_-9_2iE', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+커피구십구점구', googlePlaceUrl: 'https://www.google.com/maps/search/제주+커피구십구점구', imgAlt: '제주 한림 커피구십구점구 로스팅 커피 - 제주도 카페', cuisine: '카페', postalCode: '63046', addressLocality: '제주시 한림읍' },
  { id: 5, name: '돈이랑', img: `${IMG_BASE}/5.avif`, rating: 4.4, reviewCount: 468, ratingSource: '다이닝코드·네이버 플레이스 참고', brief: '흑돼지 전문', teaser: '제주 흑돼지의 정석', story: '숯불에 구운 흑돼지의 육즙을 만나보세요.', query: '돈이랑 일주서로', address: '제주특별자치도 서귀포시 일주서로 953 1층', phone: '0507-1435-9278', hours: '11:30 ~ 24:00', parking: '가능', menuPrice: '흑돼지 1인분 15,000원~', carMinutesFromAirport: 48, busRoutesFromAirport: '600번 공항리무진 (중문 터미널 하차 후 차로 5분)', mapX: 52, mapY: 88, lat: 33.2577, lng: 126.4087, youtubeUrl: 'https://www.youtube.com/shorts/NNiF2xzWorg', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=돈이랑+일주서로+953', googlePlaceUrl: 'https://www.google.com/maps/search/돈이랑+일주서로+953', imgAlt: '서귀포 돈이랑 제주 흑돼지 구이 - 중문 맛집', cuisine: '한식, 고기', postalCode: '63572', addressLocality: '서귀포시 중문' },
  { id: 6, name: '자매국수', img: `${IMG_BASE}/6.avif`, rating: 4.3, reviewCount: 318, ratingSource: '네이버 플레이스·구글 참고', brief: '칼국수·비빔국수', teaser: '쫄깃한 면발의 맛', story: '로컬들이 찾는 국수 전문점입니다.', query: '제주 자매국수', address: '제주특별자치도 제주시 한림읍 한림로 559', phone: '064-796-2020', hours: '09:00 ~ 20:00', parking: '가능', menuPrice: '칼국수 8,000원~', carMinutesFromAirport: 44, busRoutesFromAirport: '202번 (한림 방면)', mapX: 16, mapY: 58, lat: 33.421, lng: 126.264, youtubeUrl: 'https://www.youtube.com/shorts/r5NfMgCbU8Y', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+자매국수', googlePlaceUrl: 'https://www.google.com/maps/search/제주+자매국수', imgAlt: '제주 한림 자매국수 칼국수 비빔국수 - 한림 맛집', cuisine: '한식, 국수', postalCode: '63046', addressLocality: '제주시 한림읍' },
  { id: 7, name: '램스키친', img: `${IMG_BASE}/10.avif`, rating: 4.5, reviewCount: 428, ratingSource: '네이버 플레이스·구글 참고', brief: '양갈비 전문', teaser: '프리미엄 양고기', story: '잡내 없는 부드러운 양갈비를 경험해보세요.', query: '제주 램스키친', address: '제주특별자치도 제주시 노형동 1055 (국기도 35)', phone: '064-711-9292', hours: '12:00 ~ 22:00', parking: '가능', menuPrice: '양갈비 1인분 28,000원~', carMinutesFromAirport: 18, busRoutesFromAirport: '100번, 200번 (노형·국기도 하차)', mapX: 40, mapY: 30, lat: 33.483, lng: 126.478, youtubeUrl: 'https://www.youtube.com/shorts/IdMwKln6sqw', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+램스키친', googlePlaceUrl: 'https://www.google.com/maps/search/제주+램스키친', imgAlt: '제주 램스키친 양갈비 - 노형동 양고기 맛집 베스트', cuisine: '양고기, 요리', postalCode: '63085', addressLocality: '제주시 노형동' },
];

/** openingHours 변환: "10:00 ~ 22:00" → "Mo-Su 10:00-22:00" */
function toSchemaHours(hours: string): string {
  const m = hours.match(/(\d{1,2}):(\d{2})\s*~?\s*(\d{1,2}):(\d{2})/);
  if (!m) return 'Mo-Su 09:00-21:00';
  return `Mo-Su ${m[1]}:${m[2]}-${m[3]}:${m[4]}`;
}

/** 유튜브 URL에서 비디오 ID 추출 */
export function getYoutubeVideoId(url: string): string | null {
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return shortMatch[1];
  return null;
}

/** Restaurant JSON-LD 생성 */
export function buildRestaurantSchema(shop: Shop) {
  const hasParking = shop.parking.includes('가능') && !shop.parking.includes('불가');
  const schema: Record<string, unknown> = {
    '@type': 'Restaurant' as const,
    '@id': `${BASE_URL}/ko/stealth-best-10#${shop.id}`,
    name: shop.name,
    description: shop.story,
    address: {
      '@type': 'PostalAddress' as const,
      streetAddress: shop.address,
      addressLocality: shop.addressLocality,
      addressRegion: '제주특별자치도',
      postalCode: shop.postalCode,
      addressCountry: 'KR',
    },
    telephone: shop.phone,
    image: `${BASE_URL}${shop.img}`,
    url: shop.naverPlaceUrl,
    sameAs: [shop.naverPlaceUrl, shop.googlePlaceUrl],
    openingHours: toSchemaHours(shop.hours),
    priceRange: '₩₩',
    servesCuisine: shop.cuisine,
    hasMenu: {
      '@type': 'Menu' as const,
      hasMenuSection: {
        '@type': 'MenuSection' as const,
        name: '대표메뉴',
        description: shop.menuPrice,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating' as const,
      ratingValue: shop.rating,
      reviewCount: shop.reviewCount,
      bestRating: 5,
      author: {
        '@type': 'Organization' as const,
        name: shop.ratingSource,
      },
    },
    amenityFeature: {
      '@type': 'LocationFeatureSpecification' as const,
      name: '주차',
      value: hasParking,
      description: shop.parking,
    },
    hasMap: shop.googlePlaceUrl,
    additionalProperty: [
      { '@type': 'PropertyValue' as const, name: '주차', value: shop.parking },
      { '@type': 'PropertyValue' as const, name: '공항버스', value: shop.busRoutesFromAirport },
      { '@type': 'PropertyValue' as const, name: '평점·리뷰 출처', value: shop.ratingSource },
    ],
  };

  const videoId = getYoutubeVideoId(shop.youtubeUrl);
  if (videoId) {
    schema.video = {
      '@type': 'VideoObject' as const,
      name: `${shop.name} 맛집 후기`,
      description: shop.story,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      uploadDate: '2024-01-01',
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }

  return schema;
}

export { BASE_URL };
