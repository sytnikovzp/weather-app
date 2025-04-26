import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';

import { authService } from '../../services';
import { clearFavoritesState } from '../slices/favoritesSlice';
import { clearUserProfileStore } from '../slices/userProfileSlice';

import store from '..';

export const registrationThunk = createAsyncThunk(
  `${SLICE_NAMES.AUTHENTICATION_SLICE_NAME}/registration`,
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await authService.registration(
        fullName,
        email,
        password
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginThunk = createAsyncThunk(
  `${SLICE_NAMES.AUTHENTICATION_SLICE_NAME}/login`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  `${SLICE_NAMES.AUTHENTICATION_SLICE_NAME}/logout`,
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      store.dispatch(clearFavoritesState());
      store.dispatch(clearUserProfileStore());
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessTokenThunk = createAsyncThunk(
  `${SLICE_NAMES.AUTHENTICATION_SLICE_NAME}/refresh`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.refreshAccessToken();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
