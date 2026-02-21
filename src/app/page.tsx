import Image from 'next/image';
import Link from 'next/link';
import { InteractiveJejuMap } from '@/components/InteractiveJejuMap';
import { LiveDataCounter } from '@/components/LiveDataCounter';

export const dynamic = 'force-static';

const HERO_IMAGE = '/images/jeju-gourmet-ai-research-lab-dashboard.jpg?v=4';
const HERO_ALT =
  'Global Data Dashboard of Jeju Gourmet AI Research Lab - Analyzing Black Pork, Seafood, and Local Cafes';

const SLOTS = [
  { slug: 'gourmet', title: 'AI-Curated Jeju Gourmet Top 10', subtext: 'Real-time Sentiment & Density Analysis', href: '/en/reports/gourmet' },
  { slug: 'cafe', title: 'AI-Curated Jeju Cafe Top 10', subtext: 'Viewpoint & Photo-Genic Index Data', href: '/en/reports/cafe' },
  { slug: 'stay', title: 'AI-Curated Jeju Premium Stay Top 10', subtext: 'Thermal Stability & Privacy Tiering', href: '/en/reports/stay' },
] as const;

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-white font-sans">
      <div className="relative flex h-full flex-col">
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
        <div className="absolute bottom-[42%] left-3 z-10 pointer-events-none" aria-hidden>
          <div className="rounded border border-gray-200 bg-white px-2 py-1.5 shadow-sm">
            <p className="text-[0.65rem] text-gray-500">Algorithm</p>
            <p className="text-[0.75rem] font-medium tabular-nums text-gray-700">Stable 2.0</p>
          </div>
        </div>

        {/* Top 60% - Hero */}
        <section className="relative z-50 flex min-h-[60vh] flex-shrink-0 flex-col items-center justify-center px-4 py-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
              Jeju Gourmet AI Research Lab
            </h1>
            <p className="text-base font-medium text-gray-700 sm:text-lg">
              Data-Driven Culinary Intelligence
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-5xl">
              District Reports
            </p>
            <div className="mt-1 flex justify-center">
              <div className="max-w-[140px]">
                <InteractiveJejuMap />
              </div>
            </div>
            <Link
              href="/reports"
              className="mt-2 rounded-lg border-2 border-black bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-50"
            >
              Access Research Data
            </Link>
          </div>
        </section>

        {/* Bottom 40% - 3 modules */}
        <section className="relative z-50 flex min-h-[40vh] flex-1 flex-col items-center justify-center px-4 py-3">
          <div className="grid w-full max-w-4xl grid-cols-1 gap-3 md:grid-cols-3">
            {SLOTS.map((slot) => (
              <Link
                key={slot.slug}
                href={slot.href}
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-4 text-center shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-sm font-semibold leading-tight text-black sm:text-base">
                  {slot.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-gray-700">{slot.subtext}</p>
              </Link>
            ))}
          </div>
          <p className="mt-2 text-center text-[0.65rem] text-gray-500">
            Jeju Gourmet AI Research Lab · Data-Driven Culinary Intelligence
          </p>
        </section>
      </div>
    </main>
  );
}
