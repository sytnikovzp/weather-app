import axios from 'axios';

import { API_CONFIG } from '../constants';
import {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
} from '../utils/sharedFunctions';

import { authService } from '../services';

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
        const refreshResult = await authService.refreshAccessToken();
        if (refreshResult?.accessToken) {
          const newToken = refreshResult.accessToken;
          saveAccessToken(newToken);
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api.request(originalRequest);
        }
        console.warn('Token refresh failed. Logging out...');
        removeAccessToken();
        return Promise.reject(error);
      } catch (refreshError) {
        const refreshStatus = refreshError.response?.status;
        if (refreshStatus === 401) {
          console.warn('Token refresh failed. Logging out...');
        } else if (refreshStatus === 404) {
          console.warn('User not found. Logging out...');
        } else {
          console.warn('Unexpected error during token refresh.');
        }
        removeAccessToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
