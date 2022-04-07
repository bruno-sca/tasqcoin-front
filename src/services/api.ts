import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { toast } from 'react-toastify';

export type Api = AxiosInstance;
export type ApiResponse<T> = AxiosPromise<T>;

const api: Api = axios.create({
  baseURL: 'http://localhost:3333/',
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.data.message) toast.error(err.response.data.message);
    return Promise.reject(err);
  }
);

export { api };
