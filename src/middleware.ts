import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'stealth_admin';
const COOKIE_MAX_AGE = 60 * 60 * 24;
const CANONICAL_HOST = 'aikoreadatalab.com';
const AIJEJU_HOSTS = ['aijeju.co.kr', 'www.aijeju.co.kr'];

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  if (AIJEJU_HOSTS.some((h) => host.includes(h))) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  const url = request.nextUrl.clone();
  const adm = url.searchParams.get('_adm');
  const secret = process.env.ADMIN_SECRET ?? '';

  if (adm && secret && adm === secret) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE_NAME, '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
