import { CardList, ChooseCard, Pagination } from '@/widgets';
import cls from './Main.module.css';

export const Main = () => {
  return (
    <div className={cls.Main}>
      <div className="wrapper">
        <div className={cls.content}>
          <CardList />
          <ChooseCard />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

Main.displayName = 'Main';

export default Main;
