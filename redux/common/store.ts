import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import type { ApplicationState } from './slices';

export const initializeStore = (preloadedState?: ApplicationState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });
};

export type RootStore = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof initializeStore>['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector; 