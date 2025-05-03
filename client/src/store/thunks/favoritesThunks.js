import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';

import { favoritesService } from '../../services';

export const fetchFavorites = createAsyncThunk(
  `${SLICE_NAMES.FAVORITES_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await favoritesService.getAllFavorites();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  `${SLICE_NAMES.FAVORITES_SLICE_NAME}/add`,
  async ({ city, countryCode, latitude, longitude }, { rejectWithValue }) => {
    try {
      const { data } = await favoritesService.addCityToFavorites(
        city,
        countryCode,
        latitude,
        longitude
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  `${SLICE_NAMES.FAVORITES_SLICE_NAME}/remove`,
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const { data } = await favoritesService.removeCityFromFavorites(
        latitude,
        longitude
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
