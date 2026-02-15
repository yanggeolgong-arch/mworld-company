/**
 * 공양걸AI연구소 글로벌 브랜드 상수
 * EN/JP/ZH 로케일 지원 시 각 언어별 브랜드명 사용
 */
export const BRAND = {
  ko: '공양걸AI연구소',
  en: 'Gong Yang-geol AI Lab',
  ja: '孔陽傑AI研究所',
  zh: '公阳杰AI研究所',
} as const;

/** 기본(한국어) 브랜드명 - 단일 로케일 환경에서 사용 */
export const BRAND_NAME = BRAND.ko;
