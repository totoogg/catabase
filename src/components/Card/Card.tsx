import { Data } from '@/features/dataSlice';
import { FC } from 'react';
import cls from './Card.module.css';

interface CardProps {
  data: Data;
  last?: boolean;
}

export const Card: FC<CardProps> = ({ data, last }) => {
  const renderData = [
    { name: 'Username', value: data.username },
    { name: 'Age', value: data.age },
    { name: 'Email', value: data.email },
    { name: 'Password', value: data.password },
    { name: 'Confirm Password', value: data.confirmPassword },
    { name: 'Gender', value: data.gender },
    { name: 'Accept', value: String(data.accept) },
    { name: 'File', value: data.file },
    { name: 'Country', value: data.country },
  ];

  return (
    <div className={[cls.wrapper, last ? cls.last : ''].join(' ')}>
      {renderData.map((item) => (
        <p key={item.name} className={cls.content}>
          <b>{item.name}: </b>
          {item.name === 'File' ? (
            <img className={cls.image} src={item.value} alt="Image" />
          ) : (
            <i>{item.value}</i>
          )}
        </p>
      ))}
    </div>
  );
};
