'use client';

import Link from 'next/link';
import { DISTRICT_REPORTS } from '@/lib/reports';

const DISTRICT_LABELS: Record<string, string> = {
  'jeju-city': 'Jeju City',
  seogwipo: 'Seogwipo',
  'east-coast': 'East Coast',
  'west-coast': 'West Coast',
  hallasan: 'Hallasan',
  airport: 'Airport',
};

export function InteractiveJejuMap() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 280"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="w-full max-w-[200px] text-slate-600 transition-colors"
      aria-label="Interactive Jeju Island map - click districts for Stealth Reports"
    >
      <Link href={`/reports/${DISTRICT_REPORTS['jeju-city']}`} className="group block">
        <path
          d="M70 30 L130 30 L145 75 L130 120 L100 110 L70 75 Z"
          fill="currentColor"
          fillOpacity="0.12"
          strokeOpacity="0.5"
          className="cursor-pointer transition hover:fill-[#0070f3]/30 hover:stroke-[#0070f3]"
        />
      </Link>
      <Link href={`/reports/${DISTRICT_REPORTS.seogwipo}`} className="group block">
        <path
          d="M55 160 L100 150 L145 160 L155 240 L100 255 L45 240 Z"
          fill="currentColor"
          fillOpacity="0.12"
          strokeOpacity="0.5"
          className="cursor-pointer transition hover:fill-[#0070f3]/30 hover:stroke-[#0070f3]"
        />
      </Link>
      <Link href={`/reports/${DISTRICT_REPORTS['east-coast']}`} className="group block">
        <path
          d="M130 75 L160 90 L165 180 L145 200 L130 160 L125 120 Z"
          fill="currentColor"
          fillOpacity="0.12"
          strokeOpacity="0.5"
          className="cursor-pointer transition hover:fill-[#0070f3]/30 hover:stroke-[#0070f3]"
        />
      </Link>
      <Link href={`/reports/${DISTRICT_REPORTS['west-coast']}`} className="group block">
        <path
          d="M70 75 L40 90 L35 180 L55 200 L70 160 L75 120 Z"
          fill="currentColor"
          fillOpacity="0.12"
          strokeOpacity="0.5"
          className="cursor-pointer transition hover:fill-[#0070f3]/30 hover:stroke-[#0070f3]"
        />
      </Link>
      <Link href={`/reports/${DISTRICT_REPORTS.hallasan}`} className="group block">
        <ellipse
          cx="100"
          cy="135"
          rx="28"
          ry="35"
          fill="currentColor"
          fillOpacity="0.18"
          strokeOpacity="0.6"
          className="cursor-pointer transition hover:fill-[#0070f3]/30 hover:stroke-[#0070f3]"
        />
      </Link>
      <Link href={`/reports/${DISTRICT_REPORTS.airport}`} className="group block">
        <circle
          cx="100"
          cy="65"
          r="14"
          fill="currentColor"
          fillOpacity="0.18"
          strokeOpacity="0.6"
          className="cursor-pointer transition hover:fill-[#0070f3]/30 hover:stroke-[#0070f3]"
        />
      </Link>
      <title>{Object.entries(DISTRICT_LABELS).map(([k, v]) => `${k}: ${v}`).join(', ')}</title>
    </svg>
  );
}
