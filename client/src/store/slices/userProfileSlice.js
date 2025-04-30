import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import { setErrorState, setFetchingState } from '../../utils/reduxHelpers';

import { fetchUserProfile } from '../thunks/userProfileThunks';

const initialState = {
  isFetching: false,
  error: null,
  data: null,
  isAuthenticated: false,
};

const userProfileSlice = createSlice({
  name: SLICE_NAMES.USER_PROFILE_SLICE_NAME,
  initialState,
  reducers: {
    clearUserProfileStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.data = payload;
        state.isAuthenticated = true;
      })

      .addCase(fetchUserProfile.pending, setFetchingState)

      .addCase(fetchUserProfile.rejected, setErrorState);
  },
});
const { actions, reducer } = userProfileSlice;

export const { clearUserProfileStore } = actions;

export default reducer;
