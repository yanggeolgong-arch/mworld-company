import type { Metadata } from 'next';
import { PretendardLoader } from './PretendardLoader';

export const metadata: Metadata = {
  title: 'Jeju Gourmet Intelligence: Real Battle | Classified',
  description: 'Data Command · Vercel Only',
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
