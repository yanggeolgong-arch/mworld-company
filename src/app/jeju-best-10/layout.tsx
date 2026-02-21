import type { Metadata } from 'next';

const BASE_URL = 'https://www.aijeju.co.kr';

export const metadata: Metadata = {
  title: 'Jeju Best 10 | Jeju Gourmet AI Research Lab - AIJEJU.CO.KR',
  description:
    'AI-analyzed top 10 restaurants in Jeju Island. Data-driven culinary intelligence. Real-time data mining delivers optimal gourmet solutions.',
  keywords: [
    'Jeju restaurants',
    'Jeju best food',
    'AI gourmet',
    'Jeju Island dining',
    'Jeju Gourmet AI Research Lab',
  ],
  alternates: {
    canonical: `${BASE_URL}/jeju-best-10`,
    languages: {
      'x-default': `${BASE_URL}/jeju-best-10`,
      en: `${BASE_URL}/jeju-best-10`,
      ko: `${BASE_URL}/jeju-best-10?lang=ko`,
      ja: `${BASE_URL}/jeju-best-10?lang=ja`,
      'zh-Hans': `${BASE_URL}/jeju-best-10?lang=zh`,
    },
  },
  openGraph: {
    title: 'Jeju Best 10 | Jeju Gourmet AI Research Lab',
    description:
      'Data-Driven Culinary Intelligence for Jeju Island. AI-analyzed top 10 restaurants.',
    type: 'website',
    url: `${BASE_URL}/jeju-best-10`,
    siteName: '제주 미식 AI 연구소 (Jeju Gourmet AI Research Lab)',
  },
  other: {
    'max-image-preview': 'large',
  },
};

export default function JejuBest10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
