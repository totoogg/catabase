import { Selector } from '@/components';
import cls from './Header.module.css';

const sort = [
  'Country name Z-A',
  'Country name A-Z',
  'Population ↑',
  'Population ↓',
];

export const Sort = () => {
  const handleSelect = (option: string) => {
    if (option === 'Country name Z-A') {
      console.log('nameCountryUp');
    } else if (option === 'Country name A-Z') {
      console.log('nameCountryDown');
    } else if (option === 'Population ↑') {
      console.log('populationUp');
    } else if (option === 'Population ↓') {
      console.log('populationDown');
    }
  };

  return (
    <div className={cls.sort}>
      Sort:
      <Selector
        options={sort}
        label={'Select sort'}
        onChange={handleSelect}
        className="selectSort"
      />
    </div>
  );
};
