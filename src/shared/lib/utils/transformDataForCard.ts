import { CardTypes } from '../../types/cardApiTypes';

export const transformDataForCard = (
  card: CardTypes,
  cardId: boolean = false
) => {
  const {
    name = '',
    breed = '',
    age = '',
    weight = '',
    lastVetVisit = '',
    dailyFood = '',
    adoptionDate = '',
    characteristics: { temperament = '', likes = [], dislikes = [] },
    owner: { name: ownerName = '' },
    medicalRecords = [],
  } = card;

  const attribs = [
    { name: 'Name', value: name },
    { name: 'Breed', value: breed },
    { name: 'Age', value: age },
    { name: 'Weight', value: weight },
    { name: 'Daily Food', value: dailyFood },
    { name: 'Last Visit', value: lastVetVisit },

    { name: 'Adoption Date', value: adoptionDate },
    { name: 'Temperament', value: temperament },
    { name: 'Likes', value: likes.join(', ') },
    { name: 'Dislikes', value: dislikes.join(', ') },
    { name: 'Owner', value: ownerName },
    { name: 'Medical Records', value: medicalRecords.join(', ') },
  ];

  return cardId ? attribs : attribs.slice(0, 6);
};
