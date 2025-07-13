import { URL } from '../consts/api';

interface GetCardsProps {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getCards(props: GetCardsProps) {
  const { limit = 10, page = 1, search = '' } = props;

  try {
    const res = await fetch(
      URL + `?name_like=${search}&_limit=${limit}&_page=${page}`
    );

    if (res.status > 499) {
      return { status: res.status, res: 'Server error' };
    }

    if (res.status > 399) {
      return { status: res.status, res: 'Invalid request' };
    }

    const data = await res.json();

    return { status: res.status, res: data };
  } catch {
    return { status: -1, res: 'Network error. Could not send request' };
  }
}
