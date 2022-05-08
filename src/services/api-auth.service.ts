import {
  RegisterPayload,
  LoginPayload,
  ChangePasswordPayload,
  ChangeForgotPwPayload,
  LoginResponse,
} from './api-auth.type';
import axiosClient from '../lib/request';
import { MyResponse } from '../types';
import { STORAGE } from '../constants';

const authBaseUrl = `${process.env.REACT_APP_API_HOST}/auth`;

export const customerRegister = async (payload: RegisterPayload) => {
  const res = await axiosClient.post(`${authBaseUrl}/register`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const customerLogin = async (payload: LoginPayload) => {
  const res = await axiosClient.post(`${authBaseUrl}/login`, {
    ...payload,
  });
  return new MyResponse<LoginResponse>(res);
};

export const customerLogout = async () => {
  const res = await axiosClient.post(`${authBaseUrl}/logout`, {});
  return new MyResponse<any>(res);
};

export const customerChangeForgotPw = async (payload: ChangeForgotPwPayload) => {
  const res = await axiosClient.post(`${authBaseUrl}/forget-password`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const customerChangePassword = async (payload: ChangePasswordPayload) => {
  const res = await axiosClient.post(`${authBaseUrl}/change-password`, {
    ...payload,
  });
  return new MyResponse<any>(res);
};

export const getForgotPwOtp = async (username: string) => {
  const res = await axiosClient.get(`${authBaseUrl}/otp-forget?username=${username}`);
  return new MyResponse<any>(res);
};

export const getTradingOtp = async () => {
  const res = await axiosClient.get(`${authBaseUrl}/otp-trading`);
  return new MyResponse<any>(res);
};

export const verifyTradingOtp = async (otpTrading: string) => {
  const res = await axiosClient.post(`${authBaseUrl}/otp-trading`, { otpTrading });
  localStorage.setItem(STORAGE.otpTrading, otpTrading);
  return new MyResponse<any>(res);
};

export const refreshToken = async () => {
  const res = await axiosClient.get(`${authBaseUrl}/refresh-token`);
  return new MyResponse<{ token: string }>(res);
};
