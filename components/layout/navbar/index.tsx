'use client';

import clsx from 'clsx';
import LogoSquare from 'components/logo-square';
import { Menu as MenuType, ShopData } from 'lib/shopify/types';
import { debounce } from 'lodash';
import Link from 'next/link';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import useVisibility from '~/lib/hooks/useVisibility';
import Menu from './menu';
import MobileMenu from './mobile-menu';
import Search from './search';
export default function Navbar({
  menu,
  shopData,
  children
}: {
  menu: MenuType[];
  shopData: ShopData;
  children: ReactNode;
}) {
  const [isVisible, currentElement] = useVisibility<HTMLDivElement>(100);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const [isHidden, setHidden] = useState<boolean>(false);

  const handleShowWhenScrollUp = () => {
    let currentY = window.scrollY;
    if (currentY > lastScrollY) {
      // Scroll down
      setHidden(true);
    } else {
      // Scroll up
      if (!isVisible) {
        setHidden(false);
      }
    }
    setLastScrollY(currentY);
  };

  // Can't figure out why throttle won't work, so current solution is to use debounce
  const throttleScrollFunc = useCallback(debounce(handleShowWhenScrollUp, 500), [
    isVisible,
    lastScrollY
  ]);

  useEffect(() => {
    window.addEventListener('scroll', throttleScrollFunc);

    return () => {
      window.removeEventListener('scroll', throttleScrollFunc);
    };
  }, [handleShowWhenScrollUp]);

  return (
    <>
      <div id="nav_wrapper" ref={currentElement} className="relative h-full w-full">
        <div
          id="nav"
          className={clsx(
            'absolute left-0 top-0 z-40 h-full w-full',
            isVisible !== undefined && !isVisible && 'is-fixed',
            !isVisible && isHidden && 'is-hidden'
          )}
        >
          <nav className="relative flex h-full items-center justify-between bg-white px-4 lg:px-12">
            <div className="flex w-full items-center justify-between">
              <Link
                href="/"
                className="mr-2 flex w-full items-center md:w-auto lg:mr-6 lg:justify-center"
              >
                <LogoSquare url={shopData.brand.logo.image.url} alt={shopData.brand.logo.alt} />
              </Link>
              {menu.length ? (
                <ul className="ml-10 hidden gap-x-6 text-base md:flex md:items-center">
                  {menu.map((item: MenuType) => (
                    <Menu menu={item} key={item.title} />
                  ))}
                </ul>
              ) : null}

              <div className="flex items-center justify-end space-x-2 md:w-1/3">
                <div className="hidden lg:block">
                  <Search />
                </div>

                {children}
                <div className="block flex-none md:hidden">
                  <MobileMenu menu={menu} />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
