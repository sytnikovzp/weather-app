import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import { setErrorState, setFetchingState } from '../../utils/reduxHelpers';

import {
  loginThunk,
  logoutThunk,
  refreshAccessTokenThunk,
  registrationThunk,
} from '../thunks/authenticationThunks';

const initialState = {
  isFetching: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: SLICE_NAMES.AUTHENTICATION_SLICE_NAME,
  initialState,
  reducers: {
    clearAuthenticationStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationThunk.fulfilled, (state) => {
        state.isFetching = false;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.isFetching = false;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isFetching = false;
        state.error = null;
      })
      .addCase(refreshAccessTokenThunk.fulfilled, (state) => {
        state.isFetching = false;
        state.error = null;
      })

      .addCase(registrationThunk.pending, setFetchingState)
      .addCase(loginThunk.pending, setFetchingState)
      .addCase(logoutThunk.pending, setFetchingState)
      .addCase(refreshAccessTokenThunk.pending, setFetchingState)

      .addCase(registrationThunk.rejected, setErrorState)
      .addCase(loginThunk.rejected, setErrorState)
      .addCase(logoutThunk.rejected, setErrorState)
      .addCase(refreshAccessTokenThunk.rejected, setErrorState);
  },
});

const { actions, reducer } = authenticationSlice;

export const { clearAuthenticationStore } = actions;

export default reducer;
