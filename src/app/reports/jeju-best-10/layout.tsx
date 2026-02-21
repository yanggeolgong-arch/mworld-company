import type { Metadata } from 'next';

const BASE_URL = 'https://www.aijeju.co.kr';

export const metadata: Metadata = {
  title: 'Jeju Best 10 | Jeju Gourmet AI Research Lab - AIJEJU.CO.KR',
  description:
    'AI-analyzed top 10 restaurants in Jeju Island. Data-driven culinary intelligence. Real-time data mining delivers optimal gourmet solutions.',
  alternates: {
    canonical: `${BASE_URL}/reports/jeju-best-10`,
  },
  openGraph: {
    title: 'Jeju Best 10 | Jeju Gourmet AI Research Lab',
    description: 'Data-Driven Culinary Intelligence for Jeju Island.',
    type: 'website',
    url: `${BASE_URL}/reports/jeju-best-10`,
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
