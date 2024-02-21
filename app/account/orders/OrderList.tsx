import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';

interface OrderItemProps {
  id: string;
  confirmationNumber: string;
  createdAt: string;
  confirmed: boolean;
  subtotalLineItemsQuantity: number;
  fullyPaid: boolean;
  note: string;
  taxLines: {
    title: string;
    priceSet: {
      presentmentMoney: {
        amount: string;
      };
    };
  }[];
  totalPriceSet: {
    presentmentMoney: {
      amount: string;
    };
  };
  displayAddress: {
    id: string;
    address1: string;
    address2: string;
    city: string;
    provinceCode: string;
    countryCodeV2: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  lineItems: {
    edges: {
      cursor: string;
      node: {
        name: string;
        quantity: number;
        image: {
          url: string;
        };
        discountedTotalSet: {
          presentmentMoney: {
            amount: string;
          };
        };
        originalUnitPriceSet: {
          presentmentMoney: {
            amount: string;
          };
        };
      };
    }[];
  };
}

interface OrderListProps {
  list: {
    cursor: string;
    node: OrderItemProps;
  }[];
}

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return month + '/' + day + '/' + year;
}

export default function OrderList({ list }: OrderListProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Confirmation Number</TableHead>
            <TableHead>Order Paid</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Total Paid</TableHead>
            <TableHead>Date Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <OrderItem key={item.node.id} item={item.node} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const OrderItem = ({ item, index }: { item: OrderItemProps; index: number }) => {
  return (
    <>
      <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell>{item.confirmationNumber}</TableCell>
        <TableCell>
          {item.fullyPaid ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : <></>}
        </TableCell>
        <TableCell>{item.subtotalLineItemsQuantity}</TableCell>
        <TableCell>${item.totalPriceSet.presentmentMoney.amount}</TableCell>
        <TableCell>{formatDate(item.createdAt)}</TableCell>
      </TableRow>
    </>
  );
};
