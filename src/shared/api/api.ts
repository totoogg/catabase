import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { URL } from '../consts/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  try {
    const result = await fetchBaseQuery({ baseUrl: URL })(
      args,
      api,
      extraOptions
    );

    return result;
  } catch (error) {
    console.error('API Error:', error);
    return { error };
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  keepUnusedDataFor: 30,
});
