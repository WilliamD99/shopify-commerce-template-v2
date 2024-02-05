'use client';

import { getCookie } from 'cookies-next';

export default function Test() {
  const code = getCookie('code');
  const verifier = getCookie('verifier');

  // useEffect(() => {
  //   const body = new URLSearchParams();
  //   body.append('grant_type', 'authorization_code');
  //   body.append('client_id', process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACC_CLIENT ?? '');
  //   body.append(
  //     'redirect_uri',
  //     `https://96c9-2405-4802-134a-7490-9028-65c-da77-1981.ngrok-free.app/account`
  //   );
  //   body.append('code', code ?? '');
  //   body.append('code_verifier', verifier ?? '');
  //   const queryHeaders = {
  //     'content-type': 'application/x-www-form-urlencoded'
  //   };

  //   const response = fetch(
  //     `https://shopify.com/${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}/auth/oauth/token`,
  //     {
  //       method: 'POST',
  //       headers: queryHeaders,
  //       body
  //     }
  //   ).then(async (res) => {
  //     let result = await res.json();
  //     if (result?.access_token) {
  //       console.log(result);
  //       setCookie('token', result.access_token);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   setCookie(
  //     'token',
  //     'atkn_CjQIxuLzrQYQ5pr0rQZSJggGEhBT2p9awM5EcJ89n6ZgB…4sJCss11z5cjpXlzoBSr2tMr_O-du_rewMDAmAF2LdTgPGf8H'
  //   );
  //   setCookie(
  //     'rf_token',
  //     'atkn_CiEIxuLzrQYQxvyRrwaiARIKEAw_d-XiC0xSnqXUZPW3BPUSQBWlH6fjP1JbR8Jqht7HxnPGEQAxB6iiHzvve3Th4JIvudj5eowZlMzp5_xdRsj2bNdzykNWWvwtSCL9E5ygMQk'
  //   );
  // }, []);

  // useEffect(() => {
  //   const shop_id = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;
  //   const client_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACC_CLIENT;
  //   const accessToken =
  //     'atkn_CjQIvr_9rQYQ3vf9rQZSJggGEhCyVIpeGadLdKO0OcHFrEOMGhBR0IgpZhhG24RxBRFQyIYwEkDNA5ZinYusBKEf10AkJlae_7qO-cqG_gEB5PFTFPIpeykiC7G9CN_wKpGFW4XhKjCyEXBPzjkX4m9xDaQIxNAP';
  //   const customerApiClientId = '30243aa5-17c1-465a-8493-944bcc4e88aa';

  //   const body = new URLSearchParams();
  //   body.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');

  //   body.append('client_id', client_id ?? '');
  //   body.append('audience', customerApiClientId);
  //   body.append('subject_token', accessToken);
  //   body.append('subject_token_type', 'urn:ietf:params:oauth:token-type:access_token');
  //   body.append('scopes', 'https://api.customers.com/auth/customer.graphql');

  //   const headers = {
  //     'content-type': 'application/x-www-form-urlencoded'
  //   };

  //   const response = fetch(`https://shopify.com/${shop_id}/auth/oauth/token`, {
  //     method: 'POST',
  //     headers: headers,
  //     body
  //   }).then(async (res) => {
  //     console.log(res);
  //     let data = await res.json();
  //     console.log(data);
  //   });
  // }, []);

  return (
    <>
      <div>Test</div>
    </>
  );
}

('atkn_CpUDCO_D_a0GEI_8_a0GYoYDCAYSEMGqcwPTzE6Sisl2wYB4ccsaPGVtYWlsIGh0dHBzOi8vYXBpLmN1c3RvbWVycy5jb20vYXV0aC9jdXN0b21lci5ncmFwaHFsIG9wZW5pZCDzVCjx8gI6JDIwODcxMjgwLTkyMGYtNDUzNy1iMzhmLTFmZTEwNDAyMTY4ZUIHQWNjb3VudEoQ6vu__U-CSX29eORjbI4NP1JdeyJzdWIiOiJzaHBfZWQ5ZDczMGEtMTBhNy00NTg4LTllNzktOGE2YzY2NTljYWExIiwiaXNzIjoiaHR0cHM6Ly9jdXN0b21lci5sb2dpbi5zaG9waWZ5LmNvbSJ9WmdodHRwczovL2x1Y2ktZWNvbW1lcmNlLm15c2hvcGlmeS5jb20gaHR0cHM6Ly85NmM5LTI0MDUtNDgwMi0xMzRhLTc0OTAtOTAyOC02NWMtZGE3Ny0xOTgxLm5ncm9rLWZyZWUuYXBwYhBR0IgpZhhG24RxBRFQyIYwahCyVIpeGadLdKO0OcHFrEOMEkCQ0p2yoekq1Gj_lS4bdQfg2r5_aXNz6KnAjQ7fHh8g8XTI5A3QgA1J9mPH7wNV-0Zu4Z8pzcuUpzSaMW4yjbQA');
