import { apiSlice } from '../api';
import { CardTypes } from '../../types/cardApiTypes';
import { setCount } from '../count/countSlice';
import { Meta } from '../../types/queryTypes';

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
      async onQueryStarted({ limit = 10 }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;

        const response = (res.meta as Meta)?.response;

        const pages = Math.ceil(
          parseInt(response.headers.get('X-Total-Count') || '0') / limit
        );

        dispatch(setCount(pages));
      },
    }),
  }),
});

export const { useGetCatsQuery } = apiSliceWithCats;
