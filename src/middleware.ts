import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'stealth_admin';
const COOKIE_MAX_AGE = 60 * 60 * 24;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const adm = url.searchParams.get('_adm');
  const secret = process.env.ADMIN_SECRET ?? '';

  if (adm && secret && adm === secret) {
    const res = NextResponse.redirect(new URL(url.pathname, request.url));
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
  matcher: ['/ko/stealth-best-10', '/(.*)/stealth-best-10'],
};
