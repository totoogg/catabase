'use client';

import {
  AppImage,
  CardTypes,
  ResError,
  transformDataForCard,
  transformError,
} from '@/shared';
import cls from './CardId.module.css';
import { SkeletonLoading } from './SkeletonLoading';
import { useParams } from 'next/navigation';

export const CardId = () => {
  const params = useParams();

  if (params) {
    return <SkeletonLoading />;
  }

  if (params) {
    return (
      <div className={cls.error}>
        {transformError((params as ResError).status ?? '1')}
      </div>
    );
  }

  if (!params) {
    return null;
  }

  const { name, imageUrl } = params as CardTypes;

  const attribs = transformDataForCard(params as CardTypes, true);

  return (
    <div className={cls.content}>
      <AppImage
        className={cls.cardImage}
        src={imageUrl}
        alt={name}
        height="800"
      />
      <div className={cls.cardBlock}>
        {attribs.map((item) => (
          <p key={item.name}>
            <b>{item.name}:</b> <i>{item.value}</i>
          </p>
        ))}
      </div>
    </div>
  );
};
