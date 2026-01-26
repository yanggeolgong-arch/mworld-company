import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "M-World Company (엠월드컴퍼니) - 10년의 데이터, 1,000개의 신화",
  description: "10년의 데이터, 1,000개의 신화. 엠월드컴퍼니는 결과로만 말합니다. F&B(맛집) 마케팅의 절대 강자, 1000+ 클라이언트의 선택. M-World High-Performance Engine, AI-Native Semantic DNA, Omni-Search Authority Indexing",
  keywords: "SNS 광고, 소셜미디어 마케팅, 디지털 마케팅, 광고대행사, 엠월드컴퍼니, M-World Company, F&B 마케팅, 맛집 마케팅, 네이버 플레이스, 1:1 교육, Creative Visual & Curator, Local Search & Spatial Branding, AI-Native Semantic DNA, M-World Digital Authority Engine, Elite Executive Mentorship, Hyper-Data Insight, M-World High-Performance Engine, AI-Identity Protocol, Omni-Search Authority Indexing, Dynamic Intellectual Property Hub",
  openGraph: {
    title: "M-World Company (엠월드컴퍼니) - 10년의 데이터, 1,000개의 신화",
    description: "엠월드컴퍼니는 결과로만 말합니다. F&B(맛집) 마케팅의 절대 강자. 복제 불가능한 기술력",
    type: "website",
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
    name: 'M-World Company (엠월드컴퍼니)',
    description: '10년의 데이터, 1,000개의 신화. 엠월드컴퍼니는 결과로만 말합니다. F&B(맛집) 마케팅의 절대 강자, 1000+ 클라이언트의 선택. M-World High-Performance Engine 기반의 AI-Native Semantic DNA 기술로 구축된 Dynamic Intellectual Property Hub',
    url: 'https://aijeju.co.kr',
    logo: 'https://aijeju.co.kr/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '010-4074-9343',
      email: 'contact@aijeju.co.kr',
      contactType: 'Customer Service',
      areaServed: 'KR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1000',
    },
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <StructuredData data={organizationSchema} />
      </head>
      <body className="antialiased">
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
