import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';

const { SHOPIFY_SOCIAL_FB, SHOPIFY_SCOIAL_INSTA, SHOPIFY_SOCIAL_YT, SHOPIFY_SOCIAL_X } =
  process.env;

export default function FooterSocial() {
  return (
    <>
      {SHOPIFY_SOCIAL_FB && (
        <Link
          href={SHOPIFY_SOCIAL_FB}
          className="flex h-fit items-center justify-center rounded-full bg-neutral-500 px-[5px] py-[5px] transition hover:bg-white"
        >
          <TooltipProvider delayDuration={300} disableHoverableContent>
            <Tooltip>
              <TooltipTrigger>
                <div className="relative h-5 w-5">
                  <Image src="/assets/icons/facebook.svg" fill alt="facebook icon" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Facebook</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      )}
      {SHOPIFY_SCOIAL_INSTA && (
        <Link
          href={SHOPIFY_SCOIAL_INSTA}
          className="flex h-fit items-center justify-center rounded-full bg-neutral-500 px-[5px] py-[5px] transition hover:bg-white"
        >
          <TooltipProvider delayDuration={300} disableHoverableContent>
            <Tooltip>
              <TooltipTrigger>
                <div className="relative h-5 w-5">
                  <Image src="/assets/icons/instagram.svg" fill alt="facebook icon" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Instagram</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      )}
      {SHOPIFY_SOCIAL_YT && (
        <Link
          href={SHOPIFY_SOCIAL_YT}
          className="flex h-fit items-center justify-center rounded-full bg-neutral-500 px-[5px] py-[5px] transition hover:bg-white"
        >
          <TooltipProvider delayDuration={300} disableHoverableContent>
            <Tooltip>
              <TooltipTrigger>
                <div className="relative h-5 w-5">
                  <Image src="/assets/icons/youtube.svg" fill alt="facebook icon" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Youtube</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      )}
      {SHOPIFY_SOCIAL_X && (
        <Link
          href={SHOPIFY_SOCIAL_X}
          className="flex h-fit items-center justify-center rounded-full bg-neutral-500 px-[5px] py-[5px] transition hover:bg-white"
        >
          <TooltipProvider delayDuration={300} disableHoverableContent>
            <Tooltip>
              <TooltipTrigger>
                <div className="relative h-5 w-5">
                  <Image src="/assets/icons/twitter.svg" fill alt="facebook icon" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">X</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      )}
    </>
  );
}
