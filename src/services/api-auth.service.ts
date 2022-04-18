import { RegisterPayload, LoginPayload, ChangePasswordPayload, ChangeForgotPwPayload } from './api-auth.type';
import axiosClient from '../lib/request';
import { MyResponse } from '../types';

const authBaseUrl = `${process.env.REACT_APP_API_HOST}/auth`;

export const customerRegister = (payload: RegisterPayload) => {
  return axiosClient.post(`${authBaseUrl}/register`, {
    ...payload,
  });
};

export const customerLogin = (payload: LoginPayload) => {
  return axiosClient.post(`${authBaseUrl}/login`, {
    ...payload,
  });
};

export const customerLogout = () => {
  return axiosClient.post(`${authBaseUrl}/logout`, {});
};

export const customerChangeForgotPw = (payload: ChangeForgotPwPayload) => {
  return axiosClient.post(`${authBaseUrl}/forget-password`, {
    ...payload,
  });
};

export const customerChangePassword = (payload: ChangePasswordPayload) => {
  return axiosClient.post(`${authBaseUrl}/change-password`, {
    ...payload,
  });
};

// export const refreshToken = (refreshToken: string) => {
//   return axiosClient.po
// }

export const getForgotPwOtp = async (username: string) => {
  const res = await axiosClient.get(`${authBaseUrl}/otp-forget?username=${username}`);
  if (res.status !== 200) {
    throw Error(`Có lỗi xảy ra, vui lòng thử lại vào lúc khác`);
  }
  return new MyResponse<any>(res);
};

export const refreshToken = async () => {
  const res = await axiosClient.get(`${authBaseUrl}/refresh-token`);
  if (res.status !== 200) {
    throw Error(`Có lỗi xảy ra, vui lòng thử lại vào lúc khác`);
  }
  return new MyResponse<{ token: string }>(res);
};
