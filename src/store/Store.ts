import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './SearchSlice';
import cartReducer from './CartSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
