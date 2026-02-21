import Image from 'next/image';

export const dynamic = 'force-static';

const HERO_IMAGE = '/images/jeju-gourmet-ai-research-lab-dashboard.jpg';
const HERO_ALT =
  'Global Data Dashboard of Jeju Gourmet AI Research Lab - Analyzing Black Pork, Seafood, and Local Cafes';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950">
      <div className="relative h-screen w-full">
        <Image
          src={HERO_IMAGE}
          alt={HERO_ALT}
          fill
          priority
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 shadow-2xl backdrop-blur-xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-emerald-400/90">
              Live AI Analysis
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-2xl font-semibold text-white">1.04M</p>
                <p className="text-sm text-slate-400">Data Points</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">Stable 2.0</p>
                <p className="text-sm text-slate-400">Algorithm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
