import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import * as React from 'react';

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
  width: string | number;
  height: string | number;
} & ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  sizes,
  style,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete'
  );
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={clsx(
          imgClassName,
          // text-gray to hide alt text
          'bg-gray-400 text-gray-400 ',
          status === 'loading' && clsx('animate-pulse', blurClassName)
        )}
        src={src}
        width={typeof width === 'string' ? parseInt(width, 10) : width}
        height={typeof height === 'string' ? parseInt(height, 10) : height}
        alt={alt}
        onLoadingComplete={() => setStatus('complete')}
        sizes={
          sizes ??
          '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px'
        }
        style={{
          width: '100%',
          height: 'auto',
          ...(style && typeof style === 'object' ? style : {}),
        }}
        {...rest}
      />
    </figure>
  );
}
