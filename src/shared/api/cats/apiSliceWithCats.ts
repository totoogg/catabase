import { apiSlice } from '../api';
import { CardTypes } from '../../types/cardApiTypes';
import { setErrorHome } from '../error/errorSlice';
import { setCount } from '../count/countSlice';
import { Meta, ResError } from '../../types/queryTypes';

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

          if (error.error.status > 499) {
            dispatch(setErrorHome('Server error'));
            return;
          }

          if (error.error.status > 399) {
            dispatch(setErrorHome('Invalid request'));
            return;
          }

          dispatch(setErrorHome('Network error. Could not send request'));
        }
      },
    }),
  }),
});

export const { useLazyGetCatsQuery } = apiSliceWithCats;
