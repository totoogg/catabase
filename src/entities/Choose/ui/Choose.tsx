import { useAppSelector } from '@/shared';
import { selectCountChoose } from '../model/slice/chooseSlice';
import cls from './Choose.module.css';

export const Choose = () => {
  const count = useAppSelector(selectCountChoose);

  const text =
    count === 1 ? `${count} item is selected` : `${count} items are selected`;

  return <h3 className={cls.choose}>{text}</h3>;
};
