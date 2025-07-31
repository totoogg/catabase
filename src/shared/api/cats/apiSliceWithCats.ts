import { apiSlice } from '../api';
import { CardTypes } from '../../types/cardApiTypes';

interface GetCardsProps {
  search?: string;
  page?: number;
  limit?: number;
}

export const apiSliceWithCats = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCats: builder.query<CardTypes[], GetCardsProps>({
      query: ({ limit = 10, page = 1, search = '' }) =>
        `?name_like=${search}&_limit=${limit}&_page=${page}`,
    }),
  }),
});

export const { useLazyGetCatsQuery } = apiSliceWithCats;
