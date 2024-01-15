import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('flex w-full py-4 @container/label', {
        'lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex flex-col space-y-2">
        <p className="line-clamp-2 flex-grow text-sm font-semibold leading-none tracking-tight text-black">
          {title}
        </p>
        <Price
          className="flex-none text-sm text-gray-500"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
