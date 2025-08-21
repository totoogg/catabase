import { useAppSelector } from '@/store';
import { selectData } from '../dataSlice';
import { Card } from '@/components/Card/Card';
import cls from './Main.module.css';

export const Main = () => {
  const data = useAppSelector(selectData);

  return (
    <main className={cls.main}>
      {data.length === 0 && (
        <p className={cls.empty}>
          Empty. Please fill out and submit an Uncontrolled Form or Controlled
          Form.
        </p>
      )}
      {data.map((item, index) => (
        <Card
          key={item.username + item.password + index}
          data={item}
          last={data.length - 1 === index}
        />
      ))}
    </main>
  );
};
