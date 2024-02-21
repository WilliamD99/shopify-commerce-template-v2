'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AccountPageNav() {
  const pathName = usePathname();

  return (
    <>
      <div id="account-nav" className="flex flex-col space-y-3">
        <p className="text-xl font-semibold lg:mb-5">Settings</p>
        <div className="flex flex-row space-x-4 pb-3 lg:flex-col lg:space-x-0 lg:space-y-3">
          <Link
            href="/account"
            className={clsx(
              `w-fit text-sm lg:text-base`,
              pathName === '/account' && 'font-semibold'
            )}
          >
            Account Details
          </Link>
          <Link
            href="/account/address"
            className={clsx(
              `w-fit text-sm lg:text-base`,
              pathName.includes('address') && 'font-semibold'
            )}
          >
            Addresses
          </Link>
          <Link
            href="/account/orders"
            className={clsx(
              `w-fit text-sm lg:text-base`,
              pathName.includes('orders') && 'font-semibold'
            )}
          >
            Orders
          </Link>
        </div>
      </div>
    </>
  );
}
