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

const waitForAccessToken = () =>
  new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });

const refreshAccessToken = async () => {
  console.warn('Access token expired. Trying to refresh...');
  const result = await store.dispatch(refreshAccessTokenThunk());
  const token = result.payload?.accessToken;
  if (!token) {
    throw new Error('Token refresh failed');
  }
  saveAccessToken(token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return token;
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      if (refreshingPromise) {
        const token = await waitForAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      }
      refreshingPromise = (async () => {
        try {
          const token = await refreshAccessToken();
          processQueue(null, token);
          return token;
        } catch (err) {
          console.warn('Token refresh failed. Logging out...');
          processQueue(err);
          removeAccessToken();
          await store.dispatch(logoutThunk());
          throw err;
        } finally {
          refreshingPromise = null;
        }
      })();
      const token = await refreshingPromise;
      originalRequest.headers['Authorization'] = `Bearer ${token}`;
      return api(originalRequest);
    }
    throw error;
  }
);

export default api;
