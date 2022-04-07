import { api, ApiResponse } from './api';

type AuthService = {
  login(payload: UserLoginRequest): ApiResponse<UserLoginResponse>;
};

export const auth: AuthService = {
  login: async (payload) => api.post('/signin', payload),
};
