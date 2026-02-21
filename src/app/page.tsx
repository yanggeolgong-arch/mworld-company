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
    <main className="relative min-h-screen bg-slate-950 font-sans">
      <div className="relative min-h-screen">
        <div className="relative flex min-h-screen w-full items-center justify-center">
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
          {/* Subtle HUD - top right */}
          <div className="absolute right-4 top-4 z-10 flex gap-3 opacity-65 transition-opacity hover:opacity-100">
            <LiveDataCounter />
            <div className="rounded border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-sm">
              <p className="text-[0.75rem] text-slate-400">Algorithm</p>
              <p className="text-[0.85rem] font-medium tabular-nums text-white">
                Stable 2.0
              </p>
            </div>
          </div>

          {/* Main content - centered, highest z-index */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8 bg-black/20 p-6">
            <h1 className="text-center text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl">
              Jeju Gourmet AI Research Lab
            </h1>
            <p className="text-center text-sm text-slate-300">
              Data-Driven Culinary Intelligence
            </p>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
                  District Reports
                </p>
                <InteractiveJejuMap />
              </div>
              <Link
                href="/reports"
                className="rounded-xl border-2 border-emerald-500/60 bg-emerald-500/20 px-8 py-4 font-semibold text-white shadow-lg transition hover:border-emerald-400 hover:bg-emerald-500/30"
              >
                Access Research Data
              </Link>
            </div>
          </div>
        </div>
        <DataModulesSection />
        <ReportsFooter />
      </div>
    </main>
  );
}
