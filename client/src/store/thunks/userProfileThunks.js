import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';

import { userProfileService } from '../../services';

export const getUserProfile = createAsyncThunk(
  `${SLICE_NAMES.USER_PROFILE_SLICE_NAME}/fetch`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userProfileService.getUserProfile();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
