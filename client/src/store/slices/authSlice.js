import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import { setErrorState, setLoadingState } from '../../utils/sharedFunctions';

import {
  loginThunk,
  logoutThunk,
  refreshAccessTokenThunk,
  registrationThunk,
} from '../thunks/authThunks';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: SLICE_NAMES.AUTH_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fulfilled
      .addCase(registrationThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(refreshAccessTokenThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthenticated = true;
      })

      // Pending
      .addCase(registrationThunk.pending, setLoadingState)
      .addCase(loginThunk.pending, setLoadingState)
      .addCase(logoutThunk.pending, setLoadingState)
      .addCase(refreshAccessTokenThunk.pending, setLoadingState)

      // Rejected
      .addCase(registrationThunk.rejected, setErrorState)
      .addCase(loginThunk.rejected, setErrorState)
      .addCase(logoutThunk.rejected, setErrorState)
      .addCase(refreshAccessTokenThunk.rejected, setErrorState);
  },
});

export default authSlice.reducer;
