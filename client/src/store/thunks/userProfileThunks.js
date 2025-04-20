import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';

import { userProfileService } from '../../services';

export const getUserProfile = createAsyncThunk(
  `${SLICE_NAMES.USER_PROFILE_SLICE_NAME}/fetch`,
  async (_, { rejectWithValue }) => {
    try {
      const data = await userProfileService.getUserProfile();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  `${SLICE_NAMES.USER_PROFILE_SLICE_NAME}/edit`,
  async ({ fullName, email }, { rejectWithValue }) => {
    try {
      const { data } = await userProfileService.updateUserProfile(
        fullName,
        email
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserProfile = createAsyncThunk(
  `${SLICE_NAMES.USER_PROFILE_SLICE_NAME}/remove`,
  async (_, { rejectWithValue }) => {
    try {
      await userProfileService.deleteUserProfile();
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
