import cls from './CardList.module.css';
import { Skeleton } from '@/shared';

export const SkeletonLoading = () => {
  return (
    <div className={cls.CardList}>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div className={cls.skeleton} key={i}>
            <Skeleton height={250} width={250} />
            <div className={cls.skeletonContent}>
              <Skeleton height={20} width={140} />
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={180} />
              <Skeleton height={20} width={200} />
            </div>
          </div>
        ))}
    </div>
  );
};

SkeletonLoading.displayName = 'SkeletonLoading';
