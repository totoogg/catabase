import { CardList, Pagination } from '@/widgets';
import cls from './Main.module.css';
import { Outlet } from 'react-router';

export const Main = () => {
  return (
    <div className={cls.Main}>
      <div className="wrapper">
        <div className={cls.content}>
          <CardList />
          <Pagination />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

Main.displayName = 'Main';
