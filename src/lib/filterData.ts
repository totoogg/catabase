import { ICountry } from '@/types/types';

function sortByName(
  a: ICountry,
  b: ICountry,
  direction: 'asc' | 'desc'
): number {
  return direction === 'asc'
    ? a.country.localeCompare(b.country)
    : b.country.localeCompare(a.country);
}

function sortByPopulation(
  a: ICountry,
  b: ICountry,
  direction: 'asc' | 'desc',
  selectedYear?: string
): number {
  const chosenYear = Number(selectedYear);

  const getPopulation = (country: ICountry): number => {
    if (chosenYear) {
      return (
        Number(country.data.find((el) => el.year === chosenYear)?.population) ||
        0
      );
    }
    return Number(country.population) || 0;
  };

  const aPopulation = getPopulation(a);
  const bPopulation = getPopulation(b);

  return direction === 'asc'
    ? aPopulation - bPopulation
    : bPopulation - aPopulation;
}

function getSortFunction(sortConfig: string, selectedYear: string) {
  switch (sortConfig) {
    case 'nameCountryUp':
      return (a: ICountry, b: ICountry) => sortByName(a, b, 'desc');
    case 'nameCountryDown':
      return (a: ICountry, b: ICountry) => sortByName(a, b, 'asc');
    case 'populationUp':
      return (a: ICountry, b: ICountry) =>
        sortByPopulation(a, b, 'asc', selectedYear);
    case 'populationDown':
      return (a: ICountry, b: ICountry) =>
        sortByPopulation(a, b, 'desc', selectedYear);
    default:
      return () => 0;
  }
}

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
    }));
  }

  result = result.filter((el) => {
    const matchesRegion = !regionFilter || el.region === regionFilter;
    const matchesSearch =
      !searchQuery ||
      el.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const sortFunction = getSortFunction(sortConfig, selectedYear);
  result = result.sort(sortFunction);

  return result;
}
