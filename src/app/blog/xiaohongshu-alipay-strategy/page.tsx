import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { StructuredData } from '@/components/StructuredData';
import { BlogContentWithImages } from '@/components/BlogContentWithImages';
import { generateCanonicalUrl } from '@/lib/url-optimizer';
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';
import { generateStaticPostKeywords } from '@/lib/keyword-generator';
import { getStaticPostBySlug } from '@/lib/static-posts';
import { formatBlogDate } from '@/lib/blog-dates';
import { marked } from 'marked';

marked.setOptions({ breaks: true, gfm: true });

const SLUG = 'xiaohongshu-alipay-strategy';

/** 15장 영문 SEO 파일명 (제주맛집·알리페이·샤오홍슈·보조배터리 등 키워드 조합) */
const SEO_IMAGE_FILENAMES: Record<number, string> = {
  1: 'jeju-restaurant-xiaohongshu-alipay-expert-guide.webp',
  2: 'jeju-restaurant-alipay-scan-payment.webp',
  3: 'jeju-food-xiaohongshu-note-search.webp',
  4: 'jeju-restaurant-alipay-wechat-logo-sign.webp',
  5: 'jeju-cafe-alipay-checkout.webp',
  6: 'jeju-cafe-alipay-power-bank-rental.webp',
  7: 'jeju-restaurant-full-house-scene.webp',
  8: 'jeju-alipay-d2-settlement.webp',
  9: 'jeju-alipay-official-sticker.webp',
  10: 'jeju-xiaohongshu-realtime-review-photo.webp',
  11: 'jeju-food-alipay-wechat-logo-placement.webp',
  12: 'jeju-restaurant-exterior.webp',
  13: 'jeju-alipay-consultation-on-site.webp',
  14: 'jeju-xiaohongshu-alipay-registration.webp',
  15: 'jeju-mworld-executive-brand.webp',
};

/** 15장 문장형 alt (변경된 파일명에 맞춘 상세 설명) */
const SENTENCE_ALT: Record<number, string> = {
  1: '엠월드컴퍼니 전문가가 제안하는 제주맛집 알리페이 결제와 샤오홍슈 상위노출 가이드',
  2: '제주맛집에서 알리페이 스캔 결제로 중화권 손님 신뢰를 높이는 현장 인증샷',
  3: '제주맛집 샤오홍슈 노트 검색 상위노출을 위한 키워드 전략',
  4: '제주맛집 입구·결제대에 알리페이·위챗 로고를 배치해 결제 전환을 높이는 방법',
  5: '제주 카페에서 알리페이 결제로 원화 D+2 정산받는 실무 사례',
  6: '제주맛집 보조배터리 대여로 체류 시간과 샤오홍슈 인증샷을 늘리는 10년 노하우',
  7: '제주맛집 만석 장면: 알리페이·보조배터리로 중화권 재방문을 만든 사례',
  8: '제주맛집 알리페이 원화 D+2 정산 입금으로 운영 부담을 줄이는 방법',
  9: '제주맛집 알리페이 공식 스티커 부착으로 검색 신뢰도를 높이는 팁',
  10: '제주맛집 샤오홍슈 실시간 리뷰·인증샷으로 상위노출을 끌어올리는 포토존',
  11: '제주맛집 알리페이·위챗 로고 2~3곳 배치로 결제 신뢰와 상위노출을 동시에 확보',
  12: '제주맛집 외관과 입구 로고 노출로 첫 인상에서 결제 가능을 전달하는 방법',
  13: '엠월드컴퍼니 현장 컨설팅으로 제주맛집 알리페이·샤오홍슈 도입부터 상위노출까지',
  14: '제주맛집 샤오홍슈·알리페이 등록 문의와 10년 실행 노하우',
  15: '엠월드컴퍼니 제주맛집 알리페이·샤오홍슈 상위노출 10년 실행 브랜드',
};

export async function generateMetadata(): Promise<Metadata> {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return { title: '엠월드컴퍼니 | 포스트를 찾을 수 없습니다' };
  }
  const canonicalUrl = generateCanonicalUrl(`/blog/${SLUG}`);
  const keywords = generateStaticPostKeywords(staticPost.title, staticPost.category, staticPost.description);
  return {
    title: `${staticPost.title} - 엠월드컴퍼니 알고리즘 확산 블로그`,
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

export default async function XiaohongshuAlipayStrategyPage() {
  const staticPost = getStaticPostBySlug(SLUG);
  if (!staticPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const mdxPath = join(process.cwd(), 'src', 'content', 'blog', `${SLUG}.mdx`);
  let mdxContent = '';
  try {
    mdxContent = readFileSync(mdxPath, 'utf-8');
  } catch (error) {
    console.error('Failed to read MDX file:', error);
  }

  const markdownContent = mdxContent.replace(/^\{[\s\S]*?\}\n\n/, '');
  // 15장 전량 영문 SEO 파일명·WebP·문장형 alt·priority(1,2) 로딩으로 성능 98점 유지
  const imageMap: Record<string, { src: string; alt: string }> = {};
  for (let i = 1; i <= 15; i++) {
    imageMap[String(i)] = {
      src: `/images/blog/xiaohongshu-alipay-strategy/${SEO_IMAGE_FILENAMES[i]}`,
      alt: SENTENCE_ALT[i] || `엠월드컴퍼니 제주맛집 알리페이·샤오홍슈 전문가 인사이트 ${i}`,
    };
  }
  const priorityImageKeys = ['1', '2'];

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
    author: { '@type': 'Person', name: '엠월드컴퍼니 최고실행자', jobTitle: '10년 이상 실행사 대표 전문가' },
    publisher: {
      '@type': 'Organization',
      name: '엠월드컴퍼니',
      logo: { '@type': 'ImageObject', url: 'https://www.aijeju.co.kr/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: '小红书, 支付宝, 济州岛美食, 充电宝, 微信支付, 제주맛집, 샤오홍슈, 알리페이',
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
                      className={
                        index === breadcrumbs.length - 1
                          ? 'text-[#F2F2F2] font-medium'
                          : 'text-[#F2F2F2]/80 hover:text-emerald-400 transition-colors'
                      }
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

            {/* 시리즈 정주행: 지식의 사슬(Backlinks) 정밀화 — Part 1·2 핵심 3문장 요약 */}
            <nav
              className="mb-10 p-6 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-[#F2F2F2]"
              aria-label="시리즈 정주행"
            >
              <h2 className="text-base font-semibold text-cyan-400 mb-4">시리즈 정주행</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-cyan-300 mb-1">Part 1</p>
                  <Link
                    href="/blog/brand-concept"
                    className="text-cyan-400 font-medium hover:text-cyan-300 underline underline-offset-2"
                  >
                    구글 상위 노출의 시작, 광고 전 &apos;컨셉 점검&apos;이 필수인 진짜 이유
                  </Link>
                  <p className="mt-2 text-[#F2F2F2]/90 leading-relaxed">
                    컨셉이 명확하지 않은 상태에서 광고를 집행하는 것은 지도 없이 길을 나서는 것과 같습니다. 구글 상위
                    노출을 위한 컨셉 점검 체크리스트와 시맨틱 DNA 설계의 기초를 공개하며, 광고 전 브랜드 메시지·타겟·차별점
                    정리가 필수임을 10년 실행 데이터로 증명합니다.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-cyan-300 mb-1">Part 2</p>
                  <Link
                    href="/blog/global-payment-dazhong-dianping"
                    className="text-cyan-400 font-medium hover:text-cyan-300 underline underline-offset-2"
                  >
                    제주맛집 성공의 비밀, 알리페이와 따종디엔핑 도입 전략
                  </Link>
                  <p className="mt-2 text-[#F2F2F2]/90 leading-relaxed">
                    중국 관광객에게 현금은 소비가 아니라 투자 자본이며, 알리페이·위챗 수용과 따종디엔핑 등록이 제주맛집
                    매출의 핵심입니다. ICB·QRick 도입으로 원화 D+2 정산을 받고, 따종디엔핑 등록·리뷰 관리까지 한 번에
                    연결하는 실전 전략을 담았습니다.
                  </p>
                </div>
              </div>
            </nav>

            <div className="[&_.prose]:text-[#F2F2F2] [&_.prose_p]:text-[#F2F2F2] [&_.prose_ul]:text-[#F2F2F2] [&_.prose_ol]:text-[#F2F2F2] [&_.prose_li]:text-[#F2F2F2] [&_.prose_blockquote]:text-[#F2F2F2]/90 [&_.prose_h2]:text-cyan-400 [&_.prose_h3]:text-amber-400 [&_.prose_strong]:text-[#fde047]">
              <BlogContentWithImages
                htmlContent={htmlContent}
                imageMap={imageMap}
                priorityImageKeys={priorityImageKeys}
              />
            </div>

            {/* Coming Next: 결론부 직후 내일의 예고편(Teaser) 카드 UI */}
            <section className="mt-10" aria-label="Coming Next">
              <h2 className="text-lg font-semibold text-[#FFD700] mb-4">Coming Next</h2>
              <div className="rounded-xl border border-white/15 bg-slate-900/50 p-5 overflow-hidden">
                <h3 className="text-base font-semibold text-[#F2F2F2] mb-3">
                  [제주맛집 성공의 마침표] 구글 지도와 샤오홍슈의 시너지 전략
                </h3>
                <ul className="space-y-2 text-sm text-[#F2F2F2]/85">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>구글 지도 리뷰와 샤오홍슈 打卡를 묶는 자동화 로직</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>지오펜싱 기초: 위치 기반 노출·리뷰 연동 전략</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Expert Insight 박스 확장: 매출 치트키 + 결제 오류 해결법 + 포토존 세팅 */}
            <aside
              className="mt-10 p-6 rounded-xl border-2 border-[#FFD700]/50 bg-gradient-to-br from-amber-950/30 to-black text-[#F2F2F2] shadow-lg shadow-amber-900/10"
              aria-label="10년 차 현장 데이터가 증명하는 매출 치트키"
            >
              <h2 className="text-xl font-bold text-[#FFD700] mb-3">
                10년 차 현장 데이터가 증명하는 매출 치트키
              </h2>
              <p className="text-sm text-[#F2F2F2]/90 mb-4">
                보조배터리 대여(充电宝)와 알리페이 로고 노출만으로도 체류 시간·결제 신뢰·UGC가 동시에 올라갑니다.
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong className="text-amber-400">보조배터리 대여(充电宝)</strong>: 중화권 손님은 결제·촬영·소셜
                  공유로 배터리 소모가 크다. 대여·충전 서비스를 제공하면 체류 시간과 UGC(小红书 노트·리뷰)가 동시에
                  늘어난다.
                </li>
                <li>
                  <strong className="text-amber-400">알리페이 로고 노출</strong>: 支付宝·微信 로고를 입구·결제대·테이블
                  tent 카드 등 2~3곳에 반복 노출하면, &quot;정식 가맹·결제 가능&quot; 신뢰와 검색 일치도가 올라간다.
                </li>
                <li>
                  <strong className="text-amber-400">현장에서만 알 수 있는 결제 오류 해결법</strong>: QR 스캔 실패 시
                  Wi-Fi·데이터 확인 후 재시도 안내, 단말기 재부팅·앱 업데이트 권유 순으로 대응하면 현금 결제 전환을
                  줄일 수 있다. &quot;网络不好请稍候&quot;(네트워크 불안정 시 잠시만 기다려 주세요) 한 문장 안내지를
                  결제대에 비치하면 클레임이 감소한다.
                </li>
                <li>
                  <strong className="text-amber-400">중국인 손님이 좋아하는 포토존 세팅법</strong>: 자연광이 들어오는
                  창가·벽면 한 곳에 小红书 스타일 포토존(간단한 문구·로고·제주 감성 소품)을 만들면 打卡 사진이 늘어나
                  노트 노출이 증가한다. 배경은 단순하고 로고는 작게 넣어 브랜드가 자연스럽게 노출되도록 한다.
                </li>
              </ul>
            </aside>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-base font-medium text-[#F2F2F2]">
                문의: KakaoTalk SG7979 | 010-4074-9343 | <span className="text-emerald-400">10년 이상</span> 실행 업무
                전문가
              </p>
              <p className="mt-2 text-sm text-[#F2F2F2]/70">엠월드컴퍼니는 결과로만 말합니다.</p>
            </div>

            {/* 1인칭 실무 톤 & 하이브리드 선언 */}
            <p className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-[#F2F2F2]/60">
              본 콘텐츠는 10년 현장 실무 데이터를 기반으로 1인 AI 기업 시스템이 최적화한 전문 원고입니다.
            </p>

            <nav className="mt-8 pt-6 border-t border-white/10 text-center" aria-label="시리즈 다시 보기">
              <h2 className="text-sm font-medium text-[#FFD700] mb-4">시리즈 다시 보기</h2>
              <ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 flex-wrap list-none">
                <li>
                  <Link
                    href="/blog/global-payment-dazhong-dianping"
                    className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2"
                  >
                    글로벌 결제 & 따종디엔핑
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/brand-concept"
                    className="text-[#FFD700] font-medium hover:opacity-90 transition-opacity underline underline-offset-2"
                  >
                    컨셉 점검
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </article>
    </>
  );
}
