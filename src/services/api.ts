/* eslint-disable no-underscore-dangle */
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
  const token = localStorage.getItem('@tasq/token');

  if (token)
    config.headers.Authorization = `Bearer ${token.replace(/["]+/g, '') || ''}`;
  return config;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    const refreshToken =
      window.localStorage.getItem('@tasq/refresh_token') || '';

    if (
      originalConfig?.url !== '/refresh-token' &&
      err.response?.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      try {
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
    if (
      originalConfig?.url === '/refresh-token' &&
      err.response.status === 401
    ) {
      sessionStorage.setItem('prevUrl', window.location.pathname);
      window.location.href = '/auth';

      toast.error('Invalid Token!');

      return Promise.reject(err);
    }

    if (err.response?.data.message) toast.error(err.response.data.message);

    return Promise.reject(err);
  }
);

export { api };
