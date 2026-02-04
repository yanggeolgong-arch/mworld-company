import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ThemeProvider = dynamic(
  () => import("@/components/ThemeProvider").then((m) => ({ default: m.ThemeProvider })),
  { ssr: true }
);

const pretendard = localFont({
  src: [
    {
      path: "../../node_modules/pretendard-std/dist/web/static/woff2/PretendardStd-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard-std/dist/web/static/woff2/PretendardStd-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "엠월드컴퍼니 | 10년 차 전문가의 압도적 실행 전략",
  description: "엠월드컴퍼니는 1인 AI 기업의 효율성을 극대화하여 알고리즘 확산을 실현합니다. 협업 문의 카카오톡: SG7979",
  keywords: ["엠월드컴퍼니", "마케팅 전략", "알고리즘 확산", "실행사 전문가"],
  alternates: {
    canonical: 'https://www.aijeju.co.kr',
  },
  openGraph: {
    title: "엠월드컴퍼니 | 10년 차 전문가의 압도적 실행 전략",
    description: "엠월드컴퍼니는 1인 AI 기업의 효율성을 극대화하여 알고리즘 확산을 실현합니다. 협업 문의 카카오톡: SG7979",
    type: "website",
    url: 'https://www.aijeju.co.kr',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '엠월드컴퍼니',
    description: '엠월드컴퍼니는 1인 AI 기업의 효율성을 극대화하여 알고리즘 확산을 실현합니다. 10년 차 전문가의 압도적 실행 전략',
    url: 'https://www.aijeju.co.kr',
    logo: 'https://www.aijeju.co.kr/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '010-4074-9343',
      contactType: 'Customer Service',
      areaServed: 'KR',
      availableLanguage: 'ko',
      additionalProperty: {
        '@type': 'PropertyValue',
        name: '카카오톡',
        value: 'SG7979',
      },
    },
    sameAs: [
      'https://www.aijeju.co.kr',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1000',
    },
  };

  return (
    <html lang="ko" suppressHydrationWarning className={pretendard.variable}>
      <head>
        <meta name="naver-site-verification" content="6ffa483c33774a68981a4b95ad7e3169c029abe6" />
        <meta name="google-site-verification" content="9I4l_FHobA4V8PsTmiICuOS-uV5MgRl7BgmAxJcIUJ4" />
      </head>
      <body className={`${pretendard.className} antialiased`}>
        <Script id="org-schema" strategy="lazyOnload" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </Script>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
