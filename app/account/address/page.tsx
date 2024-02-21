import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Link from 'next/link';
import AccountAddressCreateForm from '~/components/customer/account-address-create-form';

const AccountAddressEditForm = dynamic(
  () => import('~/components/customer/account-address-edit-form'),
  { ssr: false }
);

import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { getCustomerAccount, getCustomerAccountAdmin } from '~/lib/shopify';
import { getAccessCodeFromHeader } from '~/lib/utils-server';

export default async function AccountAddress() {
  let accessCode: string | undefined;
  const cookieStore = cookies();
  accessCode = cookieStore.get('access')?.value ?? undefined;
  if (!accessCode) {
    accessCode = getAccessCodeFromHeader() ?? undefined;
  }

  let customerData = await getCustomerAccount(accessCode);
  let customerId = customerData?.id;
  if (!customerId) return <></>;

  let accountDetails = await getCustomerAccountAdmin(customerId);
  let accountAddresses = accountDetails.addresses;
  // console.log(accountDetails);
  return (
    <>
      <div>
        <p className="text-xl font-semibold">Saved Delivery Address</p>
        {accountAddresses.length === 0 && (
          <>
            <div className="mt-5">
              <p>
                You currently don't have any saved delivery addresses. Add an address here to be
                pre-filled for quicker checkout.
              </p>
            </div>
          </>
        )}
        {accountAddresses.length > 0 &&
          accountAddresses.map((address, index) => (
            <>
              <div className="mt-5 flex flex-row items-start justify-between" key={address.id}>
                <div className="relative">
                  <p className="text-neutral-500">
                    {address.firstName} {address.lastName}{' '}
                    {address.id === accountDetails.defaultAddress.id && (
                      <span className="text-sm font-semibold text-black">(Default)</span>
                    )}
                  </p>
                  <p className="text-neutral-500">{address.address1}</p>
                  <p className="text-neutral-500">
                    {address.city} {address.provinceCode} {address.zip}
                  </p>
                </div>
                <Link href={`/account/address?edit=${index}`} shallow={true}>
                  <Button className="h-8 py-2 text-xs">Edit</Button>
                </Link>
              </div>
              {index + 1 !== accountAddresses.length && (
                <Separator className="my-4 h-[1px] bg-neutral-400" />
              )}
            </>
          ))}
        <AccountAddressCreateForm />
        <AccountAddressEditForm
          data={accountAddresses}
          defaultId={accountDetails.defaultAddress.id}
        />
      </div>
    </>
  );
}
