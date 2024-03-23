'use client';

import { useActions, useUIState } from 'ai/rsc';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { addItem } from '~/components/cart/actions';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { Product } from '~/lib/shopify/types';
import { AI } from '../../action';

export default function ProductDetails({ product }: { product: Product }) {
  const [options, setOptions] = useState<{ name: string; value: string }[]>([]);
  const [productPrice, setProductPrice] = useState<string>();
  const [selectedVariantId, setSelectedVariantId] = useState<string>();

  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage, confirmAddToCart } = useActions<typeof AI>();
  const [addToCartUI, setAddToCartUI] = useState<null | React.ReactNode>(null);

  let minPrice = product.priceRange.minVariantPrice.amount;
  let maxPrice = product.priceRange.maxVariantPrice.amount;

  const handleOptionChange = useCallback(
    (val: string, name: string) => {
      setOptions((prevOptions) => {
        const optionIndex = prevOptions.findIndex((e) => e.name === name);
        if (optionIndex !== -1) {
          // Option already exists, update its value
          return prevOptions.map((option, index) => {
            if (index === optionIndex) {
              return { ...option, value: val };
            }
            return option;
          });
        } else {
          // Option doesn't exist, add it to options
          return [...prevOptions, { name, value: val }];
        }
      });
    },
    [options]
  );

  // Need to update the price accordingly based on the selected option
  const getProductPriceFromOption = useCallback(() => {
    let allVariants = product.variants;
    let selectedVariantIndex = allVariants.findIndex((variant) => {
      if (JSON.stringify(variant.selectedOptions) == JSON.stringify(options)) {
        return variant;
      }
    });
    if (selectedVariantIndex !== -1) {
      let selectedVariant = allVariants[selectedVariantIndex];
      if (selectedVariant) {
        setProductPrice(selectedVariant.price.amount);
        setSelectedVariantId(selectedVariant.id);
      }
    }
  }, [options, productPrice, selectedVariantId]);

  const handleSubmitMsg = async () => {
    if (!options || !selectedVariantId) return;
    // const response = await confirmAddToCart(selectedVariantId, 1)
    // setAddToCartUI(response.addToCartUI)

    // setMessages((currentMessages: any) => [...currentMessages, response.newMessage])
    try {
      //
      await addItem(null, selectedVariantId);
      const response = await submitUserMessage(`Add product ${product.handle} to cart`);
      setMessages((currentMessages) => [...currentMessages, response]);
    } catch (e) {
      const response = await submitUserMessage(`Add product ${product.handle} to cart`);
      setMessages((currentMessages) => [...currentMessages, response]);
    }
  };

  useEffect(() => {
    getProductPriceFromOption();
  }, [options]);

  return (
    <>
      {addToCartUI ? (
        <div>{addToCartUI}</div>
      ) : (
        <div
          id={product.handle}
          className="product-card relative flex cursor-pointer flex-col justify-between bg-white"
        >
          <div className="product-image relative h-48 w-48">
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? 'image'}
              fill
            />
          </div>

          <div className="flex flex-col space-y-2">
            <p className="product-title text- overflow-hidden text-ellipsis whitespace-nowrap pt-4 text-base font-semibold text-black">
              {product.title}
            </p>

            {options.length === 0 ? (
              <>
                {minPrice === maxPrice ? (
                  <div className="product-price text-base text-black">${minPrice}</div>
                ) : (
                  <div className="product-price text-base text-black">
                    ${minPrice} - ${maxPrice}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="product-price text-base text-black">${productPrice}</div>
              </>
            )}

            {product.options.map((option, index) => (
              <Select
                key={`select-${option.name}-${index}`}
                onValueChange={(e) => handleOptionChange(e, option.name)}
              >
                <label className="text-xs text-gray-400" htmlFor={`select-${option.name}`}>
                  Select {option.name}
                </label>
                <SelectTrigger
                  id={`select-${option.name}`}
                  className="w-44 text-black focus:outline-none focus:ring-0 focus:ring-offset-0"
                >
                  <SelectValue placeholder={`Select ${option.name}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {option.values.map((val) => (
                      <SelectItem key={`select-${option.name}-${val}`} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ))}
            <Button
              onClick={handleSubmitMsg}
              disabled={options.length === 0}
              className={clsx('w-44 text-white', options.length === 0 && 'cursor-not-allowed')}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
