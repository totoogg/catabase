import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IError {
  countPage: number;
}

const initialState: IError = {
  countPage: 0,
};

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCount: (state, { payload }: PayloadAction<number>) => {
      state.countPage = payload;
    },
  },
});

export const { setCount } = countSlice.actions;

export const selectCount = (state: RootState) => state.count.countPage;

export default countSlice.reducer;
