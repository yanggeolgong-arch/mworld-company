import Link from 'next/link';

const SLOTS = [
  {
    slug: 'gourmet',
    title: 'AI-Curated Jeju Gourmet Top 10',
    subtext: 'Real-time Sentiment & Density Analysis',
    href: '/en/reports/gourmet',
  },
  {
    slug: 'cafe',
    title: 'AI-Curated Jeju Cafe Top 10',
    subtext: 'Viewpoint & Photo-Genic Index Data',
    href: '/en/reports/cafe',
  },
  {
    slug: 'stay',
    title: 'AI-Curated Jeju Premium Stay Top 10',
    subtext: 'Thermal Stability & Privacy Tiering',
    href: '/en/reports/stay',
  },
] as const;

export function DataModulesSection() {
  return (
    <section
      className="flex flex-col items-center justify-center px-6 pt-16 pb-12"
      aria-label="Intelligence Report datasets"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center justify-items-center gap-8 md:grid-cols-3">
        {SLOTS.map((slot) => (
          <Link
            key={slot.slug}
            href={slot.href}
            className="flex w-full max-w-sm flex-col items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 px-6 py-8 text-center transition hover:border-emerald-500/30 hover:bg-slate-800/80"
          >
            <h3 className="mb-2 text-lg font-semibold leading-[1.5] text-white">
              {slot.title}
            </h3>
            <p className="text-sm leading-[1.5] text-slate-400">{slot.subtext}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
