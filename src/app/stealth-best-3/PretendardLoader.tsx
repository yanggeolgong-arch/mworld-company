'use client';

import { useEffect } from 'react';

export function PretendardLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';
    document.head.appendChild(link);
    return () => link.remove();
  }, []);
  return null;
}
