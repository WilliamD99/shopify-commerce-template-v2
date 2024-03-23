'use client';

import { useActions, useUIState } from 'ai/rsc';
import Image from 'next/image';
import { Product } from '~/lib/shopify/types';
import { AI } from '../../action';

export default function ProductCard({ product }: { product: Product }) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  let minPrice = product.priceRange.minVariantPrice.amount;
  let maxPrice = product.priceRange.maxVariantPrice.amount;

  return (
    <>
      <div
        onClick={async () => {
          const response = await submitUserMessage(`View product handle ${product.handle}`);
          setMessages((currentMessages) => [...currentMessages, response]);
        }}
        id={product.handle}
        className="product-card relative flex cursor-pointer flex-col justify-between bg-white"
      >
        <div className="product-image relative h-32 w-32">
          <Image src={product.featuredImage.url} alt={product.featuredImage.altText} fill />
        </div>

        <div className="flex flex-col space-y-2">
          <p className="product-title text- overflow-hidden text-ellipsis whitespace-nowrap pt-4 text-xs text-black">
            {product.title}
          </p>

          {minPrice === maxPrice ? (
            <div className="product-price text-xs text-black">${minPrice}</div>
          ) : (
            <div className="product-price text-xs text-black">
              ${minPrice} - ${maxPrice}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
