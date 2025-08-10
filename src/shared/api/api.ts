import { URL } from '../consts/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: () => ({}),
  keepUnusedDataFor: 30,
});
