'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { ProductOption, ProductVariant } from '~/lib/shopify/types';
import { Input } from '../ui/input';

interface ProductQuantitySelectorType {
  variants: ProductVariant[];
  options: ProductOption[];
}

export default function ProductQuantitySelector({
  variants,
  options
}: ProductQuantitySelectorType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const selectedOption = options.map((option) => {
    return {
      name: option.name,
      value: searchParams.get(option.name.toLowerCase())
    };
  });

  const selectedVariant = variants.find((variant) => {
    if (JSON.stringify(selectedOption) === JSON.stringify(variant.selectedOptions)) {
      return variant;
    }
  });

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(e.target.value);
    params.set('quantity', e.target.value);

    router.push(pathName + '?' + params.toString());
  };

  return (
    <>
      <div className="mb-8">
        <p className="mb-4 text-sm font-semibold">Quantity</p>
        <Input
          onChange={handleChangeQuantity}
          name="quantity"
          disabled={!selectedVariant?.availableForSale}
          placeholder="Quantity"
          type="number"
          min={0}
          max={selectedVariant?.quantityAvailable}
        />
      </div>
    </>
  );
}
