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
      className="rounded border border-gray-200 bg-white/60 px-3 py-2 backdrop-blur-sm"
    >
      <p className="text-[0.75rem] text-gray-500">Data Points</p>
      <p className="text-[0.85rem] font-medium tabular-nums text-gray-700">
        {count.toLocaleString()}
      </p>
    </div>
  );
}
