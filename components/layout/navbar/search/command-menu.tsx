import { Product } from 'lib/shopify/types';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '~/components/ui/command';

import {
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';
import Price from '~/components/price';
import { Skeleton } from '~/components/ui/skeleton';

interface CommandMenuProps {
  input: string;
  data: Product[] | undefined;
  isLoading?: boolean;
  show: boolean;
}

function CommandMenu({ input, data, isLoading = false, show }: CommandMenuProps, ref: any) {
  return (
    <>
      <Command
        id="cmd-menu"
        className={clsx(
          'absolute top-0 h-fit translate-y-10 bg-white transition',
          show && 'visible opacity-100',
          !show && 'invisible opacity-0'
        )}
        ref={ref}
      >
        <CommandList>
          <CommandGroup heading={`Results (${data?.length ?? 0})`}>
            {input.length < 3 && (
              <CommandItem className="text-xs">
                Please type at least 3 characters to search
              </CommandItem>
            )}
            {data?.length === 0 && input.length > 0 && (
              <CommandItem className="text-xs">No results.</CommandItem>
            )}
            {input.length >= 3 && data && data.length > 0 && (
              <>
                {data.map((result) => (
                  <Link href={`/product/${result.handle}`}>
                    <CommandItem
                      className="relative grid cursor-pointer grid-cols-3 hover:bg-neutral-100"
                      key={result.id}
                    >
                      <div className="relative h-10 w-10">
                        <Image
                          fill
                          src={result.featuredImage.url}
                          alt={result.featuredImage.altText}
                        />
                      </div>
                      <div className="col-span-2 flex flex-col space-y-1">
                        <p className="text-xs font-semibold">{result.title}</p>
                        <Price
                          amount={result.priceRange.maxVariantPrice.amount}
                          showCurrency={false}
                          className="text-xs"
                        />
                      </div>
                    </CommandItem>
                  </Link>
                ))}
              </>
            )}
            {isLoading && (
              <CommandItem className="relative grid h-12 grid-cols-3 gap-x-3">
                <Skeleton className="h-10 w-10 bg-neutral-200" />
                <div className="col-span-2 flex h-full flex-col justify-center space-y-1">
                  <Skeleton className="h-1/4 w-2/3 bg-neutral-200" />
                  <Skeleton className="h-1/4 w-1/2 bg-neutral-200" />
                </div>
              </CommandItem>
            )}
          </CommandGroup>
          <CommandGroup heading="Suggestions">
            <CommandItem className="hover:bg-neutral-100">
              <StarIcon className="mr-2 h-4 w-4" />

              <Link href="#" className="text-xs">
                Featured Collection
              </Link>
            </CommandItem>
            <CommandItem className="hover:bg-neutral-100">
              <RocketLaunchIcon className="mr-2 h-4 w-4" />
              <Link href="#" className="text-xs">
                Latest Arrival
              </Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Others">
            <CommandItem className="hover:bg-neutral-100">
              <EnvelopeIcon className="mr-2 h-4 w-4" />
              <Link href="/contact" className="text-xs">
                Contact Us
              </Link>
            </CommandItem>
            <CommandItem className="hover:bg-neutral-100">
              <QuestionMarkCircleIcon className="mr-2 h-4 w-4" />
              <Link href="/questions" className="text-xs">
                Q&A
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}

export default forwardRef(CommandMenu);
