import { CardTypes } from '@/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IChoose {
  choose: {
    [key: string]: CardTypes;
  };
  count: number;
}

const initialState: IChoose = {
  choose: {},
  count: 0,
};

const chooseSlice = createSlice({
  name: 'choose',
  initialState,
  reducers: {
    addChoose: (state, { payload }: PayloadAction<CardTypes>) => {
      state.choose[payload.id] = payload;
      state.count = state.count + 1;
    },
    removeChoose: (state, { payload }: PayloadAction<CardTypes>) => {
      delete state.choose[payload.id];
      state.count = state.count - 1;
    },

    removeAll: (state) => {
      state.choose = {};
      state.count = 0;
    },
  },
});

export const { addChoose, removeChoose, removeAll } = chooseSlice.actions;

export const selectCountChoose = (state: RootState) => state.choose.count;

export const selectChoose = (state: RootState) => state.choose.choose;

export default chooseSlice.reducer;
