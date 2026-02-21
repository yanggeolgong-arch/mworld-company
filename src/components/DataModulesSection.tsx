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
      className="flex flex-col items-center justify-center bg-white px-6 pt-24 pb-16"
      aria-label="Intelligence Report datasets"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center justify-items-center gap-8 md:grid-cols-3">
        {SLOTS.map((slot) => (
          <Link
            key={slot.slug}
            href={slot.href}
            className="flex w-full max-w-sm flex-col items-center justify-center rounded-xl border border-gray-200 bg-white/70 px-6 py-8 text-center shadow-sm backdrop-blur-md transition hover:border-[#0070f3]/40 hover:bg-white/90 hover:shadow-md"
          >
            <h3 className="mb-2 text-lg font-semibold leading-[1.5] text-[#1a202c]">
              {slot.title}
            </h3>
            <p className="text-sm leading-[1.5] text-slate-600">{slot.subtext}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
