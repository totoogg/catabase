import { apiSlice } from '../api';
import { CardTypes } from '../../types/cardApiTypes';
import { setCount } from '../count/countSlice';
import { ResError } from '../../types/queryTypes';

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
      transformErrorResponse: (response: ResError) => response.status,
      async onQueryStarted({ limit = 10 }, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        const meta = res.meta;

        if (meta && 'response' in meta && meta.response instanceof Response) {
          const response = meta.response;
          const totalCount = response.headers.get('X-Total-Count');
          const total = parseInt(totalCount || '0', 10);
          const pages = Math.ceil(total / limit);
          dispatch(setCount(pages));
        }
      },
    }),
  }),
});

export const { useGetCatsQuery } = apiSliceWithCats;
