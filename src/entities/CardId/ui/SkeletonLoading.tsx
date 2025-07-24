import { memo } from 'react';
import cls from './CardId.module.css';
import { Skeleton } from '@/shared';

export const SkeletonLoading = memo(() => {
  return (
    <div className={cls.content}>
      <Skeleton height={'800px'} width={'100%'} />
      <div className={cls.cardBlock}>
        <Skeleton height={30} width={'50%'} />
        <Skeleton height={30} width={'60%'} />
        <Skeleton height={30} width={'70%'} />
        <Skeleton height={30} width={'60%'} />
        <Skeleton height={30} width={'50%'} />
        <Skeleton height={30} width={'40%'} />
        <Skeleton height={30} width={'70%'} />
        <Skeleton height={30} width={'80%'} />
        <Skeleton height={30} width={'50%'} />
        <Skeleton height={30} width={'60%'} />
        <Skeleton height={30} width={'50%'} />
        <Skeleton height={60} width={'100%'} />
      </div>
    </div>
  );
});

SkeletonLoading.displayName = 'SkeletonLoading';
