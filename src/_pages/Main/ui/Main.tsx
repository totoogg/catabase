import { CardList, ChooseCard, Pagination } from '@/widgets';
import cls from './Main.module.css';
import { FC } from 'react';
import { getCards } from '@/shared';

interface MainProps {
  page: string;
  query: string;
}

export const Main: FC<MainProps> = async ({ page, query }) => {
  const { status, res, pages } = await getCards({
    page: parseInt(page),
    search: query,
  });

  return (
    <div className={cls.Main}>
      <div className="wrapper">
        <div className={cls.content}>
          <CardList data={res} status={status} />
          <ChooseCard />
          <Pagination count={pages ?? 1} />
        </div>
      </div>
    </div>
  );
};

Main.displayName = 'Main';

export default Main;
