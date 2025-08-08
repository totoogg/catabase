import cls from './Pagination.module.css';
import { ButtonPage } from '@/features';
import { selectCount, useAppSelector } from '@/shared';

export const Pagination = () => {
  const count = useAppSelector(selectCount);

  if (count <= 1) {
    return null;
  }

  return (
    <div className={cls.Pagination}>
      {Array(count)
        .fill(0)
        .map((_, index) => {
          return <ButtonPage key={index} index={index + 1} />;
        })}
    </div>
  );
};

Pagination.displayName = 'Pagination';
