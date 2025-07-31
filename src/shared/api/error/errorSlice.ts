import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IError {
  error: string;
}

const initialState: IError = {
  error: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export const selectError = (state: RootState) => state.error.error;

export default errorSlice.reducer;
