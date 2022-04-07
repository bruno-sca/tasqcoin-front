import { api, ApiResponse } from './api';

type UserService = {
  signup(payload: UserSignUpRequest): ApiResponse<UserSignUpResponse>;
};

export const user: UserService = {
  signup: async (payload) => api.post('/users', payload),
};
