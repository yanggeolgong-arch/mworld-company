'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

/**
 * Vercel Analytics를 lazyOnload 시점에 로드.
 * 첫 화면 렌더에 집중시키기 위해 load 이벤트 이후에 마운트.
 */
export function DeferredAnalytics() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const onLoad = () => setMounted(true);
    if (typeof window === 'undefined') return;
    if (document.readyState === 'complete') {
      onLoad();
      return;
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return mounted ? <Analytics /> : null;
}
