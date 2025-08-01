import { apiSlice, CardTypes, ResError, transformError } from '@/shared';
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

          dispatch(setErrorDetail(transformError(error.error.status)));
        }
      },
    }),
  }),
});

export const { useGetCatByIdQuery } = apiSliceWithCat;
