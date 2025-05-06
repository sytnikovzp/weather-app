import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import { setErrorState, setFetchingState } from '../../utils/reduxHelpers';

import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from '../thunks/favoritesThunks';

const initialState = {
  isFetching: false,
  error: null,
  list: null,
};

const favoritesSlice = createSlice({
  name: SLICE_NAMES.FAVORITES_SLICE_NAME,
  initialState,
  reducers: {
    clearFavoritesState: () => initialState,
    clearFavoritesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.list = payload;
      })
      .addCase(addToFavorites.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.list.push(payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, { meta }) => {
        const { latitude, longitude } = meta.arg;
        state.isFetching = false;
        state.error = null;
        state.list = state.list.filter(
          (city) => city.latitude !== latitude || city.longitude !== longitude
        );
      })

      .addCase(fetchFavorites.pending, setFetchingState)
      .addCase(addToFavorites.pending, setFetchingState)
      .addCase(removeFromFavorites.pending, setFetchingState)

      .addCase(fetchFavorites.rejected, setErrorState)
      .addCase(addToFavorites.rejected, setErrorState)
      .addCase(removeFromFavorites.rejected, setErrorState);
  },
});

const { actions, reducer } = favoritesSlice;

export const { clearFavoritesState, clearFavoritesError } = actions;

export default reducer;
