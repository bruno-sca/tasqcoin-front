import { api, ApiResponse } from './api';

type UserService = {
  signup(payload: UserSignUpRequest): ApiResponse<UserSignUpResponse>;
  getUserInfo(payload?: string): ApiResponse<UserData>;
  searchUser(payload: string): ApiResponse<UserData[]>;
};

export const user: UserService = {
  signup: async (payload) => api.post('/users', payload),
  getUserInfo: async (payload) =>
    api.get('/users', {
      params: {
        ...(payload && { id: payload }),
      },
    }),
  searchUser: (payload) =>
    api.get('/users/search', {
      params: {
        name: payload,
      },
    }),
};
