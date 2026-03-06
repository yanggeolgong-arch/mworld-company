import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = 'https://aikoreadatalab.com';
const OG_IMAGE = `${BASE_URL}/images/jeju-ai-culinary-intelligence-center.jpg`;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'AI KOREA DATA LAB',
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
    title: 'AI KOREA DATA LAB',
    description: 'Data-Driven Culinary Intelligence.',
    type: 'website',
    url: BASE_URL + '/',
    siteName: 'AI KOREA DATA LAB',
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1080,
        alt: 'Global Data Dashboard of AI KOREA DATA LAB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI KOREA DATA LAB',
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
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white antialiased text-[#1a202c]">{children}</body>
    </html>
  );
}
