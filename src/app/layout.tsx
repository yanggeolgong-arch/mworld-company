import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = 'https://www.aijeju.co.kr';
const OG_IMAGE = `${BASE_URL}/images/jeju-gourmet-ai-research-lab-dashboard.jpg`;

export const metadata: Metadata = {
  title: 'Jeju Gourmet AI Research Lab',
  description: 'Data-Driven Culinary Intelligence.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL + '/',
    languages: {
      'x-default': BASE_URL + '/',
      en: BASE_URL + '/',
      ko: BASE_URL + '/?lang=ko',
      ja: BASE_URL + '/?lang=ja',
      'zh-Hans': BASE_URL + '/?lang=zh',
    },
  },
  openGraph: {
    title: 'Jeju Gourmet AI Research Lab',
    description: 'Data-Driven Culinary Intelligence.',
    type: 'website',
    url: BASE_URL + '/',
    siteName: 'Jeju Gourmet AI Research Lab',
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1080,
        alt: 'Global Data Dashboard of Jeju Gourmet AI Research Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeju Gourmet AI Research Lab',
    description: 'Data-Driven Culinary Intelligence.',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased text-[#1a202c]">{children}</body>
    </html>
  );
}
