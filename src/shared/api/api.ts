import { URL } from '../consts/api';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { setLoader } from './loader/loaderSlice';
import { setErrorDetail, setErrorHome } from './error/errorSlice';

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  api.dispatch(setLoader(true));
  api.dispatch(setErrorDetail(''));
  api.dispatch(setErrorHome(''));

  try {
    const result = await fetchBaseQuery({ baseUrl: URL })(
      args,
      api,
      extraOptions
    );

    return result;
  } finally {
    api.dispatch(setLoader(false));
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
