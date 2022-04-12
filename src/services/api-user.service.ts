import { axiosClient } from '../lib/request';
import axios from 'axios';
import { MyResponse } from '../types';
import { EditUserPayload, GetAllStockOrderResponse } from './api-user.type';

const baseUrl = `${process.env.REACT_APP_API_HOST}`;

export const getAllOrder = async () => {
  const res = await axios.get(`${baseUrl}/stock-orders`);
  if (res.status !== 200) {
    throw Error(`Có lỗi xảy ra, vui lòng thử lại vào lúc khác`);
  }
  return new MyResponse<GetAllStockOrderResponse>(res);
};

export const editUserInfo = (payload: EditUserPayload, userId: number) => {
  return axiosClient.post(`${baseUrl}/user/${userId}`, {
    ...payload,
  });
};