'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import Bounded from '~/components/bounded';
import { Menu } from '~/lib/shopify/types';

export default function SubMenu({ menu }: { menu: Menu }) {
  const [isActive, setActive] = useState<boolean>(false);

  let items = menu.items;

  const handleOpen = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div
        className="item py-5"
        onMouseEnter={() => handleOpen()}
        onMouseLeave={() => handleOpen()}
      >
        <li>
          <Link
            href={menu.path}
            className="font-semibold text-black underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
          >
            {menu.title}
          </Link>
        </li>
        {menu.items.length > 0 && (
          <>
            <Bounded
              size="widest"
              className={clsx(`sub_menu absolute left-0 w-full bg-white`, isActive && 'active')}
            >
              <div className="flex flex-row px-10 py-10">
                {items.map((item) => (
                  <div key={item.title} className="pre_menu flex flex-1 flex-col space-y-4">
                    <Link href={item.path} className="w-fit text-base font-semibold text-black">
                      {item.title}
                    </Link>
                    <div className="flex flex-col space-y-2">
                      {item.items.map((nested) => (
                        <Link
                          href={nested.path}
                          className="w-fit text-sm font-semibold text-gray-500 transition-colors hover:text-black"
                          key={nested.title}
                        >
                          {nested.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Bounded>
          </>
        )}
        <div className="sub_menu--bg backdrop-blur-sm"></div>
      </div>
    </>
  );
}
