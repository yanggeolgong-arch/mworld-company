import { type ReactNode } from 'react';

/**
 * 스텔스 라우트 그룹: 메인 사이트 Header/Footer 없음.
 * 제주 맛집/정보 큐레이션 독립 레이아웃은 각 페이지에서 처리.
 */
export default function StealthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
