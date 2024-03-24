import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import ProductAccordion from './accordion/index';
import ProductQuantitySelector from './quantity-selector';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-2xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto text-base text-black">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <ProductQuantitySelector variants={product.variants} options={product.options} />

      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      {product.descriptionHtml ? (
        <Prose
          className="mt-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <ProductAccordion />
    </>
  );
}
