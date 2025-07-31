import { FC } from 'react';
import cls from './CardList.module.css';

interface NotFoundProps {
  text: string;
}

export const NotFound: FC<NotFoundProps> = ({ text }) => {
  return (
    <p className={cls.notFound}>
      No cat with the name &quot;
      {text}
      &quot; found
    </p>
  );
};

NotFound.displayName = 'NotFound';
