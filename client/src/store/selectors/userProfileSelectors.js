export const selectUserProfileIsFetching = (state) =>
  state.userProfile.isFetching;
export const selectUserProfileError = (state) => state.userProfile.error;
export const selectUserProfile = (state) => state.userProfile.data;
export const selectIsAuthenticated = (state) =>
  state.userProfile.isAuthenticated;
