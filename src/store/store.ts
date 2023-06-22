import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user.slice';

export const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppStore = typeof appStore;
