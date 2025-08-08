import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('https://react-backend-rss.vercel.app/cats/:id', ({ params }) => {
    if (params.id === '1') {
      const mockData = {
        id: '1',
        name: 'Test Cat',
        breed: 'Siamese',
        age: 3,
        weight: '4.5',
        dailyFood: '200',
        lastVetVisit: '2023-05-15',
        adoptionDate: '2021-02-10',
        medicalRecords: ['Vaccinated', 'Neutered'],
        imageUrl: 'https://example.com/cat1.jpg',
        isVaccinated: false,
        isSterilized: false,
        characteristics: {
          temperament: '',
          likes: [],
          dislikes: [],
        },
        owner: {
          name: '',
        },
      };

      return HttpResponse.json(mockData);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.get('https://react-backend-rss.vercel.app/cats', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('name_like') || '';
    const page = parseInt(url.searchParams.get('_page') || '1', 10);
    const limit = parseInt(url.searchParams.get('_limit') || '10', 10);

    if (search === 'error') {
      return HttpResponse.json({ error: 'Server Error' }, { status: 500 });
    }

    if (search === 'empty') {
      return HttpResponse.json([]);
    }

    const startIndex = (page - 1) * limit;
    const data = Array.from({ length: limit }, (_, i) => ({
      id: `${page}-${startIndex + i}`,
      name: `Cat ${startIndex + i} ${search}`,
      url: `https://example.com/cat${startIndex + i}.jpg`,
      characteristics: {},
      owner: {},
    }));

    return HttpResponse.json(data);
  }),
];

export { handlers };
