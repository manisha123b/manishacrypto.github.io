import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/cryptoSlice'; // Update import path

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
