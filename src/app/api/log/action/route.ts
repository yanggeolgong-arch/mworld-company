import { NextRequest, NextResponse } from 'next/server';
import { logUserAction } from '@/lib/firebase-admin';

const ACTIONS = ['card_click', 'youtube_play', 'naver_map', 'google_map'] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const action = ACTIONS.includes(body?.action) ? body.action : undefined;
    const shopId = typeof body?.shopId === 'number' ? body.shopId : parseInt(String(body?.shopId), 10);
    if (!action || !shopId || shopId < 1 || shopId > 10) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const ok = await logUserAction(action, shopId);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
