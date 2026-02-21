import Link from 'next/link';
import nextDynamic from 'next/dynamic';

export const dynamic = 'force-static';

const HomeBelowFoldLazy = nextDynamic(
  () => import('@/components/HomeBelowFold').then((m) => ({ default: m.HomeBelowFold })),
  { ssr: true }
);

export default function Home() {
  return (
    <article className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <section className="relative w-full mx-auto max-w-7xl px-6 py-48 lg:px-8 flex flex-col items-center justify-center min-h-[70vh]" style={{ minHeight: '70vh' }} aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" aria-hidden="true" />
        <div className="relative w-full mx-auto max-w-4xl flex flex-col items-center justify-center text-center animate-stagger">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
              Jeju Gourmet AI Research Lab
            </span>
          </div>
          <h1 id="hero-heading" className="text-6xl font-light tracking-tight text-white sm:text-7xl lg:text-8xl text-center whitespace-pre-line">
            {`Data-Driven\nCulinary Intelligence\nfor Jeju Island.`}
          </h1>
          <p className="mt-8 text-xl font-light leading-relaxed text-slate-200 max-w-2xl mx-auto">
            We don&apos;t blog. We analyze. AI-powered gourmet research delivering optimal solutions through real-time data mining.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a href="tel:010-4074-9343" className="text-lg font-bold text-slate-200 hover:underline">
              문의: 010-4074-9343
            </a>
            <Link
              href="/reports"
              prefetch={false}
              className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-5 py-2.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-400/20"
            >
              Research Reports <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/insights"
              prefetch={false}
              className="text-sm font-medium leading-6 text-slate-200 transition-colors hover:text-emerald-400"
            >
              인사이트 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* 10년 이상 실행 업무 전문가 시각화 */}
        <div className="relative w-full mx-auto mt-32 max-w-5xl flex flex-col items-center justify-center text-center">
          <div className="grid grid-cols-3 gap-8 justify-items-center">
            <div className="space-y-2 flex flex-col items-center">
              <div className="text-4xl font-light text-emerald-400">10년+</div>
              <div className="text-sm font-light text-slate-300">실행 업무 전문가</div>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <div className="text-4xl font-light text-[#d4af37]">1,000+</div>
              <div className="text-sm font-light text-slate-300">성공 레퍼런스</div>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <div className="text-4xl font-light text-emerald-400">100%</div>
              <div className="text-sm font-light text-slate-300">결과 중심</div>
            </div>
          </div>
        </div>
      </section>

      <HomeBelowFoldLazy />
    </article>
  );
}
