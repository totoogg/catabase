import { countries } from '@/const/countries';
import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Data {
  username: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean | string;
  file: string;
  country: string;
}

export interface IData {
  data: Data[];
  countries: string[];
}

const initialState: IData = {
  data: [],
  countries: countries,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addData } = dataSlice.actions;

export const selectData = (state: RootState) => state.data.data;
export const selectCountries = (state: RootState) => state.data.countries;

export default dataSlice.reducer;
