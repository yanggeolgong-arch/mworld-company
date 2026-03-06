import { NextRequest, NextResponse } from 'next/server';
import { incrementStat } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const shopId = typeof body?.shopId === 'number' ? body.shopId : parseInt(String(body?.shopId), 10);
    const type = ['view', 'youtube', 'naver', 'google'].includes(body?.type) ? body.type : 'view';
    if (!shopId || shopId < 1 || shopId > 10) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const ok = await incrementStat(shopId, type);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
