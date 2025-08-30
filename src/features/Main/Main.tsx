import { FC } from 'react';
import cls from './Main.module.css';
import { useData } from '@/lib/useData';

interface MainProps {
  selectedYear: string;
  regionFilter: string;
  searchQuery: string;
  sortConfig: string;
  selectedColumns: string[];
}

export const Main: FC<MainProps> = () => {
  const data = useData();

  console.log(data);

  return <main className={cls.main}>bklj</main>;
};
