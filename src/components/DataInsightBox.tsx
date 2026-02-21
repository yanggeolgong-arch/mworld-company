'use client';

/**
 * Data Insight Box - AI Analysis UI for each restaurant entry
 * Displays: AI Algorithm Score, Sentiment Index, Local Popularity
 */

export interface DataInsightProps {
  aiScore: number;
  sentimentPositive: number;
  sentimentNegative: number;
  localPopularity: 'Verified by data' | 'High' | 'Moderate';
}

export function DataInsightBox({
  aiScore,
  sentimentPositive,
  sentimentNegative,
  localPopularity,
}: DataInsightProps) {
  const sentimentLabel =
    sentimentPositive >= 90
      ? 'Highly Positive'
      : sentimentPositive >= 75
        ? 'Positive'
        : sentimentPositive >= 50
          ? 'Mixed'
          : 'Negative';

  const popularityColor =
    localPopularity === 'Verified by data'
      ? 'text-emerald-400'
      : localPopularity === 'High'
        ? 'text-amber-400'
        : 'text-slate-400';

  return (
    <div
      className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm"
      role="region"
      aria-label="AI Data Insight"
    >
      <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
        Data Insight
      </h4>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-slate-500">AI Algorithm Score</span>
          <span className="text-2xl font-semibold text-emerald-400">{aiScore}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-slate-500">Sentiment Index</span>
          <span className="text-sm font-medium text-slate-200">
            {sentimentPositive}% / {sentimentNegative}%
          </span>
          <span className="text-xs text-slate-400">{sentimentLabel}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-slate-500">Local Popularity</span>
          <span className={`text-sm font-medium ${popularityColor}`}>{localPopularity}</span>
        </div>
      </div>
    </div>
  );
}
