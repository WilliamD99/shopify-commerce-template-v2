import Bounded from 'components/bounded';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';
import Footer from '~/components/layout/footer/footer';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <Bounded size="widest" className="mt-10">
        <div className="mx-auto flex flex-row justify-between gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
          <div className="order-first w-full flex-none md:max-w-[125px]">
            {/* <Collections /> */}
          </div>
          {/* <div className="order-none flex-none"> */}
          <FilterList list={sorting} title="Sort by" />
          {/* </div> */}
        </div>
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>

        <Footer />
      </Bounded>
    </Suspense>
  );
}
