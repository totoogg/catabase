import { Selector } from '@/components';
import cls from './Header.module.css';

const years = Array.from({ length: 2024 - 1750 }, (_, i) => `${1750 + i}`);

export const ChooseYear = () => {
  const handleChange = (value: string) => {
    console.log(value);
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
