import type { Metadata } from 'next';
import { PretendardLoader } from './PretendardLoader';

export const metadata: Metadata = {
  title: '테스트',
  description: '배포 확인',
  robots: { index: false, follow: false, noarchive: true },
};

export default function StealthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div style={{ fontFamily: "'Pretendard Variable', 'Pretendard', system-ui, sans-serif" }}>
      <PretendardLoader />
      {children}
    </div>
  );
}
