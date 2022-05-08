import { RoleIdType } from '../constants';
import { TokenInfo } from '../types';

export type RegisterPayload = {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  user: TokenInfo
};

export type ChangeForgotPwPayload = {
  username: string;
  otpForget: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  userId: number;
  username: string;
  fullName: string;
  roleId: RoleIdType;

  email?: string;
  phone?: string;
  birthday?: string;
  money?: number;
  // createdAt: Timestamp;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  password: string;
  confirmPassword?: string;
};
