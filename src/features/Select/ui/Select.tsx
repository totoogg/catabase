import { addChoose, removeChoose, selectChoose } from '@/entities';
import { CardTypes, useAppDispatch, useAppSelector } from '@/shared';
import { FC } from 'react';
import Heart from '@/shared/assets/icons/heart.svg';
import cls from './Select.module.css';
import Image from 'next/image';

interface SelectProps {
  data: CardTypes;
}

export const Select: FC<SelectProps> = ({ data }) => {
  const chooses = useAppSelector(selectChoose);
  const dispatch = useAppDispatch();

  const select = chooses[data.id];

  const handleSelect = () => {
    if (select) {
      dispatch(removeChoose(data));
    } else {
      dispatch(addChoose(data));
    }
  };

  return (
    <div
      className={[cls.select, select ? cls.selected : ''].join(' ')}
      onClick={handleSelect}
    >
      <Image
        priority
        className={cls.icon}
        src={Heart}
        alt="choose"
        width={40}
        height={40}
      />
    </div>
  );
};
