import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

const Header = dynamic(() => import("@/components/Header").then((m) => ({ default: m.Header })), {
  ssr: true,
  loading: () => (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur-md h-16 flex items-center justify-center">
      <span className="text-xl font-medium text-white">엠월드컴퍼니</span>
    </header>
  ),
});

const DeferredThemeWrapper = dynamic(
  () => import("@/components/DeferredThemeWrapper").then((m) => ({ default: m.DeferredThemeWrapper })),
  { ssr: true }
);

const Footer = dynamic(() => import("@/components/Footer").then((m) => ({ default: m.Footer })), {
  ssr: true,
  loading: () => <footer className="w-full border-t border-white/5 bg-slate-950 min-h-[280px]" aria-hidden="true" />,
});

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
        <style
          dangerouslySetInnerHTML={{
            __html: `*,::before,::after{box-sizing:border-box}html,body{margin:0;padding:0;min-height:100vh;background:#020617;color:#f8fafc;font-family:var(--font-pretendard),-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@keyframes semanticDNAFadeIn{0%{opacity:0;transform:translate3d(0,30px,0) scale(0.95)}100%{opacity:1;transform:translate3d(0,0,0) scale(1)}}.animate-stagger{animation:semanticDNAFadeIn 0.8s cubic-bezier(0.4,0,0.2,1) forwards;opacity:0;will-change:transform;contain:layout style paint}.animate-stagger-delay-1{animation-delay:0.1s}.animate-stagger-delay-2{animation-delay:0.2s}.animate-stagger-delay-3{animation-delay:0.3s}.animate-stagger-delay-4{animation-delay:0.4s}.animate-stagger-delay-5{animation-delay:0.5s}.animate-stagger-delay-6{animation-delay:0.6s}.flex{display:flex}.min-h-screen{min-height:100vh}.w-full{width:100%}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-48{padding-top:12rem;padding-bottom:12rem}.items-center{align-items:center}.justify-center{justify-content:center}.flex-col{flex-direction:column}.text-center{text-align:center}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.text-white{color:#fff}.text-6xl{font-size:3.75rem}.font-light{font-weight:300}.tracking-tight{letter-spacing:-0.025em}`,
          }}
        />
        <meta name="naver-site-verification" content="6ffa483c33774a68981a4b95ad7e3169c029abe6" />
        <meta name="google-site-verification" content="9I4l_FHobA4V8PsTmiICuOS-uV5MgRl7BgmAxJcIUJ4" />
      </head>
      <body className={`${pretendard.className} antialiased`}>
        <Script id="org-schema" strategy="afterInteractive" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </Script>
        <DeferredThemeWrapper header={<Header />} footer={<Footer />} main={children} />
      </body>
    </html>
  );
}
