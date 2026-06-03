import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase().split(':')[0] || '';
  const pathname = request.nextUrl.pathname;

  // Handle subdomain rewrite for analytics.enhc.tech and analytic.enhc.tech
  if (host === 'analytic.enhc.tech' || host === 'analytics.enhc.tech') {
    // Prevent infinite loops if already rewritten
    if (!pathname.startsWith('/analytic')) {
      return NextResponse.rewrite(new URL(`/analytic${pathname === '/' ? '' : pathname}`, request.url));
    }
  }

  // Apply existing middleware logic for admin routes
  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next();

    // Prevent caching of admin pages
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
  }

  // For all other requests, proceed without modification
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};