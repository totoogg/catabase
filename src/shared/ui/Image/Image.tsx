'use client';

import { FC, useEffect, useState } from 'react';
import ImageError from '../../assets/icons/imgError.svg';
import cls from './Image.module.css';
import { Skeleton } from '../Skeleton/Skeleton';
import ImageNext from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  height: string;
  className?: string;
}

export const AppImage: FC<ImageProps> = (props) => {
  const { alt, src, height, className } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const { src } = props;
    const image = new Image();

    image.src = src ?? '';

    image.onload = () => {
      setIsLoading(true);
    };
    image.onerror = () => {
      setIsLoading(true);
      setHasError(true);
    };
  });

  if (!isLoading) {
    return <Skeleton width="100%" height={height} />;
  }

  if (hasError) {
    return (
      <ImageNext
        height={parseInt(height)}
        width={parseInt(height)}
        src={ImageError}
        alt={'error'}
      />
    );
  }

  return (
    <ImageNext
      className={[cls.Image, className].join(' ')}
      height={parseInt(height)}
      width={parseInt(height)}
      src={src}
      alt={alt}
      unoptimized
      priority
    />
  );
};

AppImage.displayName = 'AppImage';
