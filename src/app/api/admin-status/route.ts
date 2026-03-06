import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'stealth_admin';

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);
  const ok = cookie?.value === '1';
  return NextResponse.json({ ok });
}
