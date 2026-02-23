import type { Metadata } from 'next';
import { PretendardLoader } from './PretendardLoader';

export const metadata: Metadata = {
  title: 'Jeju Gourmet Intelligence: Real Battle | mworld-company.vercel.app',
  description: 'Data-Driven Culinary Intelligence · Stealth Best 10 · v1.1',
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
