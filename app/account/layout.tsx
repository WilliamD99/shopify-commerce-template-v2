import { ReactNode } from 'react';
import Bounded from '~/components/bounded';
import AccountPageNav from '~/components/layout/navbar/account-nav';

export default function AccountPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Bounded size="widest" id="test" className="my-10 lg:my-20">
        <div className="px-10 lg:grid lg:grid-cols-3 lg:px-0">
          <AccountPageNav />
          {children}
        </div>
      </Bounded>
    </>
  );
}
