export interface AuthAccessToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  id_token: string;
}

export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  issued_token_type: string;
  scope: string;
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
    throw new Error('Something went wrong');
  }
};

const getAccessToken = async (atkn: string): Promise<AccessToken> => {
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
    throw new Error('Something went wrong');
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
    throw new Error('Something went wrong');
  }
};

export { getAccessToken, getAuthAccessToken, getAuthAccessTokenFromRfToken };
