'use client';

import { FC, useEffect, useState } from 'react';
import ImageError from '../../assets/icons/imgError.svg';
import cls from './Image.module.css';
import { Skeleton } from '../Skeleton/Skeleton';

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
    return <Skeleton width={250} height={height} />;
  }

  if (hasError) {
    return (
      <div className={cls.Image}>
        <ImageError />
      </div>
    );
  }

  return (
    <img
      className={[cls.Image, className].join(' ')}
      height={height}
      src={src}
      alt={alt}
    />
  );
};

AppImage.displayName = 'AppImage';
