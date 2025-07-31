import { apiSlice, CardTypes, ResError } from '@/shared';
import { setErrorDetail } from '@/shared/api/error/errorSlice';

export const apiSliceWithCat = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCatById: builder.query<CardTypes, string>({
      query: (id) => `/${id}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
          const error = e as ResError;

          if (error.error.status > 499) {
            dispatch(setErrorDetail('Server error'));
            return;
          }

          if (error.error.status > 399) {
            dispatch(setErrorDetail('Invalid request'));
            return;
          }

          dispatch(setErrorDetail('Network error. Could not send request'));
        }
      },
    }),
  }),
});

export const { useGetCatByIdQuery } = apiSliceWithCat;
