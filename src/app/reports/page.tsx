import Link from 'next/link';
import { REPORTS } from '@/lib/reports';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Stealth Reports | Jeju Gourmet AI Research Lab',
  description: 'Data-Driven Culinary Intelligence. Access research data.',
};

export default function ReportsIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-2 text-2xl font-semibold">Stealth Reports</h1>
        <p className="mb-8 text-slate-400">
          We analyze. We don&apos;t blog. Data-Driven Culinary Intelligence.
        </p>
        <ul className="space-y-3">
          {REPORTS.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/reports/${r.slug}`}
                className="block rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition hover:border-emerald-500/30 hover:bg-white/10"
              >
                <span className="text-xs text-emerald-400/90">{r.category}</span>
                <p className="font-medium">{r.title}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-slate-500 hover:text-emerald-400"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
