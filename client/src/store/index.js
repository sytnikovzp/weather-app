import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import authenticationReducer from './slices/authenticationSlice';
import favoritesReducer from './slices/favoritesSlice';
import userProfileReducer from './slices/userProfileSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    favorites: favoritesReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
