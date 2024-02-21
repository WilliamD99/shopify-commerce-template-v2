import { cookies } from 'next/headers';
import { getCustomerAccount, getCustomerOrders } from '~/lib/shopify';
import { getAccessCodeFromHeader } from '~/lib/utils-server';
import OrderList from './OrderList';

export default async function AccountOrders() {
  let accessCode: string | undefined;
  const cookieStore = cookies();
  accessCode = cookieStore.get('access')?.value ?? undefined;

  if (!accessCode) {
    accessCode = getAccessCodeFromHeader() ?? undefined;
  }

  let customerData = await getCustomerAccount(accessCode);
  let customerId = customerData?.id;
  if (!customerId) return <></>;

  let customerOrdersRes = await getCustomerOrders(customerId);
  let orders = customerOrdersRes.orders;
  console.log(orders);

  return (
    <div className="col-span-2">
      <p className="mb-5 text-lg font-semibold">Order History</p>
      <OrderList list={orders.edges} />
    </div>
  );
}
