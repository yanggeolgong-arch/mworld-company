import { NextRequest, NextResponse } from 'next/server';
import { logUserEntry } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const utm_term = typeof body?.utm_term === 'string' ? body.utm_term : undefined;
    const utm_source = typeof body?.utm_source === 'string' ? body.utm_source : undefined;
    const ok = await logUserEntry(utm_term, utm_source);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
