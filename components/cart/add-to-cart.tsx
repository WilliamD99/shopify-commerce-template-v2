'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  price
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  price?: string;
}) {
  const searchParams = useSearchParams();
  let quantity = searchParams.get('quantity') ?? 0;
  let parsedQuantity: number = parseInt(String(quantity));

  const { pending } = useFormStatus();

  console.log(parsedQuantity);
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-black p-4 tracking-wide text-white transition hover:opacity-60';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(pending && disabledClasses, buttonClasses)}
      >
        Add To Cart
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(
        buttonClasses,
        pending && disabledClasses,
        parsedQuantity === 0 && disabledClasses
      )}
    >
      Add To Cart
      {quantity && (
        <span className="ml-2 font-semibold">
          ({price && `$${parseInt(price) * parsedQuantity}`})
        </span>
      )}
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const quantity = searchParams.get('quantity') ?? 1;

  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, {
    selectedVariantId,
    quantity
  });

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        price={variant?.price.amount}
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
