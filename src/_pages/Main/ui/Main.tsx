import { CardList, ChooseCard, Pagination } from '@/widgets';
import cls from './Main.module.css';
import { FC } from 'react';
import { CardTypes } from '@/shared';

interface MainProps {
  data: CardTypes[];
  status: number;
  count: number;
}

export const Main: FC<MainProps> = ({ count, data, status }) => {
  return (
    <div className={cls.Main}>
      <div className="wrapper">
        <div className={cls.content}>
          <CardList data={data} status={status} />
          <ChooseCard />
          <Pagination count={count} />
        </div>
      </div>
    </div>
  );
};

Main.displayName = 'Main';

export default Main;
