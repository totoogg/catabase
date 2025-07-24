import { URL } from '../consts/api';

interface GetCardsProps {
  search?: string;
  page?: number;
  limit?: number;
}

interface TotalPagesEvent extends Event {
  pages: number;
}

const event = new Event('totalPages') as TotalPagesEvent;

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

    const pages = Math.ceil(
      Number(res.headers.get('X-Total-Count') ?? 0) / limit
    );

    event.pages = pages;
    window.dispatchEvent(event);

    return { status: res.status, res: data };
  } catch {
    event.pages = -1;
    window.dispatchEvent(event);

    return { status: -1, res: 'Network error. Could not send request' };
  }
}
