import { CardList, Pagination } from '@/widgets';
import { memo } from 'react';
import cls from './Main.module.css';

export const Main = memo(() => {
  return (
    <div className={cls.Main}>
      <div className="wrapper">
        <div className={cls.content}>
          <CardList />
          <Pagination />
        </div>
      </div>
    </div>
  );
});

Main.displayName = 'Main';
