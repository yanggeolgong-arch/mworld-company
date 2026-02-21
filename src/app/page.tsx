import Image from 'next/image';
import Link from 'next/link';
import { DataModulesSection } from '@/components/DataModulesSection';
import { InteractiveJejuMap } from '@/components/InteractiveJejuMap';
import { LiveDataCounter } from '@/components/LiveDataCounter';
import { ReportsFooter } from '@/components/ReportsFooter';

export const dynamic = 'force-static';

const HERO_IMAGE = '/images/jeju-gourmet-ai-research-lab-dashboard.jpg?v=2';
const HERO_ALT =
  'Global Data Dashboard of Jeju Gourmet AI Research Lab - Analyzing Black Pork, Seafood, and Local Cafes';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white font-sans">
      <div className="relative min-h-screen">
        <div className="relative flex min-h-screen w-full items-center justify-center">
          {/* Dashboard image - brightness/contrast for bright theme */}
          <div className="absolute inset-0 brightness-[1.1] contrast-[0.95]">
            <Image
              src={HERO_IMAGE}
              alt={HERO_ALT}
              fill
              priority
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* HUD - soft gray, outer 10%, pointer-events-none */}
          <div
            className="absolute right-[5%] top-[5%] z-10 pointer-events-none"
            aria-hidden
          >
            <LiveDataCounter />
          </div>
          <div
            className="absolute bottom-[5%] left-[5%] z-10 pointer-events-none"
            aria-hidden
          >
            <div className="rounded border border-gray-200 bg-white/60 px-3 py-2 backdrop-blur-sm">
              <p className="text-[0.75rem] text-gray-500">Algorithm</p>
              <p className="text-[0.85rem] font-medium tabular-nums text-gray-700">
                Stable 2.0
              </p>
            </div>
          </div>

          {/* Main content - z-50, Safe Zone, White Glassmorphism */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6">
            <div className="flex w-full max-w-2xl flex-col items-center gap-8 px-4 py-8">
              {/* Title block - White Glassmorphism */}
              <div className="relative w-full rounded-2xl bg-white/70 px-8 py-6 backdrop-blur-md">
                <h1 className="relative z-50 text-center text-2xl font-bold leading-[1.5] tracking-tight text-[#1a202c] sm:text-3xl md:text-4xl">
                  Jeju Gourmet AI Research Lab
                </h1>
                <p className="relative z-50 mt-2 text-center text-sm leading-[1.5] text-slate-600 sm:text-base">
                  Data-Driven Culinary Intelligence
                </p>
              </div>
              {/* District Reports - focal point, high contrast */}
              <div className="relative z-50 flex w-full flex-col items-center gap-6">
                <div
                  className="flex flex-col items-center rounded-xl bg-[#0070f3]/15 px-6 py-4"
                  style={{
                    boxShadow: '0 0 0 1px rgba(0,112,243,0.2), 0 4px 12px rgba(0,112,243,0.1)',
                  }}
                >
                  <p className="mb-2 text-center text-xs font-semibold leading-[1.5] uppercase tracking-wider text-[#0070f3]">
                    District Reports
                  </p>
                  <InteractiveJejuMap />
                </div>
                <Link
                  href="/reports"
                  className="rounded-xl border-2 border-[#0070f3] bg-[#0070f3]/20 px-8 py-4 font-semibold text-[#1a202c] transition hover:bg-[#0070f3]/30"
                >
                  Access Research Data
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Clear vertical gap between Hero and 3 modules */}
        <div className="min-h-[4rem]" aria-hidden />
        <DataModulesSection />
        <ReportsFooter />
      </div>
    </main>
  );
}
