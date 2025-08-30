import { ICountry } from '@/types/types';

export function filterData(
  data: ICountry[],
  regionFilter: string,
  searchQuery: string,
  sortConfig: string,
  selectedYear: string
): ICountry[] {
  let result = [...data];

  if (Number(selectedYear)) {
    result = result.map((el) => ({
      ...el,
      population:
        Number(
          el.data.find((item) => item.year === Number(selectedYear))?.population
        ) || 'N/A',
      data: el.data.filter((item) => item.year === Number(selectedYear)),
    }));
  } else {
    result = [...data];
  }

  result = result.filter((el) => {
    const matchesRegion = !regionFilter || el.region === regionFilter;
    const matchesSearch =
      !searchQuery ||
      el.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  result = result.sort((a, b) => {
    if (sortConfig === 'nameCountryUp') {
      return a.country.localeCompare(b.country);
    } else if (sortConfig === 'nameCountryDown') {
      return b.country.localeCompare(a.country);
    } else if (sortConfig === 'populationUp') {
      return Number(a.population || 0) - Number(b.population);
    } else if (sortConfig === 'populationDown') {
      return Number(b.population) - Number(a.population);
    }
    return 0;
  });

  return result;
}
