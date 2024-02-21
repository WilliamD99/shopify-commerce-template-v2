// import { setCookie } from 'cookies-next';
import { generateState } from 'lib/security/index';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';

export default async function SignInBtn() {
  let href = '#';

  let clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_ID;
  let storeId = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;
  let callbackUri = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_CALLBACK;
  if (!clientId || !storeId || !callbackUri) return;

  const authorizationRequestUrl = new URL(`https://shopify.com/${storeId}/auth/oauth/authorize`);

  authorizationRequestUrl.searchParams.append(
    'scope',
    'openid email https://api.customers.com/auth/customer.graphql'
  );
  authorizationRequestUrl.searchParams.append('client_id', clientId ?? '');
  authorizationRequestUrl.searchParams.append('response_type', 'code');
  authorizationRequestUrl.searchParams.append('redirect_uri', callbackUri);

  const state = await generateState();

  authorizationRequestUrl.searchParams.append('state', state);
  authorizationRequestUrl.searchParams.append('nonce', '<nonce>');

  href = authorizationRequestUrl.toString();

  return (
    <>
      <Link className="text-xs font-bold hover:text-neutral-500" href={href}>
        Sign In
      </Link>
    </>
  );
}
