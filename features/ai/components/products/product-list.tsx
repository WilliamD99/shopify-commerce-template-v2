import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import { Product } from '~/lib/shopify/types';
import ProductCard from './product-card';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <>
      <Carousel
        opts={{
          loop: true
        }}
      >
        <CarouselContent className="product-list">
          {products.map((product, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
