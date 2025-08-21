import { apiSlice, CardTypes, ResError } from '@/shared';

export const apiSliceWithCat = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCatById: builder.query<CardTypes, string>({
      query: (id) => `/${id}`,
      transformErrorResponse: (response: ResError) => response.status,
    }),
  }),
});

export const { useGetCatByIdQuery } = apiSliceWithCat;
