export interface IData {
  year: number | undefined;
  population: number | undefined;
  co2: number | undefined;
  co2_per_capita: number | undefined;
  methane: number | undefined;
  oil_co2: number | undefined;
  temperature_change_from_co2: number | undefined;
}

export interface ICountry {
  country: string;
  region: string;
  iso_code: string | undefined;
  data: IData[];
  population: number;
}
