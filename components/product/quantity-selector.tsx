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

  let quantityParam = searchParams.get('quantity');

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
    params.set('quantity', e.target.value);
    router.push(pathName + '?' + params.toString());
  };

  return (
    <>
      <div className="mb-8 flex flex-row items-center space-x-6">
        <p className="text-sm font-semibold">Quantity</p>
        <div className="flex flex-row space-x-4">
          <Input
            onChange={handleChangeQuantity}
            name="quantity"
            disabled={!selectedVariant?.availableForSale}
            placeholder={`${
              selectedVariant?.quantityAvailable
                ? `${selectedVariant.quantityAvailable} items available`
                : '0'
            }`}
            type="number"
            min={0}
            max={selectedVariant?.quantityAvailable}
            defaultValue={quantityParam ?? ''}
            className="w-44"
          />
        </div>
      </div>
    </>
  );
}
