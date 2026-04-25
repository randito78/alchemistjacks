import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';

import { getBannerSrc } from '@/lib/helper.client';

type BannerImageProps = {
  banner: string;
  alt: string;
  /** Tailwind aspect-ratio utility, e.g. `aspect-[5/2]` */
  aspectClassName?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: 'none' | 'top';
};

export default function BannerImage({
  banner,
  alt,
  aspectClassName = 'aspect-[5/2]',
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px',
  priority,
  rounded = 'none',
}: BannerImageProps) {
  const src = getBannerSrc(banner);

  return (
    <div
      className={clsx(
        'relative w-full overflow-hidden bg-gray-200 dark:bg-gray-800',
        aspectClassName,
        rounded === 'top' && 'rounded-t-md',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className='object-cover'
      />
    </div>
  );
}
