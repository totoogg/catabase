import { URL } from '../consts/api';

interface GetCardsProps {
  search?: string;
  page?: number;
  limit?: number;
}

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

    return { status: res.status, res: data, response: res, pages: -1 };
  } catch {
    return {
      status: -1,
      res: 'Network error. Could not send request',
      pages: -1,
    };
  }
};

export async function getCards(props: GetCardsProps) {
  const { limit = 10, page = 1, search = '' } = props;

  const res = await getResponse(
    URL + `?name_like=${search}&_limit=${limit}&_page=${page}`
  );

  const pages = Math.ceil(
    Number(res?.response?.headers.get('X-Total-Count') ?? 0) / limit
  );

  res.pages = pages;

  return res;
}

export async function getCardById(id: string) {
  return await getResponse(URL + `/` + id);
}
