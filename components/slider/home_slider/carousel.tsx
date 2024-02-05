'use client';

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from 'components/ui/carousel';
import HomeSliderItem from './carousel-item';

interface HomeSliderProps {
  data: {
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
  }[];
}

export default function HomeSlider({ data }: HomeSliderProps) {
  return (
    <>
      <Carousel
        id="home_slider"
        opts={{
          loop: true
        }}
      >
        <div className="relative px-4 py-10 lg:px-12">
          <CarouselContent className="slider_content">
            {data.map((item) => (
              <HomeSliderItem key={item.node.handle} item={item} />
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2 hidden translate-x-full justify-center lg:flex" />
          <CarouselNext className="right-0 top-1/2 hidden -translate-x-full justify-center lg:flex" />
        </div>
      </Carousel>
    </>
  );
}
