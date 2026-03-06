import Image from 'next/image';
import Link from 'next/link';
import { InteractiveJejuMap } from '@/components/InteractiveJejuMap';
import { LiveDataCounter } from '@/components/LiveDataCounter';

export const dynamic = 'force-static';

const HERO_IMAGE = '/images/jeju-ai-culinary-intelligence-center.jpg';
const HERO_ALT =
  'Jeju AI Culinary Intelligence Center - Global Data Dashboard';

const SLOTS = [
  { slug: 'jeju', title: 'Jeju Gourmet Best', subtext: 'AI-Curated Regional Gourmet Index', href: '/jeju/best' },
  { slug: 'seoul', title: 'Seoul Gourmet Best', subtext: 'AI-Curated Regional Gourmet Index', href: '/seoul/best' },
  { slug: 'busan', title: 'Busan Gourmet Best', subtext: 'AI-Curated Regional Gourmet Index', href: '/busan/best' },
  { slug: 'japan', title: 'Japan Gourmet Best', subtext: 'AI-Curated Regional Gourmet Index', href: '/japan/best' },
] as const;

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-white font-sans">
      <div className="relative flex h-full flex-col justify-between">
        {/* Background image - raw, no overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt={HERO_ALT}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* HUD corners */}
        <div className="absolute right-3 top-3 z-10 pointer-events-none" aria-hidden>
          <LiveDataCounter />
        </div>
        <div className="absolute bottom-[36%] left-3 z-10 pointer-events-none" aria-hidden>
          <div className="rounded border border-gray-200 bg-white px-2 py-1.5 shadow-sm">
            <p className="text-[0.65rem] text-gray-500">Algorithm</p>
            <p className="text-[0.75rem] font-medium tabular-nums text-gray-700">Stable 2.0</p>
          </div>
        </div>

        {/* Top 65% - Hero */}
        <section className="relative z-50 flex min-h-[65vh] flex-shrink-0 flex-col items-center justify-center px-4 py-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl md:text-4xl">
              AICOREADATALAB
            </h1>
            <p className="text-base font-medium text-[#000000] sm:text-lg">
              Data-Driven Culinary Intelligence
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#000000] sm:text-4xl md:text-5xl">
              District Reports
            </p>
            <div className="mt-1 flex justify-center">
              <div className="max-w-[140px]">
                <InteractiveJejuMap />
              </div>
            </div>
            <Link
              href="/reports"
              className="mt-2 rounded-lg border-2 border-[#000000] bg-white px-6 py-2.5 text-sm font-semibold text-[#000000] transition hover:bg-gray-50"
            >
              Access Research Data
            </Link>
          </div>
        </section>

        {/* Bottom 35% - 4 modules, locked to viewport bottom */}
        <section className="relative z-50 flex min-h-[35vh] flex-shrink-0 flex-col items-center justify-center overflow-hidden px-4 py-2">
          <div className="grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {SLOTS.map((slot) => (
              <Link
                key={slot.slug}
                href={slot.href}
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-4 text-center shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-sm font-semibold leading-tight text-[#000000] sm:text-base">
                  {slot.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#000000]">{slot.subtext}</p>
              </Link>
            ))}
          </div>
          <p className="mt-2 text-center text-[0.65rem] text-gray-500">
            AICOREADATALAB · Data-Driven Culinary Intelligence
          </p>
          {/* 메인 화면 내 사업자 정보 및 법적 링크 */}
          <div className="mt-4 w-full max-w-2xl mx-auto px-2">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-white/90 backdrop-blur-sm bg-black/20 rounded-lg py-2 px-3">
              <a href="#privacy" className="underline underline-offset-2 hover:text-white">개인정보처리방침</a>
              <a href="#terms" className="underline underline-offset-2 hover:text-white">이용약관</a>
              <a href="#about" className="underline underline-offset-2 hover:text-white">연구소 소개</a>
            </div>
            <p className="mt-1.5 text-center text-[9px] text-white/70">
              공양걸AI미식데이터연구소 | 대표 공양걸 | 사업자등록번호 603-20-65775
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
