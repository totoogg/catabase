import { FC } from 'react';
import cls from './Main.module.css';

interface GridWrapperProps {
  children: React.ReactNode;
}

export const GridWrapper: FC<GridWrapperProps> = ({ children }) => {
  return <div className={cls['grid-wrapper']}>{children}</div>;
};
