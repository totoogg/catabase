import { apiSlice } from '../api';
import { CardTypes } from '../../types/cardApiTypes';
import { setErrorHome } from '../error/errorSlice';
import { setCount } from '../count/countSlice';
import { Meta, ResError } from '../../types/queryTypes';
import { transformError } from '@/shared/lib/utils/transformError';

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
        try {
          const res = await queryFulfilled;

          const response = (res.meta as Meta)?.response;

          const pages = Math.ceil(
            parseInt(response.headers.get('X-Total-Count') || '0') / limit
          );

          dispatch(setCount(pages));
        } catch (e) {
          const error = e as ResError;

          dispatch(setErrorHome(transformError(error.error.status)));
        }
      },
    }),
  }),
});

export const { useLazyGetCatsQuery } = apiSliceWithCats;
