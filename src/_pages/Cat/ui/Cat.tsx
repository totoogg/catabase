import { CardId } from '@/entities';
import cls from './Cat.module.css';
import { FC, Suspense } from 'react';
import { Close, ResetCache, ToggleLang, ToggleTheme } from '@/features';
import { Wrapper } from './Wrapper';
import { SkeletonLoading } from '@/entities/CardId/ui/SkeletonLoading';

interface CatProps {
  id: string;
}

export const Cat: FC<CatProps> = ({ id }) => {
  return (
    <Wrapper className={cls.Cat}>
      <div className={cls.wrapper} data-testid="wrapper">
        <div className={cls.content} data-testid="content">
          <div className={cls.btnContainer}>
            <ToggleTheme />
            <ResetCache />
            <ToggleLang />
            <Close />
          </div>

          <Suspense fallback={<SkeletonLoading />}>
            <CardId id={id} />
          </Suspense>
        </div>
      </div>
    </Wrapper>
  );
};
