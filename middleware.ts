import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getAccessToken, getAuthAccessTokenFromRfToken } from './lib/security/auth';

// Step to authorize using Shopify Customer Account API

// Step 1: Login through the given shopify url (using Email and code)
// Step 2: Successfully logged in customer will be redirect back to the site with code added to the url
// Step 3: Using this code to get an access code to authenticate with the API (fetch to get the code)
// Step 4: Using the code that was returned in step 3 to get another access code, to query the api

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // const isAccountPage = request.nextUrl.pathname.startsWith('/account');
  let response = NextResponse.next();
  let isAccessTokenExist = request.cookies.has('access');
  let isRfTokenExist = request.cookies.get('refresh')?.value;
  // If there is a refresh token, but no access token
  // which means the access token has expired -> request another using refresh token
  if (isRfTokenExist && !isAccessTokenExist) {
    const newAuthToken = await getAuthAccessTokenFromRfToken(isRfTokenExist);
    if (newAuthToken.access_token) {
      const newAccessToken = await getAccessToken(newAuthToken.access_token);
      response.cookies.set('auth', newAuthToken.access_token, {
        maxAge: newAuthToken.expires_in ? newAuthToken.expires_in : 7200
      });
      response.cookies.set('refresh', newAuthToken.refresh_token ?? '');
      response.cookies.set('access', newAccessToken.access_token, {
        maxAge: newAccessToken.expires_in ? newAccessToken.expires_in : 7200
      });
      return response;
    }
  }

  // If there aren't any token exist
  if (!isAccessTokenExist && !isRfTokenExist) {
    return response;
  }
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
