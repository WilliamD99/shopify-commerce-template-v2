import Image from 'next/image';
import Link from 'next/link';
import { CarouselItem } from '~/components/ui/carousel';

interface HomeSliderItemProps {
  item: {
    node: {
      handle: string;
      fields: {
        key: string;
        type: string;
        value: string;
        reference?: {
          image: {
            url: string;
          };
        };
      }[];
    };
  };
}

export default function HomeSliderItem({ item }: HomeSliderItemProps) {
  const imgOption = item.node.fields.find((item) => item.key === 'background');
  const imgUrl = imgOption?.reference?.image.url ?? '/';

  const imgMobileOption = item.node.fields.find((item) => item.key === 'background_mobile');
  const imgMobileUrl = imgMobileOption?.reference?.image.url ?? imgUrl;

  const titleOption = item.node.fields.find((item) => item.key === 'title');
  const descOption = item.node.fields.find((item) => item.key === 'description');
  const btnOption = item.node.fields.find((item) => item.key === 'button');
  const btnLinkOption = item.node.fields.find((item) => item.key === 'button_link');

  return (
    <CarouselItem className="slider_item relative h-full w-full">
      {imgOption && (
        <picture>
          <source media="(max-width: 768px)" srcSet={imgMobileUrl} />
          <source media="(max-width: 1921px)" srcSet={imgUrl} />
          <Image
            fill
            src={imgUrl}
            sizes=""
            alt={item.node.handle}
            className="slider_bg object-contain lg:object-cover"
            priority
          />
        </picture>
      )}
      <div className="relative z-50 flex h-full flex-col justify-end space-y-3 pb-10 pl-5 pr-20 lg:w-1/2 lg:space-y-5 lg:pb-20 lg:pl-16 lg:pr-0">
        <p className="text-xl font-bold text-white lg:text-4xl">{titleOption?.value}</p>

        {descOption && <p className="text-sm text-white lg:text-lg">{descOption?.value}</p>}
        {btnOption && (
          <>
            <Link
              className="w-fit rounded-xl bg-white px-[20px] py-[6px] text-sm font-semibold text-black transition hover:opacity-85 lg:text-base"
              href={btnLinkOption?.value ?? '#'}
            >
              {btnOption?.value}
            </Link>
          </>
        )}
      </div>
    </CarouselItem>
  );
}
