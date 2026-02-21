import Link from 'next/link';
import { REPORTS } from '@/lib/reports';

const CATEGORIES = ['Culinary', 'Hospitality', 'Tourism', 'Analytics'] as const;

type ReportItem = (typeof REPORTS)[number];

export function ReportsFooter() {
  const byCategory = CATEGORIES.reduce<Record<string, ReportItem[]>>(
    (acc, cat) => {
      acc[cat] = REPORTS.filter((r) => r.category === cat);
      return acc;
    },
    {},
  );

  return (
    <footer className="border-t border-white/5 bg-slate-950/95 px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
          Stealth Reports · Crawl Index
        </p>
        <nav className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Report links">
          {CATEGORIES.map((cat) => (
            <div key={cat}>
              <h3 className="mb-2 text-sm font-medium text-slate-400">{cat}</h3>
              <ul className="space-y-1">
                {byCategory[cat]?.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/reports/${r.slug}`}
                      className="text-sm text-slate-500 transition hover:text-emerald-400"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="mt-6 text-center text-xs text-slate-600">
          Jeju Gourmet AI Research Lab · Data-Driven Culinary Intelligence
        </p>
      </div>
    </footer>
  );
}
