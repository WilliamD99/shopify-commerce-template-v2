import { NextRequest, NextResponse } from 'next/server';

// Step to authorize using Shopify Customer Account API

// Step 1: Login through the given shopify url (using Email and code)
// Step 2: Successfully logged in customer will be redirect back to the site with code added to the url
// Step 3: Using this code to get an access code to authenticate with the API (fetch to get the code)
// Step 4: Using the code that was returned in step 3 to get another access code, to query the api

interface AuthAccessToken {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
  id_token?: string;
  error?: string;
  error_description?: string;
}

interface AcessToken {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  issued_token_type?: string;
  scope?: string;
  error?: string;
  error_description?: string;
}

const getAuthAccessToken = async (code: string): Promise<AuthAccessToken> => {
  try {
    const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_ID;
    const shopId = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;
    const body = new URLSearchParams();

    const clientSecret = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SK;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    let callbackUri = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_CALLBACK ?? '/';

    body.append('grant_type', 'authorization_code');
    body.append('client_id', clientId ?? '');
    body.append('redirect_uri', callbackUri);
    body.append('code', code);
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      // Confidential Client
      Authorization: `Basic ${credentials}`
    };
    const response = await fetch(`https://shopify.com/${shopId}/auth/oauth/token`, {
      method: 'POST',
      headers: headers,
      body
    });
    // console.log(response.status);
    const result = await response.json();

    return result;
  } catch (e) {
    console.log(e);
    return {
      error: 'Something went wrong'
    };
  }
};

const getAccessToken = async (atkn: string): Promise<AcessToken> => {
  try {
    const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_ID;
    const storeId = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;
    const customerApiClientId = '30243aa5-17c1-465a-8493-944bcc4e88aa';

    const clientSecret = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SK;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const body = new URLSearchParams();
    body.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
    body.append('client_id', clientId ?? '');
    body.append('audience', customerApiClientId);
    body.append('subject_token', atkn);
    body.append('subject_token_type', 'urn:ietf:params:oauth:token-type:access_token');
    body.append('scopes', 'https://api.customers.com/auth/customer.graphql');
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      // Confidential Client
      Authorization: `Basic ${credentials}`
    };

    const response = await fetch(`https://shopify.com/${storeId}/auth/oauth/token`, {
      method: 'POST',
      headers: headers,
      body
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
    return {
      error: 'Something went wrong'
    };
  }
};

const getAuthAccessTokenFromRfToken = async (code: string): Promise<AuthAccessToken> => {
  try {
    const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_ID;
    const shopId = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;
    const body = new URLSearchParams();

    body.append('grant_type', 'refresh_token');
    body.append('client_id', clientId ?? '');
    body.append('refresh_token', code);

    const clientSecret = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SK;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      // Confidential Client
      Authorization: `Basic ${credentials}`
    };

    const response = await fetch(`https://shopify.com/${shopId}/auth/oauth/token`, {
      method: 'POST',
      headers: headers,
      body
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
    return {
      error: 'Something went wrong'
    };
  }
};

export async function middleware(request: NextRequest) {
  const isAccountPage = request.nextUrl.pathname.startsWith('/account');
  if (isAccountPage) {
    const paramsCode = request.nextUrl.searchParams.get('code');
    // If there's a code inside the url
    if (paramsCode) {
      // First need to check if the cookies are there
      // to prevent user from sending multiple requests
      // from a same code
      let isAuthTokenExist = request.cookies.has('auth');
      let isAcessTokenExist = request.cookies.has('access');

      // if there's no token exist
      if (!isAuthTokenExist || !isAcessTokenExist) {
        // Check if the refresh token exist
        // If it is, then get a new auth token from this refresh token
        let isRfTokenExist = request.cookies.get('refresh')?.value;

        if (isRfTokenExist) {
          const newAuthToken = await getAuthAccessTokenFromRfToken(isRfTokenExist);
          if (newAuthToken.access_token) {
            const newAccessToken = await getAccessToken(newAuthToken.access_token);
            if (newAccessToken.access_token) {
              const response = NextResponse.next();
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
        } else {
          // No token exists nor refresh token
          const authAccessToken = await getAuthAccessToken(paramsCode);
          if (authAccessToken.access_token) {
            const accessToken = await getAccessToken(authAccessToken.access_token);

            if (accessToken.access_token) {
              const response = NextResponse.next();

              response.cookies.set('auth', authAccessToken.access_token, {
                maxAge: authAccessToken.expires_in ? authAccessToken.expires_in : 7200 // Default
              });
              response.cookies.set('refresh', authAccessToken.refresh_token ?? '');
              response.cookies.set('access', accessToken.access_token, {
                maxAge: accessToken.expires_in ? accessToken.expires_in : 7200
              });

              return response;
            } else {
              // In case there's no access token from the request
            }
          }
        }
      } else {
        // In case there's no auth acess token from the request
      }
    } else {
      // If there's no code in the params
    }
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
