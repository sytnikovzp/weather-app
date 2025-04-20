import axios from 'axios';

import { API_CONFIG } from '../constants';
import {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
} from '../utils/sharedFunctions';

import store from '../store';
import {
  logoutThunk,
  refreshAccessTokenThunk,
} from '../store/thunks/authThunks';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = getAccessToken();
      if (!token) {
        return Promise.reject(error);
      }
      console.warn('Access token expired. Trying to refresh...');
      try {
        const actionResult = await store
          .dispatch(refreshAccessTokenThunk())
          .unwrap();
        if (refreshAccessTokenThunk.fulfilled.match(actionResult)) {
          const { accessToken } = actionResult.payload;
          saveAccessToken(accessToken);
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api.request(originalRequest);
        }
        console.warn('Token refresh failed. Logging out...');
        removeAccessToken();
        store.dispatch(logoutThunk()).unwrap();
        return Promise.reject(error);
      } catch (refreshError) {
        console.warn('Error during token refresh: ', refreshError);
        removeAccessToken();
        store.dispatch(logoutThunk()).unwrap();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
