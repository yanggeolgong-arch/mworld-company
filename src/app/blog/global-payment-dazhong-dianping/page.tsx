import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
// import { BlogSeriesBacklinks } from '@/components/BlogSeriesBacklinks'; // 기존 컴포넌트 제거
import { MasterClassHomeBacklink } from '@/components/MasterClassHomeBacklink';
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { generateStaticPostKeywords } from '@/lib/keyword-generator';
import { getStaticPostBySlug } from '@/lib/static-posts';
import { formatBlogDate } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

const SLUG = 'global-payment-dazhong-dianping';

const GLOBAL_SEO_FILES: Record<number, string> = {
  1: 'jeju-icb-official-agent-certificate.webp',
  2: 'jeju-qrick-alipay-wechat-kakao-payment.webp',
  3: 'jeju-restaurant-young-global-guests.webp',
  4: 'jeju-dazhong-dianping-app-review-rank.webp',
  5: 'jeju-smartphone-qr-scan-payment.webp',
  6: 'jeju-payment-success-global-couple.webp',
  7: 'jeju-restaurant-full-house-interior.webp',
  8: 'jeju-krw-d2-settlement-sms.webp',
  9: 'jeju-alipay-official-sticker-interior.webp',
  10: 'jeju-dazhong-dianping-realtime-review-photo.webp',
  11: 'jeju-local-parking-storefront.webp',
  12: 'jeju-restaurant-waiting-global-guests.webp',
  13: 'jeju-mworld-consulting-on-site.webp',
  14: 'jeju-dazhong-dianping-inquiry-sg7979.webp',
  15: 'jeju-mworld-brand-execution-no1.webp',
};
const GLOBAL_ALT_SENTENCE: Record<number, string> = {
  1: '공양걸AI연구소 ICB 공식 대행사 인증서로 제주맛집 글로벌 결제 신뢰를 높이는 방법',
  2: '제주맛집 QRick 통합 결제 UI로 알리페이·위챗·카카오 한 번에 받는 현장',
  3: '제주맛집에 가득한 20대 글로벌 손님과 알리페이·따종디엔핑 연계',
  4: '따종디엔핑 앱으로 맛집 순위와 리뷰를 확인하는 제주 관광객',
  5: '제주맛집 스마트폰 QR 스캔 결제로 원화 D+2 정산받는 방법',
  6: '결제 성공 후 미소 짓는 글로벌 커플과 제주맛집 재방문',
  7: '빈자리 없이 만석인 제주맛집 내부와 알리페이·따종디엔핑 효과',
  8: '제주맛집 알리페이 원화 KRW D+2 정산 입금 문자 확인',
  9: '제주맛집 인테리어에 부착된 공식 알리페이 스티커로 신뢰도 상승',
  10: '제주맛집 음식 촬영 후 실시간 따종디엔핑 리뷰로 상위 노출',
  11: '제주 현지 실무 데이터 주차 정보와 매장 외부 전경',
  12: '제주맛집 밖에서 대기 중인 트렌디한 글로벌 관광객',
  13: '공양걸AI연구소 전문가의 제주맛집 알리페이·따종디엔핑 상담 현장',
  14: '따종디엔핑 등록문의 한글 그래픽 ID SG7979',
  15: '공양걸AI연구소 브랜드 로고와 제주 No.1 실행 문구',
};

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return { title: '공양걸AI연구소 | 포스트를 찾을 수 없습니다' };
  }
  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  const keywords = generateStaticPostKeywords(staticPost.title, staticPost.category, staticPost.description);
  return {
    title: `${staticPost.title} - 공양걸AI연구소 알고리즘 확산 블로그`,
    description: staticPost.description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: staticPost.title,
      description: staticPost.description,
      type: 'article',
      publishedTime: staticPost.date,
      url: canonicalUrl,
    },
  };
}

export default async function GlobalPaymentDazhongDianpingPage() {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const mdxPath = join(process.cwd(), 'src', 'content', 'blog', 'global-payment-dazhong-dianping.mdx');
  let mdxContent = '';
  try {
    mdxContent = readFileSync(mdxPath, 'utf-8');
  } catch (error) {
    console.error('Failed to read MDX file:', error);
  }

  const markdownContent = mdxContent.replace(/^\{[\s\S]*?\}\n\n/, '');
  // 이미지 SEO 소급: 영문 키워드·전량 WebP·문장형 alt·LCP priority (성능 98점)
  const imageMap: Record<string, { src: string; alt: string }> = {};
  for (let i = 1; i <= 15; i++) {
    imageMap[String(i)] = {
      src: `/images/blog/global/${GLOBAL_SEO_FILES[i]}`,
      alt: GLOBAL_ALT_SENTENCE[i] || `제주맛집 글로벌 결제·따종디엔핑 전문가 인사이트 ${i}`,
    };
  }
  const priorityImageKeys = ['1'];

  let processedMarkdown = markdownContent;
  for (let i = 1; i <= 15; i++) {
    const regex = new RegExp(`!\\[IMAGE:${i}:(.+?)\\]`, 'g');
    processedMarkdown = processedMarkdown.replace(regex, `<!--IMAGE_PLACEHOLDER:${i}-->`);
  }

  const raw = marked(processedMarkdown);
  const htmlContent = typeof raw === 'string' ? raw : await raw;

  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  const breadcrumbs = generateBlogBreadcrumbs(SLUG, staticPost.title, staticPost.category);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: staticPost.title,
    description: staticPost.description,
    url: canonicalUrl,
    datePublished: staticPost.date,
    dateModified: '2026-02-06',
    author: { '@type': 'Person', name: '공양걸AI연구소 최고실행자', jobTitle: '10년 이상 실행사 대표 전문가' },
    publisher: { '@type': 'Organization', name: '공양걸AI연구소', logo: { '@type': 'ImageObject', url: 'https://www.aijeju.co.kr/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: '글로벌 결제, 따종디엔핑, 알리페이, 제주맛집, 중국 관광객, ICB, QRick',
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={blogPostingSchema} />
      <article className="min-h-screen bg-black flex flex-col items-center justify-center">
        <section className="w-full mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl border border-white/10 p-8 bg-black">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-2 text-sm text-[#F2F2F2]/80">
                {breadcrumbs.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    <Link
                      href={item.url}
                      prefetch={false}
                      className={index === breadcrumbs.length - 1 ? 'text-[#F2F2F2] font-medium' : 'text-[#F2F2F2]/80 hover:text-emerald-400 transition-colors'}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <header className="mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-[#F2F2F2]/80 mb-4">
                <span className="font-light">{staticPost.category}</span>
                <span>•</span>
                <time dateTime={staticPost.date} className="font-light">
                  {formatBlogDate(staticPost.date)}
                </time>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-[#F2F2F2] sm:text-5xl text-center">
                {staticPost.title}
              </h1>
            </header>

            {/* 블랙 배경(#000) + 연한 회색(#F2F2F2) 가독성 극대화 */}
            <div className="[&_.prose]:text-[#F2F2F2] [&_.prose_p]:text-[#F2F2F2] [&_.prose_ul]:text-[#F2F2F2] [&_.prose_ol]:text-[#F2F2F2] [&_.prose_li]:text-[#F2F2F2] [&_.prose_blockquote]:text-[#F2F2F2]/90 [&_.prose_h2]:text-cyan-400 [&_.prose_h3]:text-amber-400 [&_.prose_strong]:text-[#fde047]">
              <BlogContentWithImages htmlContent={htmlContent} imageMap={imageMap} priorityImageKeys={priorityImageKeys} />
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-[#F2F2F2]">
                문의: KakaoTalk: SG7979 | 010-4074-9343 | <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가
              </p>
              <p className="mt-2 text-sm text-[#F2F2F2]/70">공양걸AI연구소는 결과로만 말합니다.</p>
            </div>

            {/* 시리즈 다시 보기 - 백링크 3개, #FFD700 포인트 (블랙 테마 조화) */}
            <nav className="mt-8 pt-6 border-t border-white/10 text-center" aria-label="시리즈 다시 보기">
              <h2 className="text-sm font-medium text-[#FFD700] mb-4">시리즈 다시 보기</h2>
              <ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 flex-wrap list-none">
                <li>
                  <Link href="/blog/brand-concept" prefetch={false} className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2">
                    1편 · 구글 상위 노출 컨셉 점검
                  </Link>
                </li>
                <li>
                  <Link href="/blog/insta-shortform" prefetch={false} className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2">
                    2편 · 제주맛집 인스타그램 마케팅
                  </Link>
                </li>
                <li>
                  <Link href="/blog/1인-기업-알고리즘-확산-시장-장악-로드맵" prefetch={false} className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2">
                    3편 · 1인 기업 알고리즘 확산 로드맵
                  </Link>
                </li>
              </ul>
            </nav>

            {/* 다음 포스팅 예고 - 블랙(#000)·포인트(#FFD700) 유지 */}
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <h2 className="text-sm font-medium text-[#FFD700] mb-2">다음 포스팅 예고</h2>
              <p className="text-[#F2F2F2]/90 font-medium">
                제주맛집 매출의 완성: 인스타는 기본, 샤오홍슈로 중화권 MZ의 심장을 쏘는 법
              </p>
              <p className="mt-3 text-sm text-[#F2F2F2]/75 max-w-2xl mx-auto leading-relaxed">
                인스타 마케팅은 이제 기본이다. 다만 대만·싱가포르·필리핀을 포함한 화교권 MZ는 <span className="text-[#FFD700]">샤오홍슈(小红书)</span>에서 맛집을 찾는다. 인스타만으로는 그들의 심장을 건드리기 어렵다. 10년 차 현장에서 본 결론: 샤오홍슈는 중화권 관광객 공략의 <span className="text-[#FFD700]">필수 부스터</span>다.
              </p>
            </div>
            <MasterClassHomeBacklink />
          </div>
        </section>
      </article>
    </>
  );
}
