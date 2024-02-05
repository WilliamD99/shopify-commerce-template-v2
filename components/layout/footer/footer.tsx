import { getMenu, getShopContent } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import FooterMenu from '~/components/layout/footer/footer-menu';
// import FooterSocial from './footer-social';

import dynamic from 'next/dynamic';
const FooterSocial = dynamic(() => import('./footer-social'));

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';

  const menu = await getMenu('next-js-frontend-footer-menu');
  const shopData = await getShopContent();

  return (
    <footer className="bg-black text-sm text-neutral-500">
      <div id="footer_top" className="flex flex-col px-4 py-6 lg:flex-row lg:px-12 lg:py-10">
        <div className="flex flex-1 flex-row">
          <div className="flex flex-1 flex-col space-y-3">
            <p className="text-sm font-semibold uppercase text-white">Get help</p>
            <Link
              href="#"
              className="w-fit text-xs font-semibold text-neutral-500 transition-colors hover:text-white"
            >
              Order Status
            </Link>
            <Link
              href="#"
              className="w-fit text-xs font-semibold text-neutral-500 transition-colors hover:text-white"
            >
              Q&A
            </Link>
            <Link
              href="#"
              className="w-fit text-xs font-semibold text-neutral-500 transition-colors hover:text-white"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex flex-1 flex-col space-y-3">
            <p className="text-sm font-semibold uppercase text-white">About Luci</p>
            <Link
              href="#"
              className="w-fit text-xs font-semibold text-neutral-500 transition-colors hover:text-white"
            >
              News
            </Link>
            <Link
              href="#"
              className="w-fit text-xs font-semibold text-neutral-500 transition-colors hover:text-white"
            >
              Careers
            </Link>
          </div>
        </div>
        <div className="mt-10 flex flex-1 flex-row space-x-2 lg:mt-0 lg:justify-end">
          <FooterSocial />
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
      </div>
      <div id="footer_bot" className="flex flex-col px-4 py-6 lg:flex-row lg:px-12 lg:py-5">
        <div className="mb-5 flex-1 text-sm lg:text-xs">
          <p>
            &copy; {copyrightDate} {shopData.name}
            {shopData.name.length && !shopData.name.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-end space-y-2 lg:flex-row lg:space-x-10 lg:space-y-0">
          <Link className="text-sm transition hover:text-white lg:text-xs" href="#">
            Terms of Sale
          </Link>
          <Link className="text-sm transition hover:text-white lg:text-xs" href="#">
            Terms of Use
          </Link>
          <Link className="text-sm transition hover:text-white lg:text-xs" href="#">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
