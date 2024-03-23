import { ThreeItemGrid } from 'components/grid/three-items';
import { Suspense } from 'react';
import Footer from '~/components/layout/footer/footer';
import HomeSlider from '~/components/slider/home_slider';
import AiChatBox from '~/features/ai/components';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        {/* <Carousel /> */}
        <HomeSlider />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
      <AiChatBox />
    </>
  );
}
