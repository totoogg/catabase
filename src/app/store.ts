import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice, countReducer, errorReducer, loaderReducer } from '@/shared';
import { chooseReducer } from '@/entities';

const rootReducer = combineReducers({
  loader: loaderReducer,
  error: errorReducer,
  count: countReducer,
  choose: chooseReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: import.meta.env.VITE_DEV_MODE !== 'production',
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
