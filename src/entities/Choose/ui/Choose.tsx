import { useAppSelector } from '@/shared';
import { selectCountChoose } from '../model/slice/chooseSlice';

export const Choose = () => {
  const count = useAppSelector(selectCountChoose);

  const text =
    count === 1 ? `${count} item is selected` : `${count} items are selected`;

  return <h3>{text}</h3>;
};
