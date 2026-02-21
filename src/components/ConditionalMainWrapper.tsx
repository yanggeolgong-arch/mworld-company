'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { DeferredThemeWrapper } from '@/components/DeferredThemeWrapper';

const STEALTH_PATH = '/reports';

interface ConditionalMainWrapperProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export function ConditionalMainWrapper({ header, footer, children }: ConditionalMainWrapperProps) {
  const pathname = usePathname();
  const isStealth = pathname?.startsWith(STEALTH_PATH);
  if (isStealth) {
    return <>{children}</>;
  }
  return (
    <DeferredThemeWrapper header={header} footer={footer} main={children} />
  );
}
