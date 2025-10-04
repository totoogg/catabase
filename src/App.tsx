import { memo, Suspense, useState } from 'react';
import { Header } from './features/Header/Header';
import { Main } from './features/Main/Main';
import { Loader } from './components';

export const App = memo(() => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [year, setYear] = useState('');
  const [region, setRegion] = useState('');
  const [columns, setColumns] = useState(['year', 'population']);

  return (
    <>
      <Header
        columns={columns}
        onChangeColumn={setColumns}
        onChangeSearch={setSearch}
        onChangeSort={setSort}
        onChangeYear={setYear}
        onChangeRegion={setRegion}
      />
      <Suspense fallback={<Loader />}>
        <Main
          selectedYear={year}
          regionFilter={region}
          searchQuery={search}
          sortConfig={sort}
          selectedColumns={columns}
        />
      </Suspense>
    </>
  );
});

App.displayName = 'App';
