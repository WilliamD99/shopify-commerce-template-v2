import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({
  size,
  url,
  alt
}: {
  size?: 'sm' | undefined;
  url: string;
  alt?: string;
}) {
  return (
    <div
      className={clsx('relative flex flex-none items-center justify-center overflow-hidden', {
        'h-[40px] w-[40px] rounded-xl': !size,
        'h-[30px] w-[30px] rounded-lg': size === 'sm'
      })}
    >
      <LogoIcon
        className={clsx({
          'h-[16px] w-[16px]': !size,
          'h-[10px] w-[10px]': size === 'sm'
        })}
        url={url}
        alt={alt}
      />
    </div>
  );
}
