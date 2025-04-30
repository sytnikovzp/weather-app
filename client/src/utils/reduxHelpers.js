const setErrorState = (state, { payload }) => {
  state.isFetching = false;
  state.error = payload;
};

const setFetchingState = (state) => {
  state.isFetching = true;
  state.error = null;
};

export { setErrorState, setFetchingState };
