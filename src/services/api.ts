/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { toast } from 'react-toastify';

import { services } from '.';

export type Api = AxiosInstance;
export type ApiResponse<T> = AxiosPromise<T>;

const api: Api = axios.create({
  baseURL: 'http://localhost:3333/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@tasq/token') || '';
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.data.message) toast.error(err.response.data.message);
    const originalConfig = err.config;

    if (
      originalConfig.url === '/refresh-token' &&
      err.response.status === 401
    ) {
      sessionStorage.setItem('prevUrl', window.location.pathname);
      window.location.href = '/auth';
      return Promise.reject(err);
    }
    if (
      originalConfig.url !== '/refresh-token' &&
      err.response?.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;

      try {
        const refreshToken =
          window.localStorage.getItem('@tasq/refresh_token') || '';
        await services.auth
          .refreshToken(refreshToken)
          .then(({ data: newToken }) => {
            localStorage.setItem('@tasq/token', newToken);
          });
        return api(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  }
);

export { api };
