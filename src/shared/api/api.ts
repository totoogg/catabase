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
    const data = await res.json();

    return data;
  } catch {
    throw new Error('error');
  }
}
