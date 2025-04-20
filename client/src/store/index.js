import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import authReducer from './slices/authSlice';
import userProfileReducer from './slices/userProfileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
