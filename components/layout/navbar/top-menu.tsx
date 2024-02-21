import { cookies } from 'next/headers';
import Link from 'next/link';
import AccountBtn from '~/components/customer/account-btn';
import SignInBtn from '~/components/customer/signin-btn';
import { Separator } from '~/components/ui/separator';
import { getAccessCodeFromHeader } from '~/lib/utils-server';

export default function TopMenu() {
  const hasAtknInCookie = cookies().has('access');
  const hasAtknInHeaders = getAccessCodeFromHeader();

  const isLoggedin = hasAtknInCookie || hasAtknInHeaders;

  // const headerList = headers();
  // const url = headerList.get('x-url')!;
  // const query = new URL(url).searchParams.get('code') ?? null;

  return (
    <>
      <div
        id="top-menu"
        className="relative flex flex-row items-center justify-end space-x-4 px-4 py-2 lg:px-12"
        style={{ backgroundColor: 'rgb(245, 245, 245)' }}
      >
        <Link className="text-xs font-bold hover:text-neutral-500" href="#">
          Help
        </Link>
        {!isLoggedin && (
          <>
            <Separator orientation="vertical" className="h-4 bg-black" />
            <Link className="text-xs font-bold hover:text-neutral-500" href="#">
              Join Us
            </Link>
          </>
        )}

        <Separator orientation="vertical" className="h-4 bg-black" />
        {!isLoggedin ? <SignInBtn /> : <AccountBtn />}
      </div>
    </>
  );
}
