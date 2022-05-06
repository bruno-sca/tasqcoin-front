import { api, ApiResponse } from './api';

type UserService = {
  changeUserAvatar(payload: File): ApiResponse<void>;
  changeUserName(newName: string): ApiResponse<UserData>;
  changeUserPassword(payload: UserChangePasswordRequest): ApiResponse<void>;
  getUserInfo(payload?: string): ApiResponse<UserData>;
  searchUser(payload: string): ApiResponse<UserData[]>;
  signup(payload: UserSignUpRequest): ApiResponse<UserSignUpResponse>;
};

export const user: UserService = {
  changeUserAvatar: async (payload) => {
    const formData = new FormData();
    formData.append('avatar', payload);
    return api.patch('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  changeUserName: async (payload) =>
    api.patch('/users/change-name', { name: payload }),
  changeUserPassword: async (payload) => api.patch('/users/password', payload),
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

  signup: async (payload) => api.post('/users', payload),
};
