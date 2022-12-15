type UserData = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  balance: number;
  dark_balance: number;
  [x: string]: unknown;
};

type UserSignUpRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type UserSignUpResponse = {
  id: string;
  name: string;
  password: string;
  email: string;
  balance: number;
  is_admin: boolean;
  avatar: string;
  created_at: Date;
};

type UserLoginRequest = { email: string; password: string };

type UserLoginResponse = {
  token: string;
  refresh_token: string;
  user: UserData;
};

type UserChangePasswordRequest = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};
