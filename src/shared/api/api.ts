import { URL } from '../consts/api';

/* interface GetCardsProps {
  search?: string;
  page?: number;
  limit?: number;
}

interface TotalPagesEvent extends Event {
  pages: number;
}

const event = new Event('totalPages') as TotalPagesEvent;

const getResponse = async (url: string) => {
  try {
    const res = await fetch(url);

    if (res.status > 499) {
      return { status: res.status, res: 'Server error' };
    }

    if (res.status > 399) {
      return { status: res.status, res: 'Invalid request' };
    }

    const data = await res.json();

    return { status: res.status, res: data, response: res };
  } catch {
    return { status: -1, res: 'Network error. Could not send request' };
  }
};

export async function getCards(props: GetCardsProps) {
  const { limit = 10, page = 1, search = '' } = props;

  const res = await getResponse(
    URL + `?name_like=${search}&_limit=${limit}&_page=${page}`
  );

  if (!res.response) {
    event.pages = -1;
    window.dispatchEvent(event);
  }

  const pages = Math.ceil(
    Number(res?.response?.headers.get('X-Total-Count') ?? 0) / limit
  );

  event.pages = pages;
  window.dispatchEvent(event);

  return res;
}

export async function getCardById(id: string) {
  return await getResponse(URL + `/` + id);
} */
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { setLoader } from './loader/loaderSlice';
import { setError } from './error/errorSlice';
import { setCount } from './count/countSlice';

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  api.dispatch(setLoader(true));

  try {
    const result = await fetchBaseQuery({ baseUrl: URL })(
      args,
      api,
      extraOptions
    );

    const error = result.error?.status;

    if (typeof error === 'number' && error > 499) {
      api.dispatch(setError('Server error'));
    }

    if (typeof error === 'number' && error > 399) {
      api.dispatch(setError('Invalid request'));
    }

    const pages = Math.ceil(
      parseInt(result.meta?.response?.headers.get('X-Total-Count') || '0') / 10
    );

    api.dispatch(setCount(pages));

    return result;
  } catch (error) {
    api.dispatch(setError('Network error. Could not send request'));
    throw error;
  } finally {
    api.dispatch(setLoader(false));
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
