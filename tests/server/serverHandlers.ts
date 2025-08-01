import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('https://react-backend-rss.vercel.app/cats/', () => {
    const data = {
      name: 'Fluffy',
      breed: 'Persian',
      age: 3,
      weight: '4.5 kg',
      dailyFood: '250 g',
      lastVetVisit: '2023-05-15',
      imageUrl: 'test.jpg',
      characteristics: {},
      owner: {},
      id: '1',
    };

    const mockApiResponse = [
      { ...data, id: '1', name: 'Card 1', breed: 'Desc 1' },
      { ...data, id: '2', name: 'Card 2', breed: 'Desc 2' },
    ];

    return HttpResponse.json(mockApiResponse);
  }),
];

export { handlers };
