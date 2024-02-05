'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from 'components/ui/carousel';
import Link from 'next/link';
import { GridTileImage } from '~/components/grid/tile';
import { Product } from '~/lib/shopify/types';

export default function RelatedCarousel({ relatedProducts }: { relatedProducts: Product[] }) {
  return (
    <Carousel
      opts={{
        loop: true
      }}
    >
      <CarouselContent>
        {relatedProducts.map((product: any) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <li key={product.handle} className="aspect-square h-full w-full flex-none list-none">
              <Link className="relative h-full w-full" href={`/product/${product.handle}`}>
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                  isInteractive={false}
                />
              </Link>
            </li>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
