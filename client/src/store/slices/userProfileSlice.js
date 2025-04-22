import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import { setErrorState, setLoadingState } from '../../utils/sharedFunctions';

import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from '../thunks/userProfileThunks';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: SLICE_NAMES.USER_PROFILE_SLICE_NAME,
  initialState,
  reducers: {
    clearUserProfileStore: (state) => {
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fulfilled
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.data = payload;
      })
      .addCase(deleteUserProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.data = null;
      })

      // Pending
      .addCase(getUserProfile.pending, setLoadingState)
      .addCase(updateUserProfile.pending, setLoadingState)
      .addCase(deleteUserProfile.pending, setLoadingState)

      // Rejected
      .addCase(getUserProfile.rejected, setErrorState)
      .addCase(updateUserProfile.rejected, setErrorState)
      .addCase(deleteUserProfile.rejected, setErrorState);
  },
});
const { actions, reducer } = userProfileSlice;

export const { clearUserProfileStore } = actions;

export default reducer;
