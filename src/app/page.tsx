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
    <main className="min-h-screen bg-white font-sans">
      {/* Layer 1: Background image ONLY - z-0, separate container */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full brightness-[1.1] contrast-[0.95]">
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
          {/* White blur mask - neutralizes baked-in text in image */}
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
          />
        </div>

        {/* Layer 2: HUD - z-10, corners only */}
        <div className="absolute right-[5%] top-[5%] z-10 pointer-events-none" aria-hidden>
          <LiveDataCounter />
        </div>
        <div className="absolute bottom-[5%] left-[5%] z-10 pointer-events-none" aria-hidden>
          <div className="rounded border border-gray-200 bg-white/60 px-3 py-2 backdrop-blur-sm">
            <p className="text-[0.75rem] text-gray-500">Algorithm</p>
            <p className="text-[0.85rem] font-medium tabular-nums text-gray-700">Stable 2.0</p>
          </div>
        </div>

        {/* Layer 3: Hero Content - z-50, SEPARATE from background */}
        <section className="relative z-50 flex min-h-screen flex-col items-center justify-center p-6">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="rounded-2xl bg-white px-8 py-6">
              <h1 className="text-4xl font-extrabold leading-[1.5] tracking-tight text-[#000000]">
                Jeju Gourmet AI Research Lab
              </h1>
              <p className="mt-2 text-base font-medium leading-[1.5] text-gray-700">
                Data-Driven Culinary Intelligence
              </p>
            </div>

            {/* District Reports - primary action, high contrast */}
            <div className="rounded-2xl bg-white px-8 py-6">
              <p className="mb-4 font-extrabold tracking-tight text-[#000000] sm:text-5xl">
                District Reports
              </p>
              <div className="flex justify-center">
                <InteractiveJejuMap />
              </div>
            </div>

            <Link
              href="/reports"
              className="rounded-xl border-2 border-[#000000] bg-white px-8 py-4 font-semibold text-[#000000] transition hover:bg-gray-50"
            >
              Access Research Data
            </Link>
          </div>
        </section>
      </div>

      {/* Clean white space between Hero and 3 modules */}
      <div className="min-h-[10rem] bg-white" aria-hidden />

      <DataModulesSection />
      <ReportsFooter />
    </main>
  );
}
