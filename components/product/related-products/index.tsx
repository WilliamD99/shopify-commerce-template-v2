import { getProductRecommendations } from '~/lib/shopify';
import Carousel from './carousel';

interface RelatedProductsProps {
  id: string;
}

export default async function RelatedProducts({ id }: RelatedProductsProps) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <>
      <div className="related py-20">
        <h2 className="mb-4 text-2xl font-semibold">You might also like</h2>
        <Carousel relatedProducts={relatedProducts} />
      </div>
    </>
  );
}
