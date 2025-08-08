import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IError {
  errorHome: string;
  errorDetail: string;
}

const initialState: IError = {
  errorHome: '',
  errorDetail: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorHome: (state, { payload }: PayloadAction<string>) => {
      state.errorHome = payload;
    },
    setErrorDetail: (state, { payload }: PayloadAction<string>) => {
      state.errorDetail = payload;
    },
  },
});

export const { setErrorHome, setErrorDetail } = errorSlice.actions;

export const selectErrorHome = (state: RootState) => state.error.errorHome;

export const selectErrorDetail = (state: RootState) => state.error.errorDetail;

export default errorSlice.reducer;
