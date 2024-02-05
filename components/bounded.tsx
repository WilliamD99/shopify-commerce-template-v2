import clsx from 'clsx';
import React from 'react';

interface BoundedProps {
  as?: React.ElementType;
  size?: 'small' | 'base' | 'wide' | 'widest';
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export default function Bounded({
  as: Comp = 'div',
  size = 'base',
  className,
  children,
  id
}: BoundedProps) {
  return (
    <>
      <Comp id={id} className={clsx('px md:px-6', className)}>
        <div
          className={clsx(
            'mx-auto w-full',
            size === 'small' && 'max-w-xl',
            size === 'base' && 'max-w-3xl',
            size === 'wide' && 'max-w-4xl',
            size === 'widest' && 'max-w-6xl'
          )}
        >
          {children}
        </div>
      </Comp>
    </>
  );
}
