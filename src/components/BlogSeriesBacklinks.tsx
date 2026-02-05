import Link from 'next/link';

/** 시리즈 백링크: 1~6편. xiaohongshu-zhonghua-mz 삭제, xiaohongshu-alipay-strategy 6편. */
const SERIES = [
  { slug: 'brand-concept', label: '1편', title: '구글 상위 노출의 시작, 광고 전 컨셉 점검이 필수인 진짜 이유', href: '/blog/brand-concept' },
  { slug: 'insta-shortform', label: '2편', title: '제주맛집 인스타그램 마케팅 - 당신의 숏폼이 조회수 0인 진짜 이유', href: '/blog/insta-shortform' },
  { slug: '1인-기업-알고리즘-확산-시장-장악-로드맵', label: '3편', title: '1인 기업의 알고리즘 확산 점유 로드맵', href: '/blog/1인-기업-알고리즘-확산-시장-장악-로드맵' },
  { slug: 'global-payment-dazhong-dianping', label: '4편', title: '글로벌 결제 & 따종디엔핑 전략 - 중국 관광객 현금을 거부하면 안 되는 진짜 이유', href: '/blog/global-payment-dazhong-dianping' },
  { slug: 'ai-1인-기업-10명-대행사-압도', label: '5편', title: 'AI로 무장한 1인 기업이 10명 규모의 대행사를 압도하는 법', href: '/blog/ai-1인-기업-10명-대행사-압도' },
  { slug: 'xiaohongshu-alipay-strategy', label: '6편', title: '제주맛집 샤오홍슈·알리페이 전략 - 보조배터리와 로고 배치', href: '/blog/xiaohongshu-alipay-strategy' },
] as const;

type CurrentSlug = (typeof SERIES)[number]['slug'];

interface BlogSeriesBacklinksProps {
  currentSlug: CurrentSlug;
}

export function BlogSeriesBacklinks({ currentSlug }: BlogSeriesBacklinksProps) {
  return (
    <div className="mt-8 pt-6 border-t border-white/10 text-center">
      <p className="text-sm text-slate-400 mb-3">
        엠월드컴퍼니 <span className="text-emerald-400">10년 이상</span> 실행 업무 전문가의 시리즈 (E-E-A-T 검증 콘텐츠)
      </p>
      <nav aria-label="시리즈 백링크" className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {SERIES.map((item) => {
          const isCurrent = item.slug === currentSlug;
          return (
            <span key={item.slug} className="flex items-center gap-1.5">
              {isCurrent ? (
                <span className="text-slate-400 font-medium" aria-current="page">
                  {item.label} · {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors underline underline-offset-2"
                >
                  {item.label} · {item.title}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
