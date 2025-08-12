import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice, countReducer } from '@/shared';
import { chooseReducer } from '@/entities';

const rootReducer = combineReducers({
  count: countReducer,
  choose: chooseReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
