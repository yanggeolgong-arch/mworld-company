import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import JejuRealMaster from '@/components/JejuRealMaster';

export const dynamic = 'force-dynamic';

function isVercelHost(host: string | null): boolean {
  if (!host) return false;
  return host.endsWith('.vercel.app') || host === 'vercel.app';
}

export default async function StealthBest3Page() {
  const headersList = await headers();
  const host = headersList.get('host') ?? headersList.get('x-forwarded-host');
  if (!isVercelHost(host)) {
    notFound();
  }
  return <JejuRealMaster />;
}
