import { cookies } from 'next/headers';
import { generateAuthHeader } from '~/lib/security';
import Test from './test';

// Step to authorize using Shopify Customer Account API

// Step 1: Login through the given shopify url (using Email and code)
// Step 2: Successfully logged in customer will be redirect back to the site with code added to the url
// Step 3: Using this code to get an access code to authenticate with the API (fetch to get the code)
// Step 4: Using the code that was returned in step 3 to get another access code, to query the api

const getAuthAccessToken = async (code: string) => {
  try {
    const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_ID;
    const shopId = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;
    const body = new URLSearchParams();

    const authHeader = await generateAuthHeader();
    body.append('grant_type', 'authorization_code');
    body.append('client_id', clientId ?? '');
    body.append(
      'redirect_uri',
      `https://642b-2405-4802-134a-7490-9028-65c-da77-1981.ngrok-free.app/account`
    );
    body.append('code', code);
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      // Confidential Client
      Authorization: `Basic ${authHeader}`
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
      message: 'Something went wrong'
    };
  }
};

export default async function AccountPage() {
  const cookieStore = cookies();
  const code = cookieStore.get('code')?.value; // Access Token

  //   let test = await getCustomerAccount(token);
  const shop_id = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;
  const client_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACC_CLIENT;

  if (code) {
    const authTokenRes = await getAuthAccessToken(code);
    console.log(authTokenRes);
  }
  //   const auth_endpoint = `https://shopify.com/${shop_id}/account/customer/api/unstable/graphql`;
  //   const result = await fetch(auth_endpoint, {
  //     method: 'POST',

  //     body: JSON.stringify({
  //       query: /* GraphQL */ `
  //         {
  //           customer {
  //             displayName
  //           }
  //         }
  //       `,
  //       variables: {}
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization:
  //         'atkn_CpUDCO_D_a0GEI_8_a0GYoYDCAYSEMGqcwPTzE6Sisl2wYB4ccsaPGVtYWlsIGh0dHBzOi8vYXBpLmN1c3RvbWVycy5jb20vYXV0aC9jdXN0b21lci5ncmFwaHFsIG9wZW5pZCDzVCjx8gI6JDIwODcxMjgwLTkyMGYtNDUzNy1iMzhmLTFmZTEwNDAyMTY4ZUIHQWNjb3VudEoQ6vu__U-CSX29eORjbI4NP1JdeyJzdWIiOiJzaHBfZWQ5ZDczMGEtMTBhNy00NTg4LTllNzktOGE2YzY2NTljYWExIiwiaXNzIjoiaHR0cHM6Ly9jdXN0b21lci5sb2dpbi5zaG9waWZ5LmNvbSJ9WmdodHRwczovL2x1Y2ktZWNvbW1lcmNlLm15c2hvcGlmeS5jb20gaHR0cHM6Ly85NmM5LTI0MDUtNDgwMi0xMzRhLTc0OTAtOTAyOC02NWMtZGE3Ny0xOTgxLm5ncm9rLWZyZWUuYXBwYhBR0IgpZhhG24RxBRFQyIYwahCyVIpeGadLdKO0OcHFrEOMEkCQ0p2yoekq1Gj_lS4bdQfg2r5_aXNz6KnAjQ7fHh8g8XTI5A3QgA1J9mPH7wNV-0Zu4Z8pzcuUpzSaMW4yjbQA'
  //     }
  //   });

  //   const responseBody = await result.text();
  //   console.log(responseBody);

  return (
    <>
      <div>AccountPage</div>
      <Test />
    </>
  );
}

//   let cookiesObj = cookies();
//   const codeCookie = cookiesObj.get('code')?.value;

//   // The middleware will set head to be the current url with the signin code from shopify
//   // after that, the server component will read from the header of the request
//   const headerList = headers();
//   const url = headerList.get('x-url')!;
//   const query = new URL(url).searchParams.get('code');

//   if (!codeCookie && !query) redirect('/');

//   if (!NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACC_CLIENT) notFound();
//   const body = new URLSearchParams();
//   body.append('grant_type', 'authorization_code');
//   body.append('client_id', NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACC_CLIENT);
//   body.append(
//     'redirect_uri',
//     `https://96c9-2405-4802-134a-7490-9028-65c-da77-1981.ngrok-free.app/account`
//   );
//   body.append('code', query ?? codeCookie ?? '');
//   const codeVerifier = cookiesObj.get('verifier')?.value;
//   if (!codeVerifier) notFound();
//   body.append('code_verifier', codeVerifier);
//   const queryHeaders = {
//     'content-type': 'application/x-www-form-urlencoded'
//   };

//   try {
//     const response = await fetch(
//       `https://shopify.com/${NEXT_PUBLIC_SHOPIFY_STORE_ID}/auth/oauth/token`,
//       {
//         method: 'POST',
//         headers: queryHeaders,
//         body
//       }
//     );

//     // const test = await response.json();
//   } catch (e) {
//     console.log(e);
//   }
