import { CardTypes } from '../../types/cardApiTypes';

export const transformDataForCard = (
  translate: { [key: string]: string },
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
    { name: translate.name, value: name },
    { name: translate.breed, value: breed },
    { name: translate.age, value: age },
    { name: translate.weight, value: weight },
    { name: translate.dailyFood, value: dailyFood },
    { name: translate.lastVetVisit, value: lastVetVisit },

    { name: translate.adoptionDate, value: adoptionDate },
    { name: translate.temperament, value: temperament },
    { name: translate.likes, value: likes.join(', ') },
    { name: translate.dislikes, value: dislikes.join(', ') },
    { name: translate.owner, value: ownerName },
    { name: translate.medicalRecords, value: medicalRecords.join(', ') },
  ];

  return cardId ? attribs : attribs.slice(0, 6);
};
