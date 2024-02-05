import clsx from 'clsx';

import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  availableForSale,
  variants,
  options,
  cover,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  availableForSale?: boolean;
  variants?: any;
  options?: any;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  cover?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md',
        {
          relative: label,
          'border-neutral-200 dark:border-neutral-800': !active,
          'brightness-75': active
        }
      )}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <Image
            src={props.src}
            className={clsx('relative h-full w-full object-cover', {
              'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
              'object-cover': cover
            })}
            fill
            alt={`product-${label?.title}`}
            // {...props}
          />
        </div>
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
