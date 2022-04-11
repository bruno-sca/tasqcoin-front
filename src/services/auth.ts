import { api, ApiResponse } from './api';

type AuthService = {
  login(payload: UserLoginRequest): ApiResponse<UserLoginResponse>;
  refreshToken(payload: string): ApiResponse<string>;
};

export const auth: AuthService = {
  login: async (payload) => api.post('/signin', payload),
  refreshToken: async (payload: string) =>
    api.post('/refresh-token', { token: payload }),
};
