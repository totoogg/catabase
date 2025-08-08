import { apiSlice, CardTypes } from '@/shared';

export const apiSliceWithCat = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCatById: builder.query<CardTypes, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCatByIdQuery } = apiSliceWithCat;
