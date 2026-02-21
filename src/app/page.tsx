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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/20 p-4">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-8 py-6 shadow-2xl backdrop-blur-xl">
                <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-emerald-400/90">
                  Live AI Analysis
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <LiveDataCounter />
                  <div className="rounded-lg border border-white/10 bg-slate-800/80 px-4 py-3 text-center">
                    <p className="text-sm text-slate-400">Algorithm</p>
                    <p className="text-2xl font-semibold text-white">Stable 2.0</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
                  District Reports
                </p>
                <InteractiveJejuMap />
              </div>
            </div>
            <Link
              href="/reports"
              className="rounded-xl border-2 border-emerald-500/60 bg-emerald-500/20 px-8 py-4 font-semibold text-white shadow-lg transition hover:border-emerald-400 hover:bg-emerald-500/30"
            >
              Access Research Data
            </Link>
          </div>
        </div>
        <DataModulesSection />
        <ReportsFooter />
      </div>
    </main>
  );
}
