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
  youtubeUrl: string;
  naverPlaceUrl: string;
  googlePlaceUrl: string;
  /** SEO: 이미지 alt 설명 */
  imgAlt: string;
  /** SEO: 음식 종류 (servesCuisine) */
  cuisine: string;
};

export const initialShops: Shop[] = [
  { id: 1, name: '연동대게회타운', img: `${IMG_BASE}/1.avif`, rating: 4.9, reviewCount: 12345, brief: '제주 대게의 정점', teaser: '신선한 대게 회와 볶음밥', story: '제주 연동에서 대게 전문으로 운영하는 맛집입니다.', query: '제주 연동대게회타운', address: '제주특별자치도 제주시 서해안로 638', phone: '064-747-9289', hours: '10:00 ~ 22:00', parking: '가능', menuPrice: '대게세트 2인 180,000원~, 회세트 1인 50,000원~', carMinutesFromAirport: 12, busRoutesFromAirport: '100번, 200번 (연동정류장 하차 후 도보)', mapX: 30, mapY: 22, youtubeUrl: 'https://www.youtube.com/shorts/GY5YA2WraCc', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+연동대게회타운', googlePlaceUrl: 'https://www.google.com/maps/search/제주+연동대게회타운', imgAlt: '제주 연동대게회타운 대게회와 볶음밥 - 제주도 맛집 베스트 10', cuisine: '한식, 해산물' },
  { id: 2, name: '섬타르', img: `${IMG_BASE}/2.avif`, rating: 4.8, reviewCount: 8765, brief: '제주 로컬 타르트', teaser: '구좌 당근, 우도 땅콩 타르트', story: '제주 원재료를 담은 달콤한 타르트 전문점입니다.', query: '제주 섬타르', address: '제주특별자치도 제주시 노형동 1280-1 (다랑곶1길 9)', phone: '064-744-4467', hours: '09:30 ~ 22:30', parking: '불가(인근 주차)', menuPrice: '에그타르트 4,500원~, 구좌당근타르트', carMinutesFromAirport: 10, busRoutesFromAirport: '100번, 200번 (노형·드림타워 인근)', mapX: 38, mapY: 28, youtubeUrl: 'https://www.youtube.com/shorts/e-94iwTxuDk', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+섬타르', googlePlaceUrl: 'https://www.google.com/maps/search/제주+섬타르', imgAlt: '제주 섬타르 구좌당근타르트 - 제주 노형동 카페 베스트', cuisine: '카페, 베이커리' },
  { id: 3, name: '브와두스', img: `${IMG_BASE}/3.avif`, rating: 4.9, reviewCount: 9876, brief: '베이커리 카페', teaser: '갓 구운 빵과 커피', story: '매일 아침 갓 구운 빵이 반기는 베이커리 카페입니다.', query: '제주 브와두스', address: '제주특별자치도 제주시 연동 261-21', phone: '064-799-7717', hours: '08:00 ~ 20:00', parking: '가능(공영주차장 30분 무료)', menuPrice: '크루아상 4,500원~, 홀케이크', carMinutesFromAirport: 8, busRoutesFromAirport: '100번, 200번 (연동정류장 하차)', mapX: 32, mapY: 24, youtubeUrl: 'https://www.youtube.com/shorts/ZaOsu9VlM2A', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+브와두스', googlePlaceUrl: 'https://www.google.com/maps/search/제주+브와두스', imgAlt: '제주 브와두스 크루아상 베이커리 - 연동 맛집', cuisine: '카페, 베이커리' },
  { id: 4, name: '커피구십구점구', img: `${IMG_BASE}/4.avif`, rating: 4.7, reviewCount: 5432, brief: '바리스타의 철학', teaser: '99.9% 완벽한 커피', story: '직접 로스팅한 원두의 깊은 향미를 느껴보세요.', query: '제주 커피구십구점구', address: '제주특별자치도 제주시 한림읍 한림로 585', phone: '064-796-9099', hours: '10:00 ~ 19:00', parking: '가능', menuPrice: '아메리카노 5,000원~', carMinutesFromAirport: 42, busRoutesFromAirport: '202번 (한림 방면, 한림정류장 하차)', mapX: 14, mapY: 56, youtubeUrl: 'https://www.youtube.com/shorts/UdV2_-9_2iE', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+커피구십구점구', googlePlaceUrl: 'https://www.google.com/maps/search/제주+커피구십구점구', imgAlt: '제주 한림 커피구십구점구 로스팅 커피 - 제주도 카페', cuisine: '카페' },
  { id: 5, name: '돈이랑', img: `${IMG_BASE}/5.avif`, rating: 4.8, reviewCount: 7654, brief: '흑돼지 전문', teaser: '제주 흑돼지의 정석', story: '숯불에 구운 흑돼지의 육즙을 만나보세요.', query: '돈이랑 일주서로', address: '제주특별자치도 서귀포시 일주서로 953 1층', phone: '0507-1435-9278', hours: '11:30 ~ 24:00', parking: '가능', menuPrice: '흑돼지 1인분 15,000원~', carMinutesFromAirport: 48, busRoutesFromAirport: '600번 공항리무진 (중문 터미널 하차 후 차로 5분)', mapX: 52, mapY: 88, youtubeUrl: 'https://www.youtube.com/shorts/NNiF2xzWorg', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=돈이랑+일주서로+953', googlePlaceUrl: 'https://www.google.com/maps/search/돈이랑+일주서로+953', imgAlt: '서귀포 돈이랑 제주 흑돼지 구이 - 중문 맛집', cuisine: '한식, 고기' },
  { id: 6, name: '자매국수', img: `${IMG_BASE}/6.avif`, rating: 4.6, reviewCount: 4321, brief: '칼국수·비빔국수', teaser: '쫄깃한 면발의 맛', story: '로컬들이 찾는 국수 전문점입니다.', query: '제주 자매국수', address: '제주특별자치도 제주시 한림읍 한림로 559', phone: '064-796-2020', hours: '09:00 ~ 20:00', parking: '가능', menuPrice: '칼국수 8,000원~', carMinutesFromAirport: 44, busRoutesFromAirport: '202번 (한림 방면)', mapX: 16, mapY: 58, youtubeUrl: 'https://www.youtube.com/shorts/r5NfMgCbU8Y', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+자매국수', googlePlaceUrl: 'https://www.google.com/maps/search/제주+자매국수', imgAlt: '제주 한림 자매국수 칼국수 비빔국수 - 한림 맛집', cuisine: '한식, 국수' },
  { id: 7, name: '우진해장국', img: `${IMG_BASE}/7.avif`, rating: 4.7, reviewCount: 6543, brief: '고사리 육개장 전문', teaser: '진한 소고기 육수', story: '제주 전통 고사리 육개장 전문점입니다.', query: '제주 우진해장국', address: '제주특별자치도 제주시 서사로 11', phone: '064-757-3393', hours: '06:00 ~ 22:00', parking: '가능(맞은편 공영주차장 1시간 무료)', menuPrice: '고사리육개장 10,000원~', carMinutesFromAirport: 12, busRoutesFromAirport: '36번, 37번 (동문재래시장·서사로 인근 하차)', mapX: 36, mapY: 34, youtubeUrl: 'https://www.youtube.com/shorts/4DlRyY9UP08', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+우진해장국', googlePlaceUrl: 'https://www.google.com/maps/search/제주+우진해장국', imgAlt: '제주 우진해장국 고사리육개장 - 동문재래시장 인근 맛집', cuisine: '한식, 해장국' },
  { id: 8, name: '고집돌우럭', img: `${IMG_BASE}/8.avif`, rating: 4.8, reviewCount: 3456, brief: '우럭조림 전문', teaser: '바다의 신선함', story: '제주 대표 우럭조림 맛집입니다.', query: '제주 고집돌우럭', address: '제주특별자치도 서귀포시 일주서로 879', phone: '064-782-0011', hours: '10:00 ~ 21:30 (브레이크 15:00~17:00)', parking: '가능', menuPrice: '우럭조림 1인분 35,000원~', carMinutesFromAirport: 45, busRoutesFromAirport: '600번 공항리무진 (중문 터미널 하차)', mapX: 50, mapY: 86, youtubeUrl: 'https://www.youtube.com/shorts/4OVfq2hI3vo', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+고집돌우럭', googlePlaceUrl: 'https://www.google.com/maps/search/제주+고집돌우럭', imgAlt: '서귀포 고집돌우럭 우럭조림 - 제주 해산물 맛집', cuisine: '한식, 해산물' },
  { id: 9, name: '맛나식당', img: `${IMG_BASE}/9.avif`, rating: 4.5, reviewCount: 5678, brief: '갈치·고등어 조림', teaser: '전통 한정식', story: '갈치조림, 고등어조림 전문 맛집입니다.', query: '제주 맛나식당', address: '제주특별자치도 서귀포시 성산읍 동류암로 41', phone: '064-782-3333', hours: '11:00 ~ 20:00', parking: '가능', menuPrice: '갈치·고등어 조림 25,000원~', carMinutesFromAirport: 55, busRoutesFromAirport: '201번 (성산 방면)', mapX: 88, mapY: 68, youtubeUrl: 'https://www.youtube.com/shorts/hvwZbDSkLG8', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+맛나식당', googlePlaceUrl: 'https://www.google.com/maps/search/제주+맛나식당', imgAlt: '성산 맛나식당 갈치조림 고등어조림 - 성산일출봉 인근 맛집', cuisine: '한식, 생선요리' },
  { id: 10, name: '램스키친', img: `${IMG_BASE}/10.avif`, rating: 4.9, reviewCount: 7890, brief: '양갈비 전문', teaser: '프리미엄 양고기', story: '잡내 없는 부드러운 양갈비를 경험해보세요.', query: '제주 램스키친', address: '제주특별자치도 제주시 노형동 1055 (국기도 35)', phone: '064-711-9292', hours: '12:00 ~ 22:00', parking: '가능', menuPrice: '양갈비 1인분 28,000원~', carMinutesFromAirport: 18, busRoutesFromAirport: '100번, 200번 (노형·국기도 하차)', mapX: 40, mapY: 30, youtubeUrl: 'https://www.youtube.com/shorts/IdMwKln6sqw', naverPlaceUrl: 'https://m.place.naver.com/place/list?query=제주+램스키친', googlePlaceUrl: 'https://www.google.com/maps/search/제주+램스키친', imgAlt: '제주 램스키친 양갈비 - 노형동 양고기 맛집 베스트', cuisine: '양고기, 요리' },
];

/** openingHours 변환: "10:00 ~ 22:00" → "Mo-Su 10:00-22:00" */
function toSchemaHours(hours: string): string {
  const m = hours.match(/(\d{1,2}):(\d{2})\s*~?\s*(\d{1,2}):(\d{2})/);
  if (!m) return 'Mo-Su 09:00-21:00';
  return `Mo-Su ${m[1]}:${m[2]}-${m[3]}:${m[4]}`;
}

/** Restaurant JSON-LD 생성 */
export function buildRestaurantSchema(shop: Shop) {
  return {
    '@type': 'Restaurant' as const,
    '@id': `${BASE_URL}/ko/stealth-best-10#${shop.id}`,
    name: shop.name,
    description: shop.story,
    address: {
      '@type': 'PostalAddress' as const,
      addressRegion: '제주특별자치도',
      addressCountry: 'KR',
      streetAddress: shop.address,
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
    },
  };
}

export { BASE_URL };
