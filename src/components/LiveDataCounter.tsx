'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const BASE = 1_040_000;
const INCREMENT = 47;

export function LiveDataCounter() {
  const [count, setCount] = useState(BASE);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseEnter = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCount((c) => c + INCREMENT);
    }, 80);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCount(BASE);
  }, []);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition hover:border-emerald-500/30 hover:bg-white/10"
    >
      <p className="text-sm text-slate-400">Data Points</p>
      <p className="text-2xl font-semibold tabular-nums text-white">
        {count.toLocaleString()}
      </p>
    </div>
  );
}
