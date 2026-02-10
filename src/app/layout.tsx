import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import localFont from "next/font/local";
import { DeferredAnalytics } from "@/components/DeferredAnalytics";
import "./globals.css";

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

const Header = dynamic(() => import("@/components/Header").then((m) => ({ default: m.Header })), {
  ssr: true,
  loading: () => (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur-md h-16 flex items-center justify-center">
      <span className="text-xl font-medium text-white">엠월드컴퍼니</span>
    </header>
  ),
});

const ConditionalMainWrapper = dynamic(
  () => import("@/components/ConditionalMainWrapper").then((m) => ({ default: m.ConditionalMainWrapper })),
  { ssr: true }
);

const Footer = dynamic(() => import("@/components/Footer").then((m) => ({ default: m.Footer })), {
  ssr: true,
  loading: () => <footer className="w-full border-t border-white/5 bg-slate-950 min-h-[280px]" aria-hidden="true" />,
});

export const metadata: Metadata = {
  title: "대행사 창업의 모든 것 : 엠월드컴퍼니",
  description: "사무실 없는 1인 기업, AI 자동화로 완성하는 [대행사 창업] 마스터 클래스. 10년 차 전문가가 증명한 무인 수익화 실무 로직 공개.",
  keywords: ["엠월드컴퍼니", "마케팅 전략", "알고리즘 확산", "실행사 전문가"],
  alternates: {
    canonical: 'https://www.aijeju.co.kr',
  },
  openGraph: {
    title: "대행사 창업의 모든 것 : 엠월드컴퍼니",
    description: "사무실 없는 1인 기업, AI 자동화로 완성하는 [대행사 창업] 마스터 클래스. 10년 차 전문가가 증명한 무인 수익화 실무 로직 공개.",
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
            __html: [
              '*,::before,::after{box-sizing:border-box}html,body{margin:0;padding:0;min-height:100vh;background:#020617;color:#f8fafc;font-family:var(--font-pretendard),system-ui,-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}',
              '@keyframes semanticDNAFadeIn{0%{opacity:0;transform:translate3d(0,30px,0) scale(0.95)}100%{opacity:1;transform:translate3d(0,0,0) scale(1)}}',
              '.animate-stagger{animation:semanticDNAFadeIn 0.8s cubic-bezier(0.4,0,0.2,1) forwards;opacity:0;will-change:transform;contain:layout style paint}',
              '.animate-stagger-delay-1{animation-delay:0.1s}.animate-stagger-delay-2{animation-delay:0.2s}.animate-stagger-delay-3{animation-delay:0.3s}.animate-stagger-delay-4{animation-delay:0.4s}.animate-stagger-delay-5{animation-delay:0.5s}.animate-stagger-delay-6{animation-delay:0.6s}',
              '.flex{display:flex}.flex-col{flex-direction:column}.min-h-screen{min-height:100vh}.w-full{width:100%}.max-w-7xl{max-width:80rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-2xl{max-width:42rem}.max-w-6xl{max-width:72rem}.max-w-sm{max-width:24rem}',
              '.mx-auto{margin-left:auto;margin-right:auto}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-48{padding-top:12rem;padding-bottom:12rem}.py-16{padding-top:4rem;padding-bottom:4rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:0.5rem;padding-bottom:0.5rem}.px-8{padding-left:2rem;padding-right:2rem}.py-4{padding-top:1rem;padding-bottom:1rem}.p-6{padding:1.5rem}.p-8{padding:2rem}',
              '.mb-8{margin-bottom:2rem}.mt-8{margin-top:2rem}.mt-6{margin-top:1.5rem}.mt-12{margin-top:3rem}.mt-32{margin-top:8rem}.mt-20{margin-top:5rem}.mt-10{margin-top:2.5rem}.mt-4{margin-top:1rem}.mt-auto{margin-top:auto}',
              '.items-center{align-items:center}.justify-center{justify-content:center}.text-center{text-align:center}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.gap-2{gap:0.5rem}.gap-4{gap:1rem}.gap-8{gap:2rem}.space-y-2{--tw-space-y:0.5rem}.grid{display:grid}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.justify-items-center{justify-items:center}',
              '.text-white{color:#fff}.text-slate-200{color:#e2e8f0}.text-slate-300{color:#cbd5e1}.text-slate-400{color:#94a3b8}.text-slate-900{color:#0f172a}.text-emerald-400{color:#34d399}.bg-slate-950{background-color:#020617}.bg-\\[\\#d4af37\\]{background-color:#d4af37}.bg-slate-900\\/50{background-color:rgba(15,23,42,.5)}.bg-emerald-400\\/10{background-color:rgba(52,211,153,.1)}.bg-gradient-to-br{background:linear-gradient(to bottom right,#0f172a,#000,#0f172a)}.bg-gradient-to-t{background:linear-gradient(to top,transparent,rgba(0,0,0,.8))}',
              '.text-6xl{font-size:3.75rem}.text-xl{font-size:1.25rem}.text-4xl{font-size:2.25rem}.text-3xl{font-size:1.875rem}.text-2xl{font-size:1.5rem}.text-lg{font-size:1.125rem}.text-sm{font-size:0.875rem}.text-xs{font-size:0.75rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.tracking-tight{letter-spacing:-0.025em}.tracking-wider{letter-spacing:0.05em}.leading-relaxed{line-height:1.625}.leading-8{line-height:2rem}.leading-6{line-height:1.5rem}.uppercase{text-transform:uppercase}',
              '.rounded-full{border-radius:9999px}.rounded-2xl{border-radius:1rem}.rounded-xl{border-radius:0.75rem}.border{border-width:1px}.border-white\\/5{border-color:rgba(255,255,255,.05)}.border-emerald-400\\/30{border-color:rgba(52,211,153,.3)}.border-t{border-top-width:1px}.backdrop-blur-sm{backdrop-filter:blur(4px)}.backdrop-blur-md{backdrop-filter:blur(12px)}',
              '.sticky{position:sticky}.top-0{top:0}.z-50{z-index:50}.h-16{height:4rem}.min-h-\\[280px\\]{min-height:280px}.overflow-hidden{overflow:hidden}.aspect-video{aspect-ratio:16/9}.object-cover{object-fit:cover}.transition-all{transition:all .15s ease}.transition-colors{transition:color .15s,background-color .15s}.transition-transform{transition:transform .15s}.duration-500{transition-duration:500ms}.hover\\:scale-105:hover{transform:scale(1.05)}.hover\\:scale-110:hover{transform:scale(1.1)}.hover\\:shadow-xl:hover{box-shadow:0 20px 25px -5px rgba(0,0,0,.1)}.hover\\:shadow-2xl:hover{box-shadow:0 25px 50px -12px rgba(0,0,0,.25)}.hover\\:text-emerald-400:hover{color:#34d399}.hover\\:bg-emerald-400:hover{background-color:#34d399}.inline-flex{display:inline-flex}.flex-1{flex:1 1 0%}',
            ].join(''),
          }}
        />
        <meta name="naver-site-verification" content="6ffa483c33774a68981a4b95ad7e3169c029abe6" />
        <meta name="google-site-verification" content="9I4l_FHobA4V8PsTmiICuOS-uV5MgRl7BgmAxJcIUJ4" />
      </head>
      <body className={`${pretendard.className} antialiased`}>
        {/* 스크립트 샌드박싱: next/script strategy="lazyOnload"로 메인 스레드와 분리, 성능 영향 최소화 */}
        <Script id="org-schema" strategy="lazyOnload" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </Script>
        <ConditionalMainWrapper header={<Header />} footer={<Footer />}>{children}</ConditionalMainWrapper>
        <DeferredAnalytics />
      </body>
    </html>
  );
}
