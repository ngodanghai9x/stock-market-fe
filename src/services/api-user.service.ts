import axiosClient from '../lib/request';
import { MyResponse } from '../types';
import { EditUserPayload, GetAllStockOrderResponse } from './api-user.type';
import { CitizenIdentity, User } from './api-admin.type';

const baseUrl = `${process.env.REACT_APP_API_HOST}`;

export const getAllOrder = async () => {
  const res = await axiosClient.get(`${baseUrl}/stock-orders`);
  if (res.status !== 200) {
    throw Error(`Có lỗi xảy ra, vui lòng thử lại vào lúc khác`);
  }
  return new MyResponse<GetAllStockOrderResponse>(res);
};

export const getUserById = async (userId: number = 1, username?: string) => {
  const res = await axiosClient.get(`${baseUrl}/user/${userId}?username=${encodeURIComponent(username || '')}`);
  const data = new MyResponse<{ user: User; citizenIdentity: CitizenIdentity | null }>(res).data;
  return data;
  // if (res.status !== 200) {
  //   throw Error(`Có lỗi xảy ra, vui lòng thử lại vào lúc khác`);
  // }
  // return new MyResponse<{ user: User; citizenIdentity: CitizenIdentity | null }>(res);
};

export const editUserInfo = (payload: EditUserPayload, userId: number) => {
  return axiosClient.post(`${baseUrl}/user/${userId}`, {
    ...payload,
  });
};
