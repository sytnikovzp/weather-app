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
  withCredentials: true,
});

let refreshingPromise = null;
let failedQueue = [];

const processQueue = (error, token = null) => {
  for (const { resolve, reject } of failedQueue) {
    error ? reject(error) : resolve(token);
  }
  failedQueue = [];
};

const waitForToken = () =>
  new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const is401 = error.response?.status === 401;
    const isNotRetry = !originalRequest._retry;
    const isNotRefreshRequest = !originalRequest.url.includes('/auth/refresh');
    if (is401 && isNotRetry && isNotRefreshRequest) {
      originalRequest._retry = true;
      if (refreshingPromise) {
        try {
          const token = await waitForToken();
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      refreshingPromise = (async () => {
        try {
          console.warn('Access token expired. Trying to refresh...');
          const result = await store.dispatch(refreshAccessTokenThunk());
          const token = result.payload?.accessToken;
          if (!token) {
            throw error;
          }
          saveAccessToken(token);
          processQueue(null, token);
          return token;
        } catch (refreshError) {
          console.warn('Token refresh failed. Logging out...');
          processQueue(refreshError);
          removeAccessToken();
          await store.dispatch(logoutThunk());
          return Promise.reject(refreshError);
        } finally {
          refreshingPromise = null;
        }
      })();
      try {
        const token = await refreshingPromise;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
