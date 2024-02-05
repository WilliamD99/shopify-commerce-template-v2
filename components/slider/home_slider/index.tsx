import { getSliderContent } from '~/lib/shopify';
import HomeSliderClient from './carousel';

export default async function HomeSlider() {
  const res = await getSliderContent(process.env.SHOPIFY_HOMEPAGE_SLIDER);

  return <>{res && <HomeSliderClient data={res} />}</>;
}
