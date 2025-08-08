import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILoader {
  isLoader: boolean;
}

const initialState: ILoader = {
  isLoader: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoader = payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export const selectIsLoader = (state: RootState) => state.loader.isLoader;

export default loaderSlice.reducer;
