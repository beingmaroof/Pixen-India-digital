import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/payment', '/messages', '/support'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected route
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  // Look for auth token in cookies (Supabase stores session as sb-<ref>-auth-token)
  // We check for any cookie that includes the auth token pattern
  const cookieHeader = request.headers.get('cookie') || '';
  
  // Supabase auth tokens are stored with key pattern: sb-*-auth-token
  const hasAuthToken = cookieHeader.includes('-auth-token') && !cookieHeader.includes('-auth-token=');
  
  // More reliable: check for the specific Supabase project ref cookie
  const projectRef = 'fwbiibjuxlmqsbufwelv';
  const authCookieName = `sb-${projectRef}-auth-token`;
  const cookies = request.cookies;
  const authToken = cookies.get(authCookieName) || cookies.get('supabase-auth-token') || cookies.get('pixen-auth-token');

  if (!authToken) {
    // Redirect to login and preserve the original path
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/payment/:path*',
    '/messages/:path*',
    '/support/:path*',
  ],
};
