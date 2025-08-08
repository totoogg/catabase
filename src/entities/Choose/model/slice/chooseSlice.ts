import { CardTypes } from '@/shared';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IChoose {
  choose: {
    [key: string]: CardTypes;
  };
}

const initialState: IChoose = {
  choose: {},
};

const chooseSlice = createSlice({
  name: 'choose',
  initialState,
  reducers: {
    addChoose: (state, { payload }: PayloadAction<CardTypes>) => {
      state.choose[payload.id] = payload;
    },
    removeChoose: (state, { payload }: PayloadAction<CardTypes>) => {
      delete state.choose[payload.id];
    },

    removeAll: (state) => {
      state.choose = {};
    },
  },
});

export const { addChoose, removeChoose, removeAll } = chooseSlice.actions;

export const selectCountChoose = createSelector(
  (state: RootState) => state,
  (state) => Object.keys(state.choose.choose).length
);

export const selectChoose = (state: RootState) => state.choose.choose;

export default chooseSlice.reducer;
