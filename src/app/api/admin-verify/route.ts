import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'stealth_admin';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24시간

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body?.password === 'string' ? body.password : '';
    const secret = process.env.ADMIN_SECRET ?? '';

    if (!secret) {
      return NextResponse.json({ ok: false, error: 'ADMIN_SECRET not configured in Vercel' }, { status: 503 });
    }
    if (password === secret) {
      const res = NextResponse.json({ ok: true });
      res.cookies.set(COOKIE_NAME, '1', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
      });
      return res;
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
