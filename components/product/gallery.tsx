'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-3 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <>
      <div className="relative flex aspect-square h-full max-h-[550px] w-[550px] flex-row space-x-2 overflow-hidden">
        {images.length > 1 ? (
          <ul className="flex flex-col items-center gap-2 py-1 lg:mb-0">
            {images.map((image, index) => {
              const isActive = index === imageIndex;
              const imageSearchParams = new URLSearchParams(searchParams.toString());

              imageSearchParams.set('image', index.toString());

              return (
                <li key={image.src} className="h-16 w-16 rounded-md">
                  <Link
                    aria-label="Enlarge product image"
                    href={createUrl(pathname, imageSearchParams)}
                    scroll={false}
                    className="h-full w-full"
                  >
                    <GridTileImage
                      alt={image.altText}
                      src={image.src}
                      width={80}
                      height={80}
                      active={isActive}
                      isInteractive={false}
                      cover={true}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
        <div className="relative h-full w-full">
          {images[imageIndex] && (
            <Image
              className="h-full w-full object-cover"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={images[imageIndex]?.altText as string}
              src={images[imageIndex]?.src as string}
              priority={true}
            />
          )}
        </div>

        {images.length > 1 ? (
          <div className="absolute bottom-6 right-4 flex justify-center">
            <div className="mx-auto flex items-center space-x-2 text-black dark:border-black dark:bg-neutral-900/80">
              <div className="h-8 rounded-full bg-white">
                <Link
                  aria-label="Previous product image"
                  href={previousUrl}
                  className={buttonClassName}
                  scroll={false}
                >
                  <ArrowLeftIcon className="h-4" />
                </Link>
              </div>
              <div className="h-8 rounded-full bg-white">
                <Link
                  aria-label="Next product image"
                  href={nextUrl}
                  className={buttonClassName}
                  scroll={false}
                >
                  <ArrowRightIcon className="h-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
