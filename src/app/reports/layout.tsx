import type { Metadata } from 'next';

const BASE_URL = 'https://www.aijeju.co.kr';

export const metadata: Metadata = {
  title: 'Research Reports | Jeju Gourmet AI Research Lab - AIJEJU.CO.KR',
  description:
    'Data-Driven Culinary Intelligence for Jeju Island. We don\'t blog. We analyze. Professional AI research reports.',
  openGraph: {
    title: 'Research Reports | Jeju Gourmet AI Research Lab',
    description: 'We don\'t blog. We analyze. Data-driven culinary intelligence.',
    type: 'website',
    url: `${BASE_URL}/reports`,
    siteName: '제주 미식 AI 연구소 (Jeju Gourmet AI Research Lab)',
  },
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
