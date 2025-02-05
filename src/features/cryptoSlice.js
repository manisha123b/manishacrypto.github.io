import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching crypto data
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (cryptoId) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoId}`
    );
    const data = await response.json();
    return { cryptoId, data: data[0] }; // Assuming data[0] contains the data of the requested crypto
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          ...state.data,
          [action.payload.cryptoId]: action.payload.data,
        };
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
