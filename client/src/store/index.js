import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import authenticationReducer from './slices/authenticationSlice';
import userProfileReducer from './slices/userProfileSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
