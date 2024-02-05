import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  // Get from url
  const token = url.searchParams.get('code');

  // Check if cookie is set
  let test = request.cookies.get('code')?.value;

  const reqHeaders = new Headers(request.headers);

  // // toLowerCase() to avoid 404 due to Next.js case-sensitivity
  // const url = request.url.toLowerCase();
  const headerUrl = request.url.toLocaleLowerCase();
  reqHeaders.set('x-url', headerUrl);

  const response = NextResponse.next({
    request: {
      headers: reqHeaders
    }
  });

  if (!test) {
    response.cookies.set('code', token ?? '');
  }

  return response;
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
