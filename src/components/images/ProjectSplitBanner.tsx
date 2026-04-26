import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';

import { getBannerSrc } from '@/lib/helper.client';

type ProjectSplitBannerProps = {
  left: string;
  right: string;
  title: string;
  /** Override default `${title} (left half)` / `(right half)` for accessibility. */
  leftAlt?: string;
  rightAlt?: string;
  priority?: boolean;
  aspectClassName?: string;
  className?: string;
  sizes?: string;
};

/** Hero or card banner: two images side by side. */
export default function ProjectSplitBanner({
  left,
  right,
  title,
  leftAlt,
  rightAlt,
  priority,
  aspectClassName = 'aspect-[5/2]',
  className,
  sizes = '(max-width: 768px) 50vw, 600px',
}: ProjectSplitBannerProps) {
  const leftSrc = getBannerSrc(left);
  const rightSrc = getBannerSrc(right);
  const aLeft = leftAlt ?? `${title} (left half)`;
  const aRight = rightAlt ?? `${title} (right half)`;

  return (
    <div
      className={clsx(
        'relative w-full overflow-hidden bg-gray-200 dark:bg-gray-800',
        aspectClassName,
        'rounded-t-md',
        className
      )}
    >
      <div className='absolute inset-0 grid grid-cols-2'>
        <div className='relative min-h-0 min-w-0'>
          <Image
            src={leftSrc}
            alt={aLeft}
            fill
            sizes={sizes}
            priority={priority}
            className='object-cover'
          />
        </div>
        <div className='relative min-h-0 min-w-0 border-l border-gray-300/30 dark:border-gray-600/40'>
          <Image
            src={rightSrc}
            alt={aRight}
            fill
            sizes={sizes}
            priority={priority}
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
}
