import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import SignInBtn from '~/components/customer/signin-btn';
import { Separator } from '~/components/ui/separator';

export default function TopMenu() {
  const codeCookie = cookies().get('code')?.value;

  const headerList = headers();
  const url = headerList.get('x-url')!;
  const query = new URL(url).searchParams.get('code') ?? null;

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
        <Separator orientation="vertical" className="h-4 bg-black" />
        <Link className="text-xs font-bold hover:text-neutral-500" href="#">
          Join Us
        </Link>
        <Separator orientation="vertical" className="h-4 bg-black" />
        {!codeCookie && !query ? (
          <SignInBtn />
        ) : (
          <Link className="text-xs font-bold hover:text-neutral-500" href="/account">
            My Account
          </Link>
        )}
      </div>
    </>
  );
}
