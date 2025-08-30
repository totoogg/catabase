import { useEffect, useState } from 'react';
import { Header } from './features/Header/Header';
import { Main } from './features/Main/Main';

export function App() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [year, setYear] = useState('');
  const [columns, setColumns] = useState(['year', 'population']);

  useEffect(() => {
    console.log('search', search);
    console.log('sort', sort);
    console.log('year', year);
    console.log('columns', columns);
  }, [columns, search, sort, year]);

  return (
    <>
      <Header
        columns={columns}
        onChangeColumn={setColumns}
        onChangeSearch={setSearch}
        onChangeSort={setSort}
        onChangeYear={setYear}
      />
      <Main />
    </>
  );
}
