import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { countReducer } from '@/shared';
import { chooseReducer } from '@/entities';

const rootReducer = combineReducers({
  count: countReducer,
  choose: chooseReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
