import { NextResponse, type NextRequest } from 'next/server';

/**
 * `skipTrailingSlashRedirect` is on so the PostHog proxy (`/ingest/posthog/e/`)
 * is not answered with a 308 first. Page URLs still get the usual canonical
 * redirect (`/news/` → `/news`) here.
 */
export function proxy(request: NextRequest) {
  const url = new URL(request.url);
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '') || '/';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Everything except the PostHog proxy, Next internals, API routes and static files
  matcher: ['/((?!ingest/|_next/|api/|.*\\..*).*)'],
};
