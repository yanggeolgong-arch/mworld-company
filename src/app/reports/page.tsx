import Link from 'next/link';

export const dynamic = 'force-static';

const REPORTS = [
  {
    slug: 'jeju-best-10',
    title: 'Jeju Best 10',
    description: 'AI-analyzed top 10 restaurants in Jeju Island. Data-driven culinary intelligence.',
    date: '2026-02',
  },
];

export default function ReportsPage() {
  return (
    <article className="min-h-screen bg-black">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <nav className="mb-6" aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
            >
              ← Home
            </Link>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              Research Reports
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Stealth Reports
          </h1>
          <p className="mt-2 text-lg text-slate-300">
            We don&apos;t blog. We analyze.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="space-y-6">
          {REPORTS.map((report) => (
            <Link
              key={report.slug}
              href={`/reports/${report.slug}`}
              prefetch={false}
              className="block rounded-2xl border border-white/10 bg-slate-950/80 p-6 transition-colors hover:border-emerald-400/20"
            >
              <h2 className="text-xl font-semibold text-white">{report.title}</h2>
              <p className="mt-2 text-slate-400">{report.description}</p>
              <p className="mt-2 text-xs text-slate-500">{report.date}</p>
            </Link>
          ))}
        </div>
      </main>
    </article>
  );
}
