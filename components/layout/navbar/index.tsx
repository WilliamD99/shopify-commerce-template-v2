import Bounded from 'components/bounded';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu, getShopContent } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');
  const shopData = await getShopContent();

  return (
    <Bounded id="nav" size="widest">
      <nav className="relative flex items-center justify-between">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex">
            <Link
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoSquare url={shopData.brand.logo.image.url} alt={shopData.brand.logo.alt} />
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {shopData.name}
              </div>
            </Link>
            {menu.length ? (
              <ul className="ml-10 hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {/* <div className="hidden justify-center md:flex md:w-1/3"><Search /></div> */}
          <div className="flex justify-end md:w-1/3">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </Bounded>
  );
}
