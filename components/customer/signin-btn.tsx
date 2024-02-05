// import { setCookie } from 'cookies-next';
import { generateState } from 'lib/security/index';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';

export default async function SignInBtn() {
  let href = '#';

  // const handleClick = async () => {
  let clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_ID;
  let storeId = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;

  //   if (clientId) {
  const authorizationRequestUrl = new URL(`https://shopify.com/${storeId}/auth/oauth/authorize`);

  authorizationRequestUrl.searchParams.append(
    'scope',
    'openid email https://api.customers.com/auth/customer.graphql'
  );
  authorizationRequestUrl.searchParams.append('client_id', clientId ?? '');
  authorizationRequestUrl.searchParams.append('response_type', 'code');
  authorizationRequestUrl.searchParams.append(
    'redirect_uri',
    `https://642b-2405-4802-134a-7490-9028-65c-da77-1981.ngrok-free.app/account`
  );

  const state = await generateState();

  authorizationRequestUrl.searchParams.append('state', state);
  authorizationRequestUrl.searchParams.append('nonce', '<nonce>');

  href = authorizationRequestUrl.toString();

  //     const verifier = await generateCodeVerifier();
  //     const challenge = await generateCodeChallenge(verifier);
  //     setCookie('verifier', verifier);

  //     authorizationRequestUrl.searchParams.append('code_challenge', challenge);
  //     authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256');
  //     router.push(authorizationRequestUrl.toString());
  //   }
  // };

  return (
    <>
      {/* <button className="text-xs font-bold hover:text-neutral-500" onClick={handleClick}>
        Sign In
      </button> */}
      <Link className="text-xs font-bold hover:text-neutral-500" href={href}>
        Sign In
      </Link>
    </>
  );
}

// Temp code
// ZXdTK0VTV2VacnU0ODhCVkxrbVF4Rk5aaURjdkhlNU4rUW5ML2FHTVZzckQ4UGxRT1hJMklYRU1PWXFhODFTQTJ2OWZNVFlEY3FoUFZuSFEwOXF1d0QwSXIwS2tvdFNaZmFwSUtJL3ZUOHFJRURZcmxtZjUyYXhiM01aRlpEeXArQXpEZWZLeXE2UVRqL054VUxMQ0pJdC81VUxxcWl6aFBqYnVXazFyWjBhS2lEaytIdVJqV0tHRUlrTFVrbFkwVmJCZHpscS8wOVlMZFhoV1JmVC9LcTZHMi91dExvZGhqVkhrTmU4eHkyR00rMFNkYWhjdUN0T0hzWjNyOXNRVEF0ZzBrVmJ1SW84dDlrd0JGSksrb1hKR21FSFBSY1RvV3pNL3lzczZhVmFXZUlkS2Iyano0eUw4RWxPSGFxYlEyazFFWFZzTm0xUDVUeVRBeW8zc0l6U21tZjlzeHJBd0dJVFVES0JiUnJaZkJtdy94N0lFK2FkTTVEakVlNXh4LzFpaEg2SkY0NjdKM1A2VmxlQT0tLVlMU2FvL3U3RVM0R0pzTystLXFESVpBMmhmVkpWWmxRdkQveXBWOEE9PQ&state=1706798481828u8oo25bpp5
