import { Selector } from '@/components';
import cls from './Header.module.css';
import { FC } from 'react';

const years = Array.from({ length: 2024 - 1750 }, (_, i) => `${2023 - i}`);

interface ChooseYearProps {
  onChange: (value: string) => void;
}

export const ChooseYear: FC<ChooseYearProps> = ({ onChange }) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className={cls.year}>
      Year:
      <Selector
        onChange={handleChange}
        label="Choose Year"
        options={years}
        className="ChooseYear"
      />
    </div>
  );
};
