import { FC } from 'react';
import cls from './Main.module.css';

const headerColumns = ['Country', 'Population', 'ISO Code'];

export const GridHeader: FC = () => {
  return (
    <div className={cls['main-header']}>
      {headerColumns.map((column) => (
        <div key={column}>{column}</div>
      ))}
    </div>
  );
};
