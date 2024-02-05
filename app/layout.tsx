import Navbar from 'components/layout/navbar';
import NotificationBar from 'components/notification';
import { GeistSans } from 'geist/font';
import { getMenu, getShopContent } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { ReactNode, Suspense } from 'react';
import Cart from '~/components/cart';
import OpenCart from '~/components/cart/open-cart';
import TopMenu from '~/components/layout/navbar/top-menu';

import 'styles/index.css';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export async function generateMetadata() {
  const shopData = await getShopContent();
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: shopData.name!,
      template: `%s | ${shopData.name}`
    },
    robots: {
      follow: true,
      index: true
    },
    ...(twitterCreator &&
      twitterSite && {
        twitter: {
          card: 'summary_large_image',
          creator: twitterCreator,
          site: twitterSite
        }
      })
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const menu = await getMenu('next-js-frontend-header-menu');
  const shopData = await getShopContent();
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white">
        <TopMenu />
        <Navbar menu={menu} shopData={shopData}>
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </Navbar>
        <NotificationBar />

        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
