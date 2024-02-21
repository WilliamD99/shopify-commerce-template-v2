import { getAccessCodeFromHeader } from 'lib/utils-server';
import { cookies } from 'next/headers';
import { getCustomerAccount } from '~/lib/shopify';

import AccountEditForm from '~/components/customer/account-edit-form';
import UnAuthorize from './unauthorize';
// import AccountAddressEditForm from '~/components/customer/account-address-edit-form';

export default async function AccountPage() {
  // Get access token from cookie or headers
  const cookieStore = cookies();
  const accessCode = cookieStore.get('access')?.value; // Access Token

  let code = getAccessCodeFromHeader();
  if (!code && !accessCode) return <UnAuthorize />;

  let customerData = await getCustomerAccount(code ?? accessCode);
  // console.log(customerData);
  //   if (customerData.message === 'Unauthorized') return <UnAuthorize />;

  return (
    <>
      <AccountEditForm data={customerData} />
    </>
  );
}
