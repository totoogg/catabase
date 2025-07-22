import { CardList } from '@/widgets';
import { memo } from 'react';
import cls from './Main.module.css';

export const Main = memo(() => {
  return (
    <div className={cls.Main}>
      <div className="wrapper">
        <CardList />
      </div>
    </div>
  );
});

Main.displayName = 'Main';
