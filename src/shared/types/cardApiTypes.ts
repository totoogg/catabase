export interface CardTypes {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: string;
  isVaccinated: boolean;
  isSterilized: boolean;
  adoptionDate: string;
  characteristics: CharacteristicsTypes;
  owner: OwnerTypes;
  medicalRecords: string[];
  imageUrl: string;
  lastVetVisit: string;
  dailyFood: string;
}

export interface CharacteristicsTypes {
  temperament: string;
  likes: string[];
  dislikes: string[];
}

export interface OwnerTypes {
  name: string;
}
