import Link from 'next/link';
import { REPORTS } from '@/lib/reports';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Stealth Reports | Jeju Gourmet AI Research Lab',
  description: 'Data-Driven Culinary Intelligence. Access research data.',
};

export default function ReportsIndexPage() {
  return (
    <main className="min-h-screen bg-white text-[#1a202c]">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-[#1a202c]">Stealth Reports</h1>
        <p className="mb-8 text-slate-600">
          We analyze. We don&apos;t blog. Data-Driven Culinary Intelligence.
        </p>
        <ul className="space-y-3">
          {REPORTS.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/reports/${r.slug}`}
                className="block rounded-lg border border-gray-200 bg-white/70 px-4 py-3 text-center transition hover:border-[#0070f3]/40 hover:bg-white/90"
              >
                <span className="text-xs text-[#0070f3]">{r.category}</span>
                <p className="font-medium text-[#1a202c]">{r.title}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-slate-600 hover:text-[#0070f3]"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
